// ✅ Game.js - Full Code with All Updated Features

let balance = 1000; // Initial Balance
let timer = 10; // Timer Duration in Seconds
let timerInterval; // Timer Reference
let periodCounter = 1; // Period Counter for History

// 🎮 Start Game on Page Load
window.onload = function () {
    fetchHistory(); // Load Previous Game History
    startGameWithTimer(); // Start Timer
};

// ⏱️ Start Game with Timer
function startGameWithTimer() {
    timer = 10; // Reset Timer
    document.getElementById('result').innerText = `Game starting in ${timer} seconds...`;

    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('result').innerText = `Game starting in ${timer} seconds...`;

        if (timer <= 0) {
            clearInterval(timerInterval);
            autoPlay(); // Auto Play Game After Timer Ends
        }
    }, 1000);
}

// 🎲 Auto Play Game After Timer Ends
function autoPlay() {
    const randomChoiceColor = ['green', 'violet', 'red'][Math.floor(Math.random() * 3)];
    
    // ✅ Corrected Number between 1 to 10
    const randomChoiceNumber = Math.floor(Math.random() * 10) + 1;

    // ✅ Correct Big/Small Logic
    const bigSmall = randomChoiceNumber > 5 ? 'big' : 'small';

    // ✅ Add Period for History
    const period = generatePeriod();

    // Show Random Number and Big/Small Result
    document.getElementById('result').innerText = `Number: ${randomChoiceNumber} - ${bigSmall}`;

    // ✅ Add to History Array
    updateHistory(period, randomChoiceNumber, bigSmall, randomChoiceColor);

    // Play with Auto Choice
    playColor(randomChoiceColor);
    playNumber(bigSmall, randomChoiceNumber);
}

// 🕒 Generate Period for History
function generatePeriod() {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}${Math.floor(Math.random() * 1000)}`;
}

// 📚 Update History Array and Display
function updateHistory(period, number, bigSmall, color) {
    const newRow = `
        <tr>
            <td class="p-2">${period}</td>
            <td class="p-2">${number}</td>
            <td class="p-2">${bigSmall}</td>
            <td class="p-2">${color}</td>
        </tr>
    `;
    document.getElementById('history').innerHTML = newRow + document.getElementById('history').innerHTML;
}


// 🔢 Play Number Prediction
function playNumber(choice, randomChoiceNumber) {
    const bigSmall = randomChoiceNumber > 5 ? 'big' : 'small';

    // Show Random Number and Big/Small Result
    document.getElementById('result').innerText = `Number: ${randomChoiceNumber} - ${bigSmall}`;

    // Send Request to Backend
    sendRequest('play_number', choice);
}


// 🎨 Play Color Prediction
function playColor(choice) {
    sendRequest('play_color', choice);
}

// 🔢 Play Number Prediction
function playNumber(choice, randomChoiceNumber) {
    const bigSmall = randomChoiceNumber > 5 ? 'big' : 'small';

    // Show Random Number and Big/Small Result
    document.getElementById('result').innerText = `Number: ${randomChoiceNumber} - ${bigSmall}`;

    // Send Request to Backend
    sendRequest('play_number', choice);
}

// 📡 Send Request to Backend
function sendRequest(action, choice) {
    const formData = new FormData();
    formData.append('action', action);
    formData.append('choice', choice);
    formData.append('balance', balance);

    fetch('backend/process.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            updateGameUI(data);
        })
        .catch(error => console.error('Error:', error));
}

// 🔄 Update Game UI
function updateGameUI(data) {
    document.getElementById('balance').innerText = data.balance;
    balance = data.balance;

    // Add to Game History
    addGameHistory(data);

    if (balance <= 0) {
        setTimeout(() => {
            alert("Game Over! Balance is zero. Resetting game...");
            resetGame();
        }, 1000);
    } else {
        resetTimer();
    }
}

// 📝 Add Game History Dynamically
function addGameHistory(data) {
    const historyRow = `
        <tr>
            <td class="p-2">${periodCounter++}</td>
            <td class="p-2">${data.number}</td>
            <td class="p-2">${data.big_small}</td>
            <td class="p-2">${data.color}</td>
        </tr>
    `;
    document.getElementById('history').insertAdjacentHTML('afterbegin', historyRow);
}

// 🔄 Reset Timer and Restart Game
function resetTimer() {
    clearInterval(timerInterval);
    startGameWithTimer();
}

// 🛑 Reset Game
function resetGame() {
    balance = 1000;
    document.getElementById('balance').innerText = balance;
    document.getElementById('result').innerText = '--';
    resetTimer();
}

// Fetch Game History
function fetchHistory() {
    fetch('backend/history.php')
        .then(response => response.json())
        .then(data => {
            let historyHtml = '';
            console.log('History Data:', data); // ✅ Debug Log for Check

            data.forEach(item => {
                historyHtml += `
                    <tr>
                        <td class="p-2">${item.period}</td>
                        <td class="p-2">${item.number}</td>
                        <td class="p-2">${item.big_small}</td>
                        <td class="p-2">${item.color}</td>
                    </tr>
                `;
            });

            document.getElementById('history').innerHTML = historyHtml;
        })
        .catch(error => console.error('Error fetching history:', error));
}

