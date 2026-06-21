import { initializeApp } from "https://www.gstatic.com/firebasejs/10.X.X/firebase-app.js";
// Asegúrate de importar getDatabase para la Realtime Database
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.X.X/firebase-database.js"; 

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    databaseURL: "TU_DATABASE_URL", // ¡Esta es super importante para Realtime Database!
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// 1. Inicializas la App
const app = initializeApp(firebaseConfig);

// 2. Inicializas la base de datos y LA EXPORTAS como 'db'
export const db = getDatabase(app); 

// 3. También debes exportar las funciones que usas en tu script.js
export { ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/10.X.X/firebase-database.js";
