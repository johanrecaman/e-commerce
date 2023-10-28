<?php
session_start();
include("connect.php");

function login($conn){
    $email = $_POST['email'];
    $password = md5($_POST['password']);

    $sql = "SELECT tipo FROM usuarios WHERE email = '$email' AND senha_hash = '$password'";
    $result = mysqli_query($conn, $sql);

    if($row = mysqli_fetch_row($result)){
        $_SESSION['user_type'] = $row[0];
        if($_SESSION['user_type'] == 'adm'){
            return json_encode("adm");
        }
        elseif($_SESSION['user_type'] == 'user'){
            return json_encode("user");
        }
    }
    else{
        return json_encode("error");
    }
}

function logout(){
    session_destroy();

}

function isLoggedIn(){
    return json_encode($_SESSION['user_type']);
}


$action = $_GET['action'];

if($action == 'login'){
    echo login($conn);
    mysqli_close($conn);
    exit();
}
else if($action == 'isLoggedIn'){
    echo isLoggedIn();
    exit();
}
else if($action == 'logout'){
    logout();
    exit();
}

?>