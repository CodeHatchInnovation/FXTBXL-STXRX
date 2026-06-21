import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// Asegúrate de importar getDatabase para la Realtime Database
import { getDatabase } from "https://e-commerce-2ff74-default-rtdb.firebaseio.com/"; 

const firebaseConfig = {
    apiKey: "AIzaSyBgoDcmxdIYRqo5gup302xLWaKO3AHsC5Y",
    authDomain: "e-commerce-2ff74.firebaseapp.com",
    databaseURL: "https://e-commerce-2ff74-default-rtdb.firebaseio.com",
    projectId: "e-commerce-2ff74",
    storageBucket: "e-commerce-2ff74.firebasestorage.app",
    messagingSenderId: "1079041764789",
    appId: "1:1079041764789:web:63cc75dfd3e5a4e9d4bdfc",
    measurementId: "G-0BLDR9NWTK"
};

// 1. Inicializas la App
const app = initializeApp(firebaseConfig);

// 2. Inicializas la base de datos y LA EXPORTAS como 'db'
export const db = getDatabase(app); 

// 3. También debes exportar las funciones que usas en tu script.js
export { ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
