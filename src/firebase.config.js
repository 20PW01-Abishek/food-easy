import React from "react";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_APIKEY,
  authDomain: import.meta.env.REACT_APP_AUTHDOMAIN,
  databaseURL: import.meta.env.REACT_APP_DATABASEURL,
  projectId: import.meta.env.REACT_APP_PROJECTID,
  storageBucket: import.meta.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.REACT_APP_MESSAGINGSENDERID,
  appId: import.meta.env.REACT_APP_APPID,
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, firestore, storage };
