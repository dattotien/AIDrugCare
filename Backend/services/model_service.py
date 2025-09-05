import torch
import numpy as np
import json
import torch.nn.functional as F
from .model import HMGRL, gcnnormalization, adj_Heter_gene, args
from fastapi import Request
def get_hmgrl_service(request: Request):
    return request.app.state.hmgrl_service
N_three_attribute = torch.tensor([2033, 1589, 285], dtype=torch.int32)
class HMGRLService:
    def __init__(self, model_path, data_path, device="cuda"):
        with open(data_path + "/drugbankid2id.json", "r") as f:
            self.drugbankid2id = json.load(f)
        with open(data_path + "/id2drugbankid.json", "r") as f:
            self.id2drugbankid = json.load(f)
        with open(data_path + "/name_to_drugbank_id.json", "r") as f:
            self.name_to_dbid = json.load(f)
        self.device = device
        self.N_three_attribute = N_three_attribute.to(self.device)
        self.load_model(model_path)
        self.load_data(data_path)
        with open(data_path + "/label_mapping.json", "r") as f:
            self.label_mapping = json.load(f)
        self.prepare_adj()

    def load_model(self, path):
        state_dict = torch.load(path, map_location=self.device)
        self.model = HMGRL(6000, 99, 1000, self.N_three_attribute, args).to(self.device)
        self.model.load_state_dict(state_dict)
        self.model.eval()

    def load_data(self, path):
        self.new_label = np.load(path + "/new_label.npy")
        self.drugA = np.load(path + "/newdrugA.npy")
        self.drugB = np.load(path + "/newdrugB.npy")
        X_vector = np.load(path + "/X_vector.npy")
        self.drug_coding = torch.tensor(np.load(path + "/drug_coding.npy"), dtype=torch.float, device=self.device) 
        self.X_vector = torch.tensor(X_vector, dtype=torch.float, device=self.device)
        self.DDI_edge = np.load(path + "/DDI_edge.npy")
        self.event_num = np.unique(self.new_label).shape[0]
        X_three_vector = np.load(path + "/X_three_vector.npy")
        self.X_three_vector = torch.tensor(X_three_vector, dtype=torch.float, device=self.device)
        self.N_three_attribute = torch.tensor([2033,1589,285], dtype=torch.int, device=self.device)

    def prepare_adj(self):
        adj1 = gcnnormalization(self.X_vector[:, :1000]).reshape(1, 1000, 1000)
        adj2 = gcnnormalization(self.X_vector[:, 1000:2000]).reshape(1, 1000, 1000)
        adj3 = gcnnormalization(self.X_vector[:, 2000:]).reshape(1, 1000, 1000)
        self.tensor_tempvec_multi = torch.cat((adj1, adj2, adj3), dim=0).to(self.device)
        self.adj, self.n_drugs = adj_Heter_gene(self.DDI_edge, self.X_vector, self.event_num, self.new_label)
        self.adj = self.adj.to(self.device)

    def predict(self, drug_indices):
        self.model.eval()
        if not torch.is_tensor(drug_indices):
            drug_indices = torch.tensor(drug_indices, dtype=torch.long)
        drug_indices = drug_indices.to(self.device)
        print(f"drug_indices: {drug_indices}, shape: {drug_indices.shape}")
        with torch.no_grad():
            lam = 1
            output,_,_ = self.model(
                self.adj,
                self.tensor_tempvec_multi,
                self.X_vector,
                self.X_three_vector,
                drug_indices,
                drug_indices,
                lam,
                self.drug_coding
            )

            prob = F.softmax(output, dim=1).cpu().numpy()
            pred_labels = prob.argmax(axis=1)

        return pred_labels
