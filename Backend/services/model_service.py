from fastapi import Request
import torch, os, json, numpy as np, torch.nn.functional as F
from .model import HMGRL, gcnnormalization, adj_Heter_gene, args
from services.download_assets import MODEL_PATH, ASSETS_DIR

class HMGRLService:
    def __init__(self, model_path, data_path, device="cpu"):
        self.device = device
        self.model_path = model_path
        self.data_path = os.path.abspath(data_path)

        # load mapping files nhẹ (ok để load ngay)
        with open(os.path.join(self.data_path, "drugbankid2id.json")) as f:
            self.drugbankid2id = json.load(f)
        with open(os.path.join(self.data_path, "id2drugbankid.json")) as f:
            self.id2drugbankid = json.load(f)
        with open(os.path.join(self.data_path, "name_to_drugbank_id.json")) as f:
            self.name_to_dbid = json.load(f)

        # heavy assets chưa load
        self.inter_dict = None
        self.label_mapping = None
        self.model = None
        self.X_vector = None
        self.drug_coding = None
        self.adj = None
        self.tensor_tempvec_multi = None
        self.X_three_vector = None
        self.new_label = None
        self.drugA = None
        self.drugB = None
        self.DDI_edge = None
        self.event_num = None

        self.N_three_attribute = torch.tensor([2033, 1589, 285], dtype=torch.long, device=self.device)

    def load_model(self, path):
        state_dict = torch.load(path, map_location=self.device)
        self.model = HMGRL(6000, 99, 1000, self.N_three_attribute, args).to(self.device)
        self.model.load_state_dict(state_dict)
        self.model.eval()

    def load_heavy_assets(self):
        if self.inter_dict is None:
            with open(os.path.join(self.data_path, "drug_interaction.json")) as f:
                self.inter_dict = json.load(f)
        if self.label_mapping is None:
            with open(os.path.join(self.data_path, "label_mapping.json")) as f:
                self.label_mapping = json.load(f)
        if self.model is None:
            self.load_model(self.model_path)
            self.load_data(self.data_path)
            self.prepare_adj()



    def load_data(self, path):
        self.new_label = np.load(os.path.join(path, "new_label.npy"))
        self.drugA = np.load(os.path.join(path, "newdrugA.npy"))
        self.drugB = np.load(os.path.join(path, "newdrugB.npy"))
        self.X_vector = torch.tensor(np.load(os.path.join(path, "X_vector.npy")), dtype=torch.float, device=self.device)
        self.drug_coding = torch.tensor(np.load(os.path.join(path, "drug_coding.npy")), dtype=torch.float, device=self.device)
        self.DDI_edge = np.load(os.path.join(path, "DDI_edge.npy"))
        self.event_num = np.unique(self.new_label).shape[0]
        X_three_vector = np.load(os.path.join(path, "X_three_vector.npy"))
        self.X_three_vector = torch.tensor(X_three_vector, dtype=torch.float, device=self.device)

    def prepare_adj(self):
        adj1 = gcnnormalization(self.X_vector[:, :1000]).reshape(1, 1000, 1000)
        adj2 = gcnnormalization(self.X_vector[:, 1000:2000]).reshape(1, 1000, 1000)
        adj3 = gcnnormalization(self.X_vector[:, 2000:]).reshape(1, 1000, 1000)
        self.tensor_tempvec_multi = torch.cat((adj1, adj2, adj3), dim=0).to(self.device)
        self.adj, self.n_drugs = adj_Heter_gene(self.DDI_edge, self.X_vector, self.event_num, self.new_label)
        self.adj = self.adj.to(self.device)

    def predict(self, drug_indices):
        self.load_heavy_assets()
        self.model.eval()
        if not torch.is_tensor(drug_indices):
            drug_indices = torch.tensor(drug_indices, dtype=torch.long)
        drug_indices = drug_indices.to(self.device)

        with torch.no_grad():
            output, _, _ = self.model(
                self.adj,
                self.tensor_tempvec_multi,
                self.X_vector,
                self.X_three_vector,
                drug_indices,
                drug_indices,
                1,
                self.drug_coding,
            )
            prob = F.softmax(output, dim=1).cpu().numpy()
            return prob.argmax(axis=1)

# --- GLOBAL FUNCTION ---
def get_model_service(request: Request) -> HMGRLService:
    if request.app.state.hmgrl_service is None:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        request.app.state.hmgrl_service = HMGRLService(
            model_path=MODEL_PATH,
            data_path=ASSETS_DIR,
            device=device
        )
        print("✅ Model service created (lazy)")
    return request.app.state.hmgrl_service
