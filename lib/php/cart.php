<?php
include("connect.php");
function addToCart($conn){
    $userId = $_POST['userId'];
    $productId = $_POST['productId'];
    $quantity = $_POST['quantity'];

    $sql = "INSERT INTO carrinho_de_compras (usuario_id, produto_id, quantidade) VALUES ('$userId', '$productId', '$quantity')";
    mysqli_query($conn, $sql);

}

function getCartProducts($conn){
    $userId = $_POST["userId"];

    $sqlCartSelect = "SELECT produto_id FROM carrinho_de_compras WHERE usuario_id = '$userId'";
    $resultCart = mysqli_query($conn, $sqlCartSelect);

    $products = array();
    while($rowCart = mysqli_fetch_assoc($resultCart)){
        $productId = $rowCart['produto_id'];
        $sqlProductSelect = "SELECT * FROM produtos WHERE id = '$productId'";
        $resultProduct = mysqli_query($conn, $sqlProductSelect);
        while($rowProduct = mysqli_fetch_assoc($resultProduct)){
            $products[] = array(
                'id' => $rowProduct['id'],
                'name'=> $rowProduct['nome'],
                'price' => $rowProduct['preco'],
                'img_url' => $rowProduct['url_imagem']
            );
        }  
    }
    return $products;
}

function removeFromCart($conn){
    $userId = $_POST['user_id'];
    $productId = $_POST['product_id'];

    $sql = "DELETE FROM carrinho_de_compras WHERE usuario_id = '$userId' AND produto_id = '$productId' LIMIT 1";
    mysqli_query($conn, $sql);
}

$action = $_GET["action"];

if($action == "addToCart"){
    addToCart($conn);
    mysqli_close($conn);
    exit();
}
elseif($action == "getCartProducts"){
    echo json_encode(getCartProducts($conn));
    mysqli_close($conn);
    exit();
}
elseif($action == "removeFromCart"){
    removeFromCart($conn);
    mysqli_close($conn);
    exit();
}
?>