const search = document.getElementById("search-input");
const loginBtn = document.getElementById("login-btn");
const forms = document.querySelectorAll(".form");
const formTitles = document.querySelectorAll(".form-title");
const formBtns = document.querySelectorAll(".form-btn");
const loginPage = document.querySelector(".login-popup");
const overlay = document.querySelector(".overlay");

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


loginBtn.addEventListener('click', ()=>{
  loginPage.classList.add("visible");
  document.getElementById("login-form").classList.remove("invisible");
  document.getElementById("login-title").classList.remove("invisible");

  document.getElementById("signup-form").classList.add("invisible");
  document.getElementById("signup-title").classList.add("invisible");
});

formBtns.forEach((button)=>{
  button.addEventListener('click', ()=>{
    forms.forEach((form)=>{
      form.classList.remove('visible');
      form.classList.add('invisible');
    });
    formTitles.forEach((title)=>{
      title.classList.remove('visible');
      title.classList.add('invisible');
    });

    const buttonDataTarget = button.getAttribute('data-target');
    const buttonDataToggle = button.getAttribute('data-toggle');
    const targetForm = document.querySelector(buttonDataTarget);
    const targetTitle = document.querySelector(buttonDataToggle);

    targetForm.classList.remove('invisible');
    targetTitle.classList.remove('invisible');
  });
});

function formClose() {
  loginPage.classList.remove("visible");
  overlay.classList.remove("visible");
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
        <button class="card-btn">Adicionar ao Carrinho</button>
      </div>`;

    document.querySelector(".main").innerHTML += content;
  });
}

showCards();
