# 🚀 KIDO: AI-Powered Social Learning Ecosystem for Kids

![Target Audience: 6–14 Years](https://img.shields.io/badge/Age_Group-6%E2%80%9314_Years-blue)
![Platform: Mobile](https://img.shields.io/badge/Platform-Mobile_First-green)
![Status: Active Development](https://img.shields.io/badge/Status-Active_Development-orange)
![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red)

## 📖 Overview

**Kido** is a mobile-first AI-powered educational platform designed to help children build daily learning habits through structured social visibility and gamified engagement in a fully parent-controlled environment.

**Core Concept:**
> “Children build daily learning habits through structured social visibility and gamified engagement in a fully parent-controlled environment.”

## 🎯 Product Goals
- **Consistency:** Increase daily learning consistency (streak behavior)
- **Safety:** Provide a safe digital learning ecosystem
- **Collaboration:** Enable parent + school collaboration
- **Personalization:** Deliver adaptive personalized learning paths

---

## 👥 User Roles & Permissions

### 👶 Child User
- **Capabilities:** Watch lessons, Play quizzes, Earn XP/badges/streaks, View leaderboards, Join classes.
- **Restrictions:** No messaging, No public profile, No external interaction.

### 👨‍👩‍👧 Parent User
- **Capabilities:** Manage child accounts, approve friends/teachers/classes, monitor progress/screen time.

### 🧑‍🏫 Teacher User
- **Capabilities:** Create class groups, assign lessons, view limited student progress.
- **Restrictions:** No private chat, no access to parent data.

### 🏫 Principal/Admin
- **Capabilities:** Manage teachers, view aggregated analytics, create school challenges.

---

## 🛠 Technology Stack
- **Backend:** Python / FastAPI
- **Frontend:** Flutter (Android/iOS)
- **Database:** PostgreSQL (Core) / Firebase (Auth/realtime flags)
- **AI Integration:** OpenAI API
- **Deployment:** AWS / Render / Google Play

---

## 🏗 System Architecture (Mobile -> API -> DB)

Kido consists of a highly scalable, secure microservice layer handling Flutter client requests.

For a deeper dive, check out the documentation in `docs/`:
- [System Architecture](docs/diagrams/system_architecture.md)
- [Database Schema](docs/diagrams/database_schema.md)
- [Investor Pitch](docs/pitch/investor_pitch.md)
- [Presentation](docs/presentation/product_presentation.md)

---

## 🚀 Getting Started

### Local Setup (Backend)
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/kido.git

# 2. Setup Virtual Environment
cd kido/backend
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows

# 3. Install requirements
pip install -r requirements.txt

# 4. Run the server
uvicorn app.main:app --reload
```

### Local Setup (Frontend)
```bash
cd kido/frontend
flutter pub get
flutter run
```

---

## 📜 Legal

Copyright © 2026 FelixX-Tech. All rights reserved.
See [LICENSE](LICENSE) for more details.
