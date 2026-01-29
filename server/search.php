<?php
// Stellt die Verbindung zur Datenbank her
require_once "pdo-connect.inc.php";

// Prüft, ob ein GET-Parameter übergeben wurde
if (empty($_GET)) {
  echo json_encode(array('err' => '<p>1 Keine Datensätze gefunden.</p>'));
}
// Prüft, ob der Suchparameter 'q' gesetzt ist
if (empty($_GET['q'])) {
  echo json_encode(array('err' => '<p>2 Keine Datensätze gefunden.</p>'));
  exit;
} else {
  // Suchbegriff für die Titelsuche
  $strSearch = '%' . $_GET['q'] . '%';
}

$arrOutput = array();

// SQL-Statement für die Suche nach Buchtiteln
$sql = 'SELECT `id`, `isbn`, `title`, `author`, `publisher`, `image`  FROM `items` WHERE `title` LIKE :t';

try {
  if ($stmt = $pdo->prepare($sql)) {
    $stmt->bindParam(':t', $strSearch);
    $stmt->execute();
    // Prüft, ob Treffer gefunden wurden
    if ($stmt->rowCount() === 0) {
      $arrOutput = array('err' => '<p>Keine Datensätze gefunden.</p>');
    } else {
      // Fügt alle gefundenen Bücher dem Ergebnisarray hinzu
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $arrOutput[] = $row;
      }
    }
  }
} catch (PDOException $e) {
  // Fehlerbehandlung bei Datenbankfehlern
  $arrOutput = array('err' => $e->getMessage());
}

// Gibt das Ergebnis als JSON zurück
echo json_encode($arrOutput);
$stmt = NULL;
$pdo = NULL;
