<?php
session_start();
include("connect.php");

if (!isset($_SESSION['user_type'])) {
    $_SESSION['user_type'] = 'none';
}

function login($conn){
    $email = $_POST['email'];
    $password = md5($_POST['password']);

    $sql = "SELECT * FROM usuarios WHERE email = '$email' AND senha_hash = '$password'";
    $result = mysqli_query($conn, $sql);

    if($row = mysqli_fetch_assoc($result)){

        $_SESSION['user_id'] = $row['id'];
        $_SESSION['user_type'] = $row['tipo'];

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
    session_start();
    $_SESSION['user_type'] = 'none';
}

function isLoggedIn(){
    return json_encode($_SESSION['user_type']);
}

function whichUser(){
    return $_SESSION['user_id'];
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
else if($action == 'whichUser'){
    echo whichUser();
    exit();
}

?>