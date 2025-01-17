// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbApK2L3JiWBvBHfk4TpLqKmOn5cUB0O0",
  authDomain: "popbabyangaun.firebaseapp.com",
  projectId: "popbabyangaun",
  storageBucket: "popbabyangaun.firebasestorage.app",
  messagingSenderId: "1076901800077",
  appId: "1:1076901800077:web:6a671611d56b1df4f15ac4",
  measurementId: "G-B8T6H9TDVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elements
const popcat = document.getElementById("popcat");
const scoreDisplay = document.getElementById("score");

let score = 0;

// Popcat Click
popcat.addEventListener("mousedown", () => {
  popcat.src = "cat-clicked.png"; // เปลี่ยนรูปเป็น cat-clicked.png เมื่อคลิก
});

popcat.addEventListener("mouseup", () => {
  popcat.src = "cat.png"; // กลับเป็น cat.png เมื่อปล่อยคลิก
});

// Save Score to Firebase
window.addEventListener("beforeunload", () => {
  if (score > 0) {
    const scoresRef = ref(db, "scores");
    const newScoreRef = push(scoresRef);
    set(newScoreRef, {
      score: score,
      timestamp: Date.now()
    });
  }
});
