<?php
// backend/process.php

// ✅ Set Header for JSON
header('Content-Type: application/json');

// ✅ History Data File Path
$history_file = '../data/history.json';

// ✅ Get POST Data
$action = $_POST['action'];
$choice = $_POST['choice'];
$balance = intval($_POST['balance']);

// ✅ Random Number & Big/Small Logic
$random_number = rand(1, 10);
$big_small = $random_number > 5 ? 'big' : 'small';
$random_color = ['green', 'violet', 'red'][rand(0, 2)];

// ✅ Generate Period
$period = date('Ymd-His') . rand(100, 999);

// ✅ Game Result
if ($action === 'play_color' || $action === 'play_number') {
    $message = "Result: $random_number - $big_small, Color: $random_color";
    
    // ✅ Update History
    $history = [];
    if (file_exists($history_file)) {
        $history = json_decode(file_get_contents($history_file), true);
    }

    // ✅ New History Entry
    $new_entry = [
        'period' => $period,
        'number' => $random_number,
        'big_small' => $big_small,
        'color' => $random_color
    ];
    array_unshift($history, $new_entry);
    file_put_contents($history_file, json_encode($history));

    echo json_encode([
        'message' => $message,
        'balance' => $balance - 100
    ]);
} else {
    echo json_encode(['error' => 'Invalid action']);
}
?>
