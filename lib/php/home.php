<?php
include("connect.php");

$sql = "SELECT * FROM produtos";
$result = mysqli_query($conn, $sql);

$products = array();

while($row = mysqli_fetch_assoc($result)) {
    $products[] = array(
        'name' => $row['nome'],
        'price' => $row['preco'],
        'img_url' => $row['url_imagem']
    );
}
mysqli_free_result($result);
mysqli_close($conn);

echo json_encode($products);
?>
