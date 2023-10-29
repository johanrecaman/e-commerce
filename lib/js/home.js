import { loginToggle } from "./login.js";
const search = document.getElementById("search-input");

function searchBar() {
  inputValue = search.value.toLowerCase();
  cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    let cardName = card.querySelector(".card-name").innerText.toLowerCase();
    if (cardName.startsWith(inputValue)) {
      card.classList.remove("card-hidden");
    } else {
      card.classList.add("card-hidden");
    }
  });
}

async function showCards() {
  const response = await fetch("./lib/php/products.php", {
    method: "POST",
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
        <button class="card-btn">Adicionar ao Carrinho</button>
      </div>`;

    document.querySelector(".main").innerHTML += content;
  });
}

showCards();
