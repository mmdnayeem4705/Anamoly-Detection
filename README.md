# 🔐 Nayeem's Secure Sight — Real-Time Anomaly Detection Dashboard

A full-stack AI-powered CCTV monitoring system that detects anomalies (e.g. weapons), alerts security personnel, and allows anonymous incident reporting — all in real time.

---

## 🎥 Demo Video
[🔗 Watch Demo on YouTube](https://youtu.be/QXfusN_adIE)

---

## 🚨 Why Secure Sight?

In high-risk environments like campuses, stations, or malls, response delay can cost lives. Secure Sight bridges that gap by:

- Autonomously detecting threats using AI (YOLOv5).
- Alerting security immediately via WhatsApp (Twilio API).
- Logging anomalies on a web dashboard.
- Letting civilians report incidents without identity compromise.

---

## 🧠 Core Features

### 📷 CCTV Monitoring System

- Real-time camera feed processed using a trained **YOLOv5** model.
- Detects anomalies (weapons).
- Captures and uploads snapshots on detection.
- Alerts via **Twilio WhatsApp**.

### 🌐 Web Dashboard

- Built with **Next.js App Router**.
- Lists all incidents with images and timestamps.
- Admins can mark incidents as **Resolved**.
- **Anonymous Reporting Form** for civilian submissions.

---

## 🛠 Tech Stack

| Layer        | Tech Used                                      |
|--------------|------------------------------------------------|
| Frontend     | Next.js 15 (App Router), TypeScript, TailwindCSS |
| Backend      | Node.js (via Next.js Route Handlers)           |
| Database     | Prisma ORM + SQLite/PostgreSQL                 |
| AI Model     | YOLOv5 (PyTorch)                               |
| Storage      | AWS S3 or local `/public/thumbnails`           |
| Alerts       | Twilio WhatsApp API                            |

---

## ⚙️ Backend API Routes

| Endpoint                     | Method | Description                    |
|-----------------------------|--------|--------------------------------|
| `/api/incidents`            | GET    | List all incidents             |
| `/api/incidents/:id`        | PATCH  | Mark an incident as resolved   |
| `/api/report`               | POST   | Accept anonymous reports       |

---

## 🧾 Frontend Features

- 💥 Real-time display of incidents.
- 🖼️ Renders images from `public/thumbnails/` or S3.
- ✅ Toggle incident status as *Resolved*.
- 🕵️ Anonymous incident reporting page (no login).

---

## 📸 Image Handling

Thumbnails are stored in:

```

public/thumbnails/

```

Example:
```

/public/thumbnails/thumb\_532.jpg

```

They are accessible at:
```

[http://localhost:3000/thumbnails/thumb\_532.jpg](http://localhost:3000/thumbnails/thumb_532.jpg)

```

---

## 🗂 Folder Structure

```

secure-sight-dashboard/
├── app/
│   ├── page.tsx              # Main dashboard
│   └── api/
│       └── incidents/        # API routes (GET, PATCH)
├── prisma/
│   ├── schema.prisma         # DB schema
│   └── seed.ts               # Seeder script
├── public/
│   └── thumbnails/           # Demo thumbnails
├── styles/                   # Tailwind CSS config
├── package.json
├── README.md                 # ← You're here!
└── tsconfig.json

````

---

## 🚀 Getting Started (Local Dev)

```bash
# 1. Clone the repo
git clone https://github.com/mmdnayeem4705/Anamoly-Detection.git
cd secure-sight-dashboard

# 2. Install dependencies
npm install

# 3. Setup DB and seed it
npx prisma db push
npx prisma db seed

# 4. Start the server
npm run dev

# 5. Visit dashboard
http://localhost:3000
````

---

## 🔄 Key Improvements in Current Version

* ✅ Working "Mark as Resolved" button
* ✅ Incident thumbnails rendered from `/public/thumbnails/`
* ✅ Server-side fetching with `cache: 'no-store'`
* ✅ Tailwind-based card UI and loading states
* ✅ Optimized database schema with mock data

---

## 🧠 Learnings

* 🔄 Full-stack workflows using **Next.js App Router**.
* 🧠 Deploying and tuning **real-time AI models**.
* 📸 Handling image uploads securely & efficiently.
* 📤 Sending alerts via external APIs (Twilio).
* 💬 Anonymous forms without compromising UX.

---


## 🧗 Challenges Faced

* Reducing false positives from object detection.
* Proper file path mapping in Next.js public assets.
* Making PATCH APIs update UI in real time.
* Combining AI, cloud, and web in one unified flow.

---

## 🔮 Future Goals

* 🌐 Deploy full stack app to **Vercel**
* 🎥 Add short video recording of incident detection
* 🧠 Add OpenAI-based report summarization
* 📱 Native app or PWA integration
* 👮‍♂️ Role-based login with dashboards

---

## 👨‍💻 Developed By

**M Mohammed Nayeem**

* [GitHub](https://github.com/mmdnayeem4705)
* [LinkedIn](https://www.linkedin.com/in/mulla-mohammed-nayeem-09b33a361/)

---

## ⭐ GitHub

If you found this project interesting, feel free to ⭐ it and follow for more!

[👉 Visit Repository](https://github.com/mmdnayeem4705/Anamoly-Detection)

````
Perfect meeyan! Since you're using **SQLite** and **Prisma**, here’s your **full working command set and dev flow** — tailored exactly for that setup 👇

---

## ✅ FULL DEV SETUP FOR SQLITE + PRISMA + NEXT.JS 15

### ⚙️ 1. Install Dependencies

```bash
npm install
```

---

### 🧱 2. Set Up the SQLite DB with Prisma

```bash
npx prisma db push
```

✅ This creates the database file (`dev.db`) and syncs models from `prisma/schema.prisma`.

---

### 🌱 3. (Optional) Seed Your Database

If you have a `prisma/seed.ts` and you declared this in `package.json`:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Then run:

```bash
npx prisma db seed
```

This will insert dummy data (like thumbnails, incidents, etc.)

---

### 🚀 4. Start Your Development Server

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

✅ You’ll see your CCTV Dashboard, incident player, and image thumbnails.

---

### 🔍 5. View or Test API Routes

You can open or test these directly:

| Method  | URL                                                     | Description                                      |
| ------- | ------------------------------------------------------- | ------------------------------------------------ |
| `GET`   | [`/api/incidents`](http://localhost:3000/api/incidents) | List all CCTV incident logs                      |
| `PATCH` | `/api/incidents/[id]`                                   | Mark incident as resolved                        |
| `GET`   | [`/api/health`](http://localhost:3000/api/health)       | Check API status                                 |
| `GET`   | `/thumbnails/...`                                       | Load thumbnail images from `/public/thumbnails/` |

Test with curl:

```bash
curl http://localhost:3000/api/incidents
```

---

### 🔬 6. Visual DB Explorer (Optional)

```bash
npx prisma studio
```

Open browser:

```
http://localhost:5555
```

✅ You can view/edit data from your SQLite DB in a GUI.

---

### 📂 Folder Expectations (Important)

Ensure:

```
project-root/
├─ public/
│  └─ thumbnails/
│     └─ thumb_001.jpg ✅
├─ prisma/
│  └─ schema.prisma ✅
│  └─ seed.ts ✅ (optional)
├─ pages/ or app/
│  └─ api/
│     └─ incidents/
│     └─ report.ts (if anonymous reporting)
```

---

### 🧠 Common Issues Fix

**Q: `GET /thumbnails/xyz.jpg` shows 404?**
✅ FIX: Place your image inside `public/thumbnails/`
📁 → Correct path: `public/thumbnails/thumb_001.jpg`

---

## 🏁 Summary Commands Recap

```bash
npm install                  # Install deps
npx prisma db push          # Sync schema to SQLite
npx prisma db seed          # (Optional) Seed initial data
npm run dev                 # Start dev server
npx prisma studio           # (Optional) GUI for DB

---

### ✅ Do This Next:

1. Save the above content in a file named `README.md`.
2. Put it in the root folder of your project (`secure-sight-dashboard/`).
3. Push to GitHub:

```bash
git add README.md
git commit -m "Added complete project README"
git push origin main
````
<img width="1920" height="1080" alt="Screenshot (35)" src="https://github.com/user-attachments/assets/eda1a1d9-d273-4576-aca4-e412bd915ea6" />
<img width="1920" height="1080" alt="Screenshot (34)" src="https://github.com/user-attachments/assets/f099cd14-61a3-414b-8a01-5ff2db462cfd" />
<img width="1920" height="1080" alt="Screenshot (25)" src="https://github.com/user-attachments/assets/860ca9bb-b7e2-4eba-8f24-6730704506e2" />
<img width="1920" height="1080" alt="Screenshot (26)" src="https://github.com/user-attachments/assets/12b4ba9f-aa30-4039-9330-3bb4a1014ff3" />
<img width="1920" height="1080" alt="Screenshot (27)" src="https://github.com/user-attachments/assets/9a3ac64b-bfcb-4dfb-986c-dbf6b3b7a73d" />
<img width="1920" height="1080" alt="Screenshot (32)" src="https://github.com/user-attachments/assets/50e48362-f9e4-4d8a-803c-879b49e7e10c" />
