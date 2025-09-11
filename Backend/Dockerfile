FROM python:3.10-slim

# Cài đặt thư viện hệ thống cần thiết cho torch, pillow, pygame...
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    gcc \
    g++ \
    libopenblas-dev \
    && rm -rf /var/lib/apt/lists/*

# Tạo thư mục làm việc
WORKDIR /app

# Copy file requirements trước để tận dụng cache
COPY requirements.txt .

# Cài đặt dependencies
RUN pip install --no-cache-dir -r requirements.txt

# ✅ Tải model và file JSON trực tiếp từ GitHub Release
RUN wget -O /app/drug_interaction.json https://github.com/dattotien/AIDrugCare/releases/download/v1.0.0/drug_interaction.json \
    && wget -O /app/hmrgl_check_point.pt https://github.com/dattotien/AIDrugCare/releases/download/v1.0.0/hmrgl_check_point.pt

# Copy toàn bộ source code vào container
COPY . .

# Expose port
EXPOSE 8000

# Lệnh chạy uvicorn (có thể tăng workers nếu cần)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
