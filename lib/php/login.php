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
        $sql = "SELECT * FROM usuarios WHERE email = '$email'";
        $result = mysqli_query($conn, $sql);

        if(mysqli_fetch_assoc($result)){
            return json_encode("senha_invalida");
        }
        else{
            return json_encode("email_invalido");
        }
    }
}

function signup($conn){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = md5($_POST['password']);

    $sqlCreateUser = "INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES ('$name', '$email', '$password', 'user')";
    $sqlCheckIfUserExists = "SELECT * FROM usuarios WHERE email = '$email'";

    $result = mysqli_query($conn, $sqlCheckIfUserExists);

    if(mysqli_fetch_assoc($result)){
        return json_encode("error");
    }
    else{
        mysqli_query($conn, $sqlCreateUser);
        return json_encode("success");
    }
}

function isLoggedIn(){
    return json_encode($_SESSION['user_type']);
}

function whichUser(){
    return $_SESSION['user_id'];
}
function logout(){
    session_destroy();
    $_SESSION['user_type'] = 'none';
    return $_SESSION['user_type'];
}


$action = $_GET['action'];

if($action == 'login'){
    echo login($conn);
    mysqli_close($conn);
    exit();
}
else if($action == 'signup'){
    echo signup($conn);
    mysqli_close($conn);
    exit();
}
else if($action == 'isLoggedIn'){
    echo isLoggedIn();
    exit();
}
else if($action == 'whichUser'){
    echo whichUser();
    exit();
}
else if($action == 'logout'){
    echo logout();
    exit();
}

?>