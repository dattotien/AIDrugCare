import os
import requests

ASSETS_DIR = "./assets"
MODEL_PATH = os.path.join(ASSETS_DIR, "hmgrl_check_point.pt")
JSON_PATH = os.path.join(ASSETS_DIR, "drug_interaction.json")

MODEL_URL = os.getenv(
    "MODEL_URL",
    "https://github.com/dattotien/AIDrugCare/releases/download/v1.0.0/hmrgl_check_point.pt"
)
JSON_URL = os.getenv(
    "JSON_URL",
    "https://github.com/dattotien/AIDrugCare/releases/download/v1.0.0/drug_interaction.json"
)

def download_file(url, dest_path):
    print(f"Downloading {url} → {dest_path}")
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(dest_path, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
    print(f"Downloaded {dest_path}")

def ensure_assets():
    os.makedirs(ASSETS_DIR, exist_ok=True)

    if not os.path.exists(MODEL_PATH) or os.path.getsize(MODEL_PATH) < 1024:
        download_file(MODEL_URL, MODEL_PATH)

    if not os.path.exists(JSON_PATH) or os.path.getsize(JSON_PATH) < 100:
        download_file(JSON_URL, JSON_PATH)
