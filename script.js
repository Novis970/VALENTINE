// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let hasAnswered = false;
let musicPlaying = false;
const music = document.getElementById('backgroundMusic');

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    
    // Показываем модальное окно с вопросом
    const modal = document.getElementById('questionModal');
    modal.style.display = 'flex';
    
    // Пытаемся автоматически запустить музыку (может быть заблокировано браузером)
    if (music) {
        music.volume = 0.5;
    }
});

// ===== ПЛАВАЮЩИЕ СЕРДЕЧКИ =====
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const heartsCount = 20;
    
    for (let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 30 + 15) + 'px';
        container.appendChild(heart);
    }
}

// ===== ФУНКЦИИ ДЛЯ КНОПКИ "НЕТ" =====
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const container = document.getElementById('buttonContainer');
    
    if (!noBtn || !container || hasAnswered) return;
    
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transition = 'all 0.2s ease';
    
    const messages = ['Не получится! 😊', 'Пиздишь! 💝', 'Сознайся! ❤️', 'Ты же хочешь! 💖'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    noBtn.textContent = randomMessage;
}

// ===== ФУНКЦИИ ДЛЯ КОНФЕТТИ =====
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffffff', '#ffd700'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// ===== ФУНКЦИЯ ПРИ ОТВЕТЕ "ДА" =====
function answerYes() {
    if (hasAnswered) return;
    
    hasAnswered = true;
    const modal = document.getElementById('questionModal');
    const noBtn = document.getElementById('noBtn');
    
    modal.classList.add('hidden');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    createConfetti();
    showNotification('💝 С Днём Расстрела Чикатило! 💝');
    
    // Пытаемся включить музыку
    if (music) {
        music.play().catch(e => console.log('Музыка не включилась автоматически'));
    }
    
    setTimeout(() => {
        if (noBtn) {
            noBtn.style.position = 'static';
            noBtn.style.left = '';
            noBtn.style.top = '';
            noBtn.textContent = 'Нет 😢';
        }
    }, 1000);
}

// ===== ФУНКЦИИ ДЛЯ ОТКРЫТИЯ/ЗАКРЫТИЯ =====
function openValentine() {
    const card = document.getElementById('valentineCard');
    card.classList.add('open');
}

function closeValentine() {
    const card = document.getElementById('valentineCard');
    card.classList.remove('open');
}

// ===== ФУНКЦИЯ ДЛЯ МУЗЫКИ =====
function toggleMusic() {
    const btn = document.querySelector('.music-btn');
    
    if (musicPlaying) {
        music.pause();
        btn.classList.remove('playing');
        btn.textContent = '🎵';
    } else {
        music.play();
        btn.classList.add('playing');
        btn.textContent = '⏸️';
    }
    
    musicPlaying = !musicPlaying;
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== ЭКСПОРТ ФУНКЦИЙ =====
window.answerYes = answerYes;
window.moveNoButton = moveNoButton;
window.openValentine = openValentine;
window.closeValentine = closeValentine;
window.toggleMusic = toggleMusic;