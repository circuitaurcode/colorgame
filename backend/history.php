<?php
// backend/history.php

// ✅ Set Header for JSON
header('Content-Type: application/json');

// ✅ History Data File Path
$history_file = '../data/history.json';

// ✅ Check if History File Exists
if (file_exists($history_file)) {
    $history_data = file_get_contents($history_file);
    echo $history_data; // ✅ Return History Data
} else {
    echo json_encode([]); // ⛔ No Data Found
}
?>
