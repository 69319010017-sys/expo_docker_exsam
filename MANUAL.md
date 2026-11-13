# คู่มือนักเรียน: ฝึก Deploy แอป Expo ด้วย Docker บน Render

เป้าหมาย: คัดลอกโปรเจกต์ → รันบนมือถือด้วย Expo Go → ส่งขึ้น GitHub ของตัวเอง → Deploy ขึ้น Render ให้ได้ลิงก์เว็บ

## สิ่งที่ต้องมี
- บัญชี **GitHub** และ **Render** (สมัครฟรีที่ render.com ด้วยบัญชี GitHub)
- **Git** และ **Docker Desktop** (เปิดโปรแกรมให้ขึ้นสถานะ running)
- มือถือติดตั้งแอป **Expo Go** (App Store / Play Store)
- มือถือและคอมต้องอยู่ **Wi-Fi เดียวกัน**

## ขั้นที่ 1 คัดลอกโปรเจกต์ (Fork)
1. เปิด https://github.com/preechaudtc/expo_docker_exsam
2. กดปุ่ม **Fork** มุมขวาบน → **Create fork** (จะได้ repo ของตัวเองที่ `github.com/<ชื่อคุณ>/expo_docker_exsam`)
3. ดึงมาลงเครื่อง (แทน `<ชื่อคุณ>`):
```bash
git clone https://github.com/<ชื่อคุณ>/expo_docker_exsam.git
cd expo_docker_exsam
```

## ขั้นที่ 2 รันบนมือถือด้วย Expo Go
1. หา IP ของคอม: เปิด PowerShell พิมพ์ `ipconfig` ดูค่า **IPv4 Address** ของ Wi-Fi (เช่น 192.168.1.50)
2. รันคำสั่ง (PowerShell):
```powershell
$env:HOST_IP="192.168.1.50"
docker compose up --build expo
```
3. รอจนมี **QR code** ใน terminal (ครั้งแรกใช้เวลาหลายนาที)
4. เปิด **Expo Go** บนมือถือ → สแกน QR (iPhone ใช้แอปกล้องสแกน)
5. ต้องเห็นหน้า "Expo + Docker + Render" กดปุ่มแล้วเลขเพิ่ม
6. หยุดโปรแกรมด้วย `Ctrl + C`

ถ้าสแกนแล้วต่อไม่ได้: เช็ก IP ให้ถูก, ต่อ Wi-Fi เดียวกัน, อนุญาต firewall พอร์ต **8081**

## ขั้นที่ 3 แก้โค้ด
1. เปิดไฟล์ `App.js` แก้ข้อความ เช่น เปลี่ยน "Expo + Docker + Render" เป็นชื่อของคุณ
2. บันทึกไฟล์ มือถือจะอัปเดตเอง

## ขั้นที่ 4 ทดสอบแบบ Production ในเครื่อง
```powershell
docker compose --profile prod up --build web
```
เปิด http://localhost:10000 ต้องเห็นหน้าเดียวกัน และ http://localhost:10000/health ต้องตอบ `ok`

## ขั้นที่ 5 ส่งขึ้น GitHub
```bash
git add -A
git commit -m "แก้หน้าแรก"
git push
```
รีเฟรชหน้า repo บน GitHub ต้องเห็นการเปลี่ยนแปลง

## ขั้นที่ 6 Deploy บน Render
1. เข้า https://dashboard.render.com → **New +** → **Web Service**
2. เชื่อม GitHub แล้วเลือก repo `expo_docker_exsam` ของ **ตัวเอง**
3. ตั้งค่า
   - Language: **Docker**
   - Branch: `main`
   - Instance Type: **Free**
   - Advanced → Health Check Path: `/health`
4. กด **Deploy Web Service** แล้วดู Logs รอจนสถานะเป็น **Live** (หลายนาที)
5. เปิด URL `https://<ชื่อ>.onrender.com` ต้องเห็นหน้าเว็บของคุณ

แพลน Free จะหลับเมื่อไม่มีคนใช้ เปิดครั้งแรกอาจช้าประมาณ 1 นาที

## ขั้นที่ 7 ทดสอบการอัปเดตอัตโนมัติ
แก้ `App.js` → `git add -A` → `git commit -m "..."` → `git push` Render จะ deploy ใหม่เอง รอ Live แล้วรีเฟรชหน้าเว็บ

## ส่งงาน
ส่งลิงก์ **GitHub repo** และลิงก์ **เว็บบน Render** ของตัวเอง

## แก้ปัญหาเบื้องต้น
| อาการ | วิธีแก้ |
|---|---|
| `docker` ไม่รู้จัก / error daemon | เปิด Docker Desktop ให้พร้อมก่อน |
| QR สแกนแล้วต่อไม่ได้ | ตรวจ `HOST_IP`, Wi-Fi เดียวกัน, firewall พอร์ต 8081 |
| Render build ล้ม | เปิดแท็บ Logs อ่านบรรทัด error แล้วถามครู |
| เว็บ Render หน้าว่าง | เปิด `/health` ดูว่าตอบ `ok` ไหม และรอให้สถานะเป็น Live |
