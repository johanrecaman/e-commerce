<?php
include("connect.php");

$userId = $_POST['userId'];
$productId = $_POST['productId'];
$quantity = $_POST['quantity'];

$sql = "INSERT INTO carrinho_de_compras (usuario_id, produto_id, quantidade) VALUES ('$userId', '$productId', '$quantity')";
mysqli_query($conn, $sql);

echo "success";
?>