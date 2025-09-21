

## Project info

**URL**:(https://zenflow-youth.lovable.app)

# Youth Mental Wellness App — README.md

> A cross-platform mental wellness companion for youth combining AI-powered support, community care, self-help tools and emergency resources.

---


## Project Overview
**Youth Mental Wellness App** is designed to give young people an accessible, stigma-free place for mental health support. The app blends:
- 24/7 **AI chatbot** for listening & coping suggestions,  
- **Community care** spaces and mentor support,  
- **Self-care toolkit** (journaling, meditations, mood tracker),  
- **Emergency features** (SOS, helplines, fallback SMS).

---

## Features
- Secure registration & role-based access (User / Mentor / Admin)  
- AI-driven personalized recommendations and conversation flows  
- Mood tracking & progress charts  
- Community groups with anonymous posting option  
- Daily reminders, guided exercises, journaling  
- SOS / Crisis support integration (helpline, location share)  
- Activity logs for admin (audit trail, exportable .txt)

---

## Tech Stack
- **Frontend (Web):** React (Vite or CRA)  
- **Mobile (optional):** React Native with Expo  
- **Backend:** Node.js + Express (example) — can swap for FastAPI or Django  
- **DB:** MongoDB (Atlas) or Firebase Firestore  
- **Auth:** JWT (backend) or Firebase Auth  
- **AI/NLP:** OpenAI (or any LLM provider)  
- **Hosting:** Vercel / Netlify (frontend), Heroku / Render / Railway / AWS (backend)  
- **Storage:** AWS S3 / Firebase Storage for media

---

## Repository Layout (suggested)
/ (repo root)
├─ frontend/ # React web app
│ ├─ src/
│ ├─ public/
│ └─ package.json
├─ mobile/ # Optional: Expo React Native app
├─ backend/ # Node.js + Express API
│ ├─ src/
│ └─ package.json
├─ docs/
└─ README.md

---

## Quickstart (Run locally)

> These instructions assume you have Node.js (>=16), npm or yarn, and Git installed.

### Frontend (React)
1. Open terminal → clone & install:
   ```bash
   git clone <REPO_URL>
   cd <REPO_ROOT>/frontend
   npm install

