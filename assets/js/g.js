// game.js - Frontend JavaScript Logic

let balance = 1000;

// Play Color Prediction
function playColor(choice) {
    sendRequest('play_color', choice);
}

// Play Number Prediction
function playNumber(choice) {
    sendRequest('play_number', choice);
}

// Send Request to Backend
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

// Update Game UI
function updateGameUI(data) {
    document.getElementById('result').innerText = data.message;
    document.getElementById('balance').innerText = data.balance;

    balance = data.balance;
    
    if (balance <= 0) {
        setTimeout(() => {
            alert("Game Over! Balance is zero. Resetting game...");
            resetGame();
        }, 1000);
    }
}

// Reset Game
function resetGame() {
    balance = 1000;
    document.getElementById('balance').innerText = balance;
    document.getElementById('result').innerText = '--';
}
