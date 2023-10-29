<?php
include("connect.php");

$sql = "SELECT * FROM produtos";
$result = mysqli_query($conn, $sql);

$products = array();

while($row = mysqli_fetch_assoc($result)) {
    $products[] = array(
        'id' => $row['id'],
        'name' => $row['nome'],
        'price' => $row['preco'],
        'cost' => $row['custo'],
        'img_url'=> $row['url_imagem']
    );
}

mysqli_free_result($result);
mysqli_close($conn);

echo json_encode($products);
?>