search = document.getElementById("search-input");
cards = document.querySelectorAll(".card");

function searchBar() {
  inputValue = search.value.toLowerCase();
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