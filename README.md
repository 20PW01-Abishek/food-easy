# 🍔 Food Easy

> Craziness and foodiness, at your doorstep.

A food delivery web app built with **React + Vite**, **Firebase**, **Tailwind CSS**, and **Leaflet**.

🌐 **Live**: [foodeasy.onrender.com](https://foodeasy.onrender.com)

---

## 🚀 Getting Started

### 1. Install

```bash
npm install
```

### 2. Set up Firebase

Create a project at [console.firebase.google.com](https://console.firebase.google.com), enable **Authentication** (Google provider), **Firestore**, and **Storage**.

Then create a `.env` file in the project root:

```env
REACT_APP_APIKEY=your_api_key
REACT_APP_AUTHDOMAIN=your_project.firebaseapp.com
REACT_APP_DATABASEURL=https://your_project-default-rtdb.firebaseio.com
REACT_APP_PROJECTID=your_project_id
REACT_APP_STORAGEBUCKET=your_project.appspot.com
REACT_APP_MESSAGINGSENDERID=your_sender_id
REACT_APP_APPID=your_app_id
REACT_APP_ADMIN_EMAIL=youremail@gmail.com
```

In Firebase Console → Firestore → **Rules**, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /foodItems/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /orders/{orderId} {
      allow create, read: if request.auth != null;
    }
  }
}
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📜 Scripts

```bash
npm run dev       # start dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

Built with ❤️ by **20PW01** & **20PW39**.