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

// ฟังก์ชันเริ่มต้นเมื่อเริ่มกด
function onStart() {
  isMouseDown = true;
  changePopcatImage("cat-clicked.png"); // เปลี่ยนรูปเมื่อกดคลิก
  score++;  // เพิ่มคะแนน
  scoreDisplay.textContent = score; // อัปเดตคะแนน
}

// ฟังก์ชันเมื่อปล่อยคลิกหรือสัมผัส
function onEnd() {
  if (isMouseDown) {
    isMouseDown = false;
    changePopcatImage("cat.png"); // กลับเป็นรูปเดิมเมื่อปล่อยคลิก
  }
}

// การจับเหตุการณ์คลิกและสัมผัส
popcat.addEventListener("mousedown", onStart);
popcat.addEventListener("touchstart", (e) => {
  e.preventDefault();  // ป้องกันการทำงานของเบราว์เซอร์ (เช่นการซูม)
  onStart();
});

// การจับเหตุการณ์ปล่อยคลิกและสัมผัส
popcat.addEventListener("mouseup", onEnd);
popcat.addEventListener("touchend", onEnd);

// การจับเหตุการณ์ออกจากภาพ
popcat.addEventListener("mouseleave", onEnd);
popcat.addEventListener("touchcancel", onEnd);

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
