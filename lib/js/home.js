import { loginToggle } from "./login.js";
import {verifyLogin} from "./login.js";
import { whichUser } from "./login.js";

window.searchBar = searchBar;
window.goToCart = goToCart;

const search = document.getElementById("search-input");

function searchBar() {
  const inputValue = search.value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    let cardName = card.querySelector(".card-name").innerText.toLowerCase();
    if (cardName.startsWith(inputValue)) {
      card.classList.remove("invisible");
    } else {
      card.classList.add("invisible");
    }
  });
}

async function showCards() {
  const response = await fetch("./lib/php/products.php", {
    method: "GET",
  });

  const data = await response.json();

  data.forEach((product) => {
    let content = `
    <div class="card">
        <div class="card-img">
          <img src="./lib${product.img_url}" alt="example" />
        </div>
        <p class="card-name">${product.name}</p>
        <p class="card-price">$${product.price}</p>
        <div class="card-btn-container" >
          <button class="card-btn" id="${product.id}">Adicionar ao Carrinho</button>
        </div>
    </div>`;

    document.querySelector(".main").innerHTML += content;
  });

  document.querySelectorAll(".card-btn").forEach((button)=>{
    button.addEventListener("click", ()=>{
      addToCart(parseInt(button.id), 1);
    })
  })
}


async function addToCart(productId, quantity) {
  const cartIcon = document.querySelector('.header-btn-img');
  
  if (await verifyLogin("./lib/php/login.php?action=isLoggedIn")) {
    let userId = await whichUser('./lib/php/login.php?action=whichUser');
    const data = new FormData();
    data.append('userId', userId);
    data.append('productId', productId);
    data.append('quantity', quantity);

    const productPromise = await fetch("./lib/php/cart.php?action=addToCart", {
        method: "POST",
        body: data
    });

    cartIcon.classList.add('jumping');
    setTimeout(() => {
        cartIcon.classList.remove('jumping');
    }, 300);
  } 
  else {
      loginToggle(0);
  }
}

async function goToCart(){
  if(await verifyLogin("./lib/php/login.php?action=isLoggedIn")){
    window.location.href = "./lib/html/cart.html"
  }
  else{
    loginToggle(0);
  }
}

showCards();
