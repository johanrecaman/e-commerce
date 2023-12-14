<?php
$hostname = "localhost";
$dbname = "ecommerce";
$username = "root";
$password = "rooot";

$conn = mysqli_connect($hostname, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_set_charset($conn, "utf8");
?>