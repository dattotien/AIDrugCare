import os
import requests

def download_file_from_google_drive(file_id, dest_path):
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    response = requests.get(url)
    response.raise_for_status()
    with open(dest_path, "wb") as f:
        f.write(response.content)
    print(f"Downloaded {dest_path}")

def ensure_assets():
    os.makedirs("./assets", exist_ok=True)

    model_id = os.getenv("MODEL_FILE_ID")
    json_id = os.getenv("JSON_FILE_ID")

    if not os.path.exists("./assets/hmgrl_check_point.pt"):
        download_file_from_google_drive(model_id, "./assets/hmgrl_check_point.pt")

    if not os.path.exists("./assets/drug_interaction.json"):
        download_file_from_google_drive(json_id, "./assets/drug_interaction.json")

