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
let isMouseDown = false; // ตัวแปรที่เก็บสถานะการกดคลิก

// Popcat Click (mousedown)
popcat.addEventListener("mousedown", () => {
  isMouseDown = true;
  popcat.src = "cat-clicked.png"; // เปลี่ยนรูปเมื่อกดคลิก
});

// Popcat Mouse Up (mouseup)
popcat.addEventListener("mouseup", () => {
  if (isMouseDown) {
    isMouseDown = false;
    popcat.src = "cat.png"; // กลับเป็นรูปเดิมเมื่อปล่อยคลิก
  }
});

// Popcat Mouse Leave (mouseleave)
popcat.addEventListener("mouseleave", () => {
  if (isMouseDown) {
    isMouseDown = false;
    popcat.src = "cat.png"; // กลับเป็นรูปเดิมหากเมาส์ออกจากภาพ
  }
});

// เพิ่มคะแนนเมื่อคลิก
popcat.addEventListener("mousedown", () => {
  score++;
  scoreDisplay.textContent = score;
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
