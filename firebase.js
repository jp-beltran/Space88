import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDP3J3ClucVSplXZ96yFx2FYFpcIXiGTnU",
    authDomain: "space88-e9a0d.firebaseapp.com",
    projectId: "space88-e9a0d",
    storageBucket: "space88-e9a0d.appspot.com", // Certifique-se que está correto
    messagingSenderId: "334823559744",
    appId: "1:334823559744:web:c46acad726650eae9b05a5",
    measurementId: "G-297RPJZJM3"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Exportar serviços
export const auth = getAuth(app);         // Autenticação
export const db = getFirestore(app);      // Firestore Database
