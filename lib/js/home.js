search = document.getElementById("search-input");

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

function formShow(index) {
  loginPage = document.querySelector(".login-popup");

  loginForm = document.querySelector("#login-form");
  signupForm = document.querySelector("#signup-form");

  loginTitle = document.querySelector("#login-title");
  signupTitle = document.querySelector("#signup-title");

  overlay = document.querySelector(".overlay");
  overlay.classList.add("visible");

  if (index == 1) {
    loginPage.classList.add("visible");

    loginForm.classList.add("invisible");
    loginTitle.classList.add("invisible");

    signupForm.classList.remove("invisible");
    signupTitle.classList.remove("invisible");
  } else if (index == 2) {
    signupForm.classList.add("invisible");
    signupTitle.classList.add("invisible");

    loginForm.classList.remove("invisible");
    loginTitle.classList.remove("invisible");
  } else {
    loginPage.classList.remove("visible");
    overlay.classList.remove("visible");
  }
}

async function showCards() {
  const response = await fetch("./lib/php/home.php", {
    method: "GET",
  });

  const data = await response.json();

  data.forEach((product) => {
    let content = `
    <div class="card">
        <div class="card-img">
          <img src="${product.img_url}" alt="example" />
        </div>
        <p class="card-name">${product.name}</p>
        <p class="card-price">$${product.price}</p>
        <button class="card-btn">Adicionar ao Carrinho</button>
      </div>`;

    document.querySelector(".main").innerHTML += content;
  });
}

showCards();
