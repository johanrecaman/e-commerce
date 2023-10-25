<?php
include("connect.php");

$email = $_POST['email'];
$password = md5($_POST['password']);

$sql = "SELECT tipo FROM usuarios WHERE email = $email AND senha = $password";
$result = mysqli_query($conn, $sql);

if($row = mysqli_fetch_row($result)){
    $userType = $row[0];
}
else{
    $userType = 0;
}

mysqli_close($conn);

echo $userType;
?>