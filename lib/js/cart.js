import { whichUser } from "./login.js";

window.removeFromCart = removeFromCart;

async function getCartProducts(){
    let total = 0;

    const userId = await whichUser('../php/login.php?action=whichUser')
    let form = new FormData();
    form.append('userId', userId);

    const response = await fetch("../php/cart.php?action=getCartProducts",{
        method: 'POST',
        body: form
    })

    const products = await response.json();
    products.forEach(product => {
        let card = `
        <div class="product-card">
            <img src="..${product.img_url}" alt="Produto 1">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="remove-button" id="${product.id}" onclick="removeFromCart(${product.id})" >Remover</button>
            </div>
        </div>
        <hr class="divider-light">`
        document.querySelector(".products-container").innerHTML += card;
        total += parseFloat(product.price)
    });

    let totalPriceCard = `
    <div class="total-price">
            <p>Total: $${parseFloat(total)}</p>
        </div>`
    document.querySelector(".total-price-container").innerHTML = totalPriceCard;
}

async function removeFromCart(productId){
    const userId = await whichUser('../php/login.php?action=whichUser');
    console.log(userId);
    console.log(productId);

    let form = new FormData();
    form.append('user_id', userId);
    form.append('product_id', productId)

    const response = await fetch("../php/cart.php?action=removeFromCart",{
        method: "POST",
        body:form
    });

    window.location.reload();
}

document.querySelector(".checkout-button").addEventListener('click', ()=>{
    window.location.href = "./checkout.html"
})

document.querySelector("#header-back-btn").addEventListener('click',()=>{
    window.location.href = "../../index.html"
});
document.querySelector("#footer-back-btn").addEventListener('click',()=>{
    window.location.href = "../../index.html"
})

getCartProducts();