import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_APIKEY,
  authDomain: import.meta.env.REACT_APP_AUTHDOMAIN,
  databaseURL: import.meta.env.REACT_APP_DATABASEURL,
  projectId: import.meta.env.REACT_APP_PROJECTID,
  messagingSenderId: import.meta.env.REACT_APP_MESSAGINGSENDERID,
  appId: import.meta.env.REACT_APP_APPID,
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
export { app, firestore };
