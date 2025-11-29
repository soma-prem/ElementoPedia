<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "elementopedia";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  echo json_encode(["error" => "Connection failed"]);
  exit;
}

$sql = "SELECT api_key FROM api_keys WHERE service='gemini' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  echo json_encode(["apiKey" => $row["api_key"]]);
} else {
  echo json_encode(["error" => "No API key found!"]);
}

$conn->close();
?>
