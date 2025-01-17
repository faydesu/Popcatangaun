let score = 0;
const popImage = document.getElementById('pop-image');
const scoreDisplay = document.getElementById('score');

popImage.addEventListener('mousedown', () => {
    score++;
    scoreDisplay.textContent = score;
    popImage.src = 'pop-image-active.png'; // เปลี่ยนภาพเมื่อกด
});

popImage.addEventListener('mouseup', () => {
    popImage.src = 'pop-image.png'; // กลับไปที่ภาพเดิมเมื่อปล่อย
});

// ป้องกันกรณีที่คลิกนอกปุ่ม
document.addEventListener('mouseup', () => {
    popImage.src = 'pop-image.png';
});
