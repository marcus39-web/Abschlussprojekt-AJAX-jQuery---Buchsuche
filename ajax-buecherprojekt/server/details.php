<?php
// Stellt die Verbindung zur Datenbank her
require_once "pdo-connect.inc.php";

// Prüft, ob ein GET-Parameter übergeben wurde
if (empty($_GET)) {
  $arrOutput = array(array('err' => '<p>Keine Datensätze gefunden.</p>'));
  exit;
}
// Prüft, ob der Suchparameter 'q' gesetzt ist
if (empty($_GET['q'])) {
  $arrOutput = array(array('err' => '<p>Keine Datensätze gefunden.</p>'));
  exit;
} else {
  // ID des Buches aus dem Query-Parameter
  $strSearch = (int)$_GET['q'];
}

$arrOutput = array();

// SQL-Statement für die Buchsuche nach ID
$sql = 'SELECT *  FROM `items` WHERE `id` = :id';

try {
  if ($stmt = $pdo->prepare($sql)) {
    $stmt->bindParam(':id', $strSearch);
    $stmt->execute();
    // Prüft, ob ein Datensatz gefunden wurde
    if ($stmt->rowCount() === 0) {
      $arrOutput = array(array('err' => '<p>Keine Datensätze gefunden.</p>'));
    } else {
      // Gibt den gefundenen Datensatz als assoziatives Array zurück
      $arrOutput = $stmt->fetch(PDO::FETCH_ASSOC);
    }
  }
} catch (PDOException $e) {
  // Fehlerbehandlung bei Datenbankfehlern
  $arrOutput = array(
    array('err' => $e->getMessage())
  );
}

// Gibt das Ergebnis als JSON zurück
echo json_encode($arrOutput);
$stmt = NULL;
$pdo = NULL;
