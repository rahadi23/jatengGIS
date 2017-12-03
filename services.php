<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sigbase";
date_default_timezone_set("Asia/Bangkok");

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $contents = null;

  if(isset($_GET["request"])) {
    $key = $_GET["request"];

    if($key == "getProfilKab") {
      if(isset($_GET["hasc"])) {
        $hasc = $_GET["hasc"];
        $stmt = $GLOBALS['conn']->prepare("SELECT * FROM profil_kabupaten WHERE hasc=?");
        $stmt->execute(array($hasc));
      } else {
        $stmt = $GLOBALS['conn']->prepare("SELECT * FROM profil_kabupaten");
        $stmt->execute();
      }
      $contents = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    if($key == "getDataUtama" && isset($_GET["tipe"])) {
      $tipe = $_GET["tipe"];
      if($tipe !== "all") {
        if(isset($_GET["hasc"])) {
          $hasc = $_GET["hasc"];
          $stmt = $GLOBALS['conn']->prepare("SELECT hasc,$tipe AS 'value' FROM data_utama WHERE hasc=?");
          $stmt->execute(array($hasc));
        } else {
          $stmt = $GLOBALS['conn']->prepare("SELECT hasc,$tipe AS 'value' FROM data_utama");
          $stmt->execute();
        }
      } else {
        $stmt = $GLOBALS['conn']->prepare("SELECT * FROM data_utama");
        $stmt->execute();
      }
      $contents = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    if($key == "getAvailableData") {
      if(isset($_GET["id"])) {
        $id = $_GET["id"];
        $stmt = $GLOBALS['conn']->prepare("SELECT * FROM deskripsi_data WHERE id_atribut=?");
        $stmt->execute(array($id));
      } else {
        $stmt = $GLOBALS['conn']->prepare("SELECT * FROM deskripsi_data");
        $stmt->execute();
      }

      $contents = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
  }
} catch(PDOException $e) {
  $status = $e->getCode();
  $description = $e->getMessage();
}

echo json_encode($contents);

$conn = null;
?>
