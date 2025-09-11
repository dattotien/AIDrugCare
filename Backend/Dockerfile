FROM python:3.10-slim

# Cài đặt thư viện cần thiết
RUN apt-get update && apt-get install -y libgl1 libglib2.0-0 && rm -rf /var/lib/apt/lists/*

# Tạo thư mục làm việc
WORKDIR /app

# Copy file requirements
COPY requirements.txt .

# Cài đặt dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ source code vào container
COPY . .

# Expose port
EXPOSE 8000

# Lệnh chạy
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
