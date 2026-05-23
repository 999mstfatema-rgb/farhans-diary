import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyBdbHoaDhKjlydvDL1HDu9KuVSBEeGTkIA",

authDomain: "farhans-diary.firebaseapp.com",

projectId: "farhans-diary",

storageBucket: "farhans-diary.firebasestorage.app",

messagingSenderId: "856421576567",

appId: "1:856421576567:web:9fe122351bf06902defb72",

measurementId: "G-5MSXBKMQ63"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
