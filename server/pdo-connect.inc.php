<?php
// Datenbank-Konstanten für die Verbindung
define('DB_NAME', 'books');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

try {
    // Erstellt ein neues PDO-Objekt für die MySQL-Verbindung
    $pdo = new PDO('mysql:dbname=' . DB_NAME . ';host=' . DB_HOST . ';charset=' . DB_CHARSET . ';', DB_USER, DB_PASSWORD);
} catch (PDOException $e) {
    // Gibt eine Fehlermeldung aus, falls die Verbindung fehlschlägt
    die('ERROR:<br>' . $e->getMessage());
}
