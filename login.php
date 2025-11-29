<?php
$conn = mysqli_connect("localhost", "root", "", "elementopedia");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) == 1) {
    header("Location: homes.html");
    exit();
} else {
    header("Location: index.html?error=1");
    exit();

}

// Close connection
mysqli_close($conn);
?>
