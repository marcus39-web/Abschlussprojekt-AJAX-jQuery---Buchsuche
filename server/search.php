<?php
require_once "pdo-connect.inc.php";

if (empty($_GET)) {
  echo json_encode(array('err' => '<p>1 Keine Datensätze gefunden.</p>'));
}
if (empty($_GET['q'])) {
  echo json_encode(array('err' => '<p>2 Keine Datensätze gefunden.</p>'));
  exit;
} else {
  $strSearch = '%'.$_GET['q'].'%';
}

$arrOutput = array();

$sql = 'SELECT `id`, `isbn`, `title`, `author`, `publisher`, `image`  FROM `items` WHERE `title` LIKE :t';

try {
  if ($stmt = $pdo->prepare($sql)) {
    $stmt->bindParam( ':t', $strSearch);
    $stmt->execute();
    if( $stmt->rowCount() === 0 ) {
      $arrOutput = array('err' => '<p>Keine Datensätze gefunden.</p>');
    } else {
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $arrOutput[] = $row;
      }
    }
  }
} catch (PDOException $e) {
  $arrOutput = array('err' => $e->getMessage());
}

echo json_encode($arrOutput);
$stmt = NULL;
$pdo = NULL;