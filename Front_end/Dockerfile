# ============================
# Build stage
# ============================
FROM node:20-alpine AS build

# Thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json trước
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source
COPY . .

# Nhận biến môi trường từ Render
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build app (vite build)
RUN npm run build

# ============================
# Serve stage
# ============================
FROM nginx:alpine

# Copy file build ra thư mục serve của nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config tuỳ chỉnh (nếu cần React Router support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
