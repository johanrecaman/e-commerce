<?php
session_start();
include("connect.php");

$email = $_POST['email'];
$password = md5($_POST['password']);

$sql = "SELECT tipo FROM usuarios WHERE email = '$email' AND senha_hash = '$password'";
$result = mysqli_query($conn, $sql);

if($row = mysqli_fetch_row($result)){
    $_SESSION['user_type'] = $row[0];
    if($_SESSION['user_type'] == 'adm'){
        echo json_encode("adm");
    }
    elseif($_SESSION['user_type'] == 'user'){
        echo json_encode("user");
    }
    else{
        echo json_encode("error");
    }
}
else{
    echo json_encode("error");
}
mysqli_close($conn);
exit();
?>