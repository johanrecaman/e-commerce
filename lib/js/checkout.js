import { whichUser } from "./login.js";

const checkboxes = document.querySelectorAll('.payment-checkbox')

checkboxes.forEach(checkbox=>{
    if(checkbox.checked == true){
        showPaymentForm(checkbox);
    }
    checkbox.addEventListener('change', ()=>{
        if(checkbox.checked == true){
            showPaymentForm(checkbox);
        }
        else{
            document.querySelector(".payment-form").innerHTML = "";
        }
        checkboxes.forEach(btn=>{
            if (btn != checkbox){
                btn.checked = false;
            }
        })
    })
})

async function showPaymentForm(checkbox){
    const container = document.querySelector(".payment-form");
    const total = await getTotal();
    let paymentForm = ""
    switch(checkbox.id){
        case'card':
            paymentForm = `
            <div id="card-name-container" class="form">
                <label for="card-name-input">Name on Card</label>
                <input type="text" id="card-name-input" class="input">
            </div>
            <div class="card-data">
                <div id="card-number-container" class="form">
                    <label for="card-number-input">Card Number</label>
                    <input type="text" id="card-number-input" class="input">
                </div>
                <div id="card-expiration-container" class="form" >
                    <label for="card-expiration-input">Expiration</label>
                    <input type="text" id="card-expiration-input" class="input">
                </div>
                <div id="card-cvv-container" class="form">
                    <label for="card-cvv-input">CVV</label>
                    <input type="text" id="card-cvv-input" class="input">
                </div>
                <div id="card-text-container">
                    <p id="terms-of-service-text">By clicking "Confirm Payment" I agree to the company Terms of Service</p>
                </div>
                    <div id="back-button-container" class="form">
                        <button class="back-button" onclick="goBack(event)" >
                            <img src="../img/other-img/arrow.svg" alt="Seta para Voltar">
                            Voltar
                        </button>
                    </div>
                    <div id="purchase-button-container">
                        <button class="purchase-button" type="submit">Confirmar Pagamento $${total}</button>
                    </div>
            </div>`
            break
        case 'pix':
            paymentForm = `
            <div class="card-data">
                <div id="name-container" class="form">
                    <label for="name-input">Nome</label>
                    <input type="text" id="name-input" class="input">
                </div>
                <div id="cpf-container" class="form">
                    <label for="cpf-input">CPF</label>
                    <input type="text" id="cpf-input" class="input">
                </div>
                    <div id="back-button-container" class="form">
                        <button class="back-button" onclick="goBack(event)" >
                            <img src="../img/other-img/arrow.svg" alt="Seta para Voltar">
                            Voltar
                        </button>
                    </div>
                    <div id="purchase-button-container">
                        <button class="purchase-button" onclick="showPixQR(event)" type="submit">Pagar $${total}</button>
                    </div>
                </div>`
            break
        case 'paypal':
            console.log("paypal form")
            break
    }
    container.innerHTML = paymentForm;
}

function goBack(event){
    event.preventDefault();
    window.location.href = "./cart.html"
}

async function getTotal(){
    let total = 0;

    const userId = await whichUser('../php/login.php?action=whichUser')
    let form = new FormData();
    form.append('userId', userId);

    const response = await fetch("../php/cart.php?action=getCartProducts",{
        method: 'POST',
        body: form
    })

    const products = await response.json();
    products.forEach(product=>{
        total += parseFloat(product.price)
    })

    return total;
}

function showPixQR(event){
    event.preventDefault();
    let formContainer = document.createElement("div")
    formContainer.className = "form-container"
    document.querySelector('.container').appendChild(formContainer);

    let qrCodeContainer = 
    `<div class="qr-code-container">
        <img id="qr-code-img" src="../img/other-img/cart.svg" alt="">
    </div>`
    
    document.querySelector(".form-container").innerHTML = qrCodeContainer;
}

window.goBack = goBack;
window.showPixQR = showPixQR;