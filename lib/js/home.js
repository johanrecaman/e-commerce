search = document.getElementById("search-input");
cards = document.querySelectorAll(".card");

search.addEventListener("input", () => {
  inputValue = search.value.toLowerCase();
  cards.forEach((card) => {
    let cardName = card.querySelector(".card-name").innerText.toLowerCase();
    if (cardName.startsWith(inputValue)) {
      card.classList.remove("card-hidden");
    } else {
      card.classList.add("card-hidden");
    }
  });
});
