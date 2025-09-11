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

    # File model
    if not os.path.exists("./assets/hmgrl_check_point.pt"):
        download_file_from_google_drive(
            "YOUR_MODEL_FILE_ID",
            "./assets/hmgrl_check_point.pt"
        )

    # File drug interaction
    if not os.path.exists("./assets/drug_interaction.json"):
        download_file_from_google_drive(
            "YOUR_JSON_FILE_ID",
            "./assets/drug_interaction.json"
        )
