<?php
// Stellt die Verbindung zur Datenbank her
require_once "pdo-connect.inc.php";
// Setzt den Content-Type auf JSON
header('Content-Type: application/json; charset=utf-8');

// Prüft, ob ein Suchbegriff übergeben wurde
if (empty($_GET['q'])) {
    echo json_encode([]);
    exit;
}

// Bereitet den Suchbegriff für LIKE-Abfragen vor
$q = '%' . $_GET['q'] . '%';
// SQL: Sucht nach passenden Titeln oder Autoren (max. 10 Vorschläge)
$sql = "SELECT DISTINCT title FROM items WHERE title LIKE :q UNION SELECT DISTINCT author FROM items WHERE author LIKE :q LIMIT 10";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':q', $q);
    $stmt->execute();
    $results = [];
    // Fügt alle gefundenen Vorschläge in ein Array
    while ($row = $stmt->fetch(PDO::FETCH_NUM)) {
        $results[] = $row[0];
    }
    // Gibt die Vorschläge als JSON-Array zurück
    echo json_encode($results);
} catch (PDOException $e) {
    // Fehlerfall: leeres Array zurückgeben
    echo json_encode([]);
}
$pdo = null;
