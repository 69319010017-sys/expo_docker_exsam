# Expo Go + Docker + Render (ต้นแบบสำหรับนักเรียน)

## 1) ฝึกเขียนแอปด้วย Expo Go (Docker)
```bash
# ใส่ IP เครื่องคอม (ipconfig) ที่อยู่ Wi-Fi เดียวกับมือถือ
HOST_IP=192.168.1.50 docker compose up --build expo
```
เปิดแอป **Expo Go** บนมือถือ → สแกน QR ที่ขึ้นใน terminal (หรือพิมพ์ `exp://IP:8081`)
(PowerShell: `$env:HOST_IP="192.168.1.50"; docker compose up --build expo`)
ต้องเปิด firewall พอร์ต 8081

## 2) ทดสอบแบบ Production ในเครื่อง
```bash
docker compose --profile prod up --build web
```
เปิด http://localhost:10000

## 3) Deploy ขึ้น Render
1. push โค้ดขึ้น GitHub
2. Render → New → Web Service → เลือก repo → Runtime **Docker** (หรือ Blueprint ใช้ `render.yaml`)
3. Health Check Path: `/health` → Deploy

## ไฟล์สำคัญ
`Dockerfile` (prod/Render) · `Dockerfile.dev` (Expo Go) · `docker-compose.yml` · `server.js` · `render.yaml`
