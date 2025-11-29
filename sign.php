<?php
$conn = mysqli_connect("localhost", "root", "", "elementopedia");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get form data
$username = $_POST['username'];
$password = $_POST['password'];
$conpassword = $_POST['conpassword'];

if (!preg_match("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $username)) {
    header("Location: sign.html?error=3"); // invalid email format
    exit();
}


// 2. Check if passwords match
if ($password !== $conpassword) {
    header("Location: sign.html?error=4"); // password mismatch
    exit();
}

// 3. Insert into DB
$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
$result = mysqli_query($conn, $sql);

if ($result) {
    header("Location: homes.html?error=2"); // success
    exit();
} else {
    header("Location: sign.html?error=1"); // db insert error
    exit();
}

mysqli_close($conn);
?>
