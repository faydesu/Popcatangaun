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

// ฟังก์ชันเปลี่ยนรูป
function changePopcatImage(imagePath) {
  popcat.src = imagePath;
}

// Popcat Mouse Down / Touch Start (mousedown หรือ touchstart)
popcat.addEventListener("mousedown", () => {
  isMouseDown = true;
  changePopcatImage("cat-clicked.png"); // เปลี่ยนรูปเมื่อกดคลิก
  score++;  // เพิ่มคะแนน
  scoreDisplay.textContent = score; // อัปเดตคะแนน
});

popcat.addEventListener("touchstart", (e) => {
  e.preventDefault();  // ป้องกันการทำงานของเบราว์เซอร์ (เช่นการซูม)
  isMouseDown = true;
  changePopcatImage("cat-clicked.png"); // เปลี่ยนรูปเมื่อกดคลิก
  score++;  // เพิ่มคะแนน
  scoreDisplay.textContent = score; // อัปเดตคะแนน
});

// Popcat Mouse Up / Touch End (mouseup หรือ touchend)
popcat.addEventListener("mouseup", () => {
  if (isMouseDown) {
    isMouseDown = false;
    changePopcatImage("cat.png"); // กลับเป็นรูปเดิมเมื่อปล่อยคลิก
  }
});

popcat.addEventListener("touchend", () => {
  if (isMouseDown) {
    isMouseDown = false;
    changePopcatImage("cat.png"); // กลับเป็นรูปเดิมเมื่อปล่อยคลิก
  }
});

// Popcat Mouse Leave / Touch Cancel (mouseleave หรือ touchcancel)
popcat.addEventListener("mouseleave", () => {
  if (isMouseDown) {
    isMouseDown = false;
    changePopcatImage("cat.png"); // กลับเป็นรูปเดิมหากเมาส์ออกจากภาพ
  }
});

popcat.addEventListener("touchcancel", () => {
  if (isMouseDown) {
    isMouseDown = false;
    changePopcatImage("cat.png"); // กลับเป็นรูปเดิมหากการสัมผัสถูกยกเลิก
  }
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
