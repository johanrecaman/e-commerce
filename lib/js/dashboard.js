window.searchBar = searchBar;

const dashboardButtons = document.querySelectorAll('.dashboard-btn')
const dashboardPages = document.querySelectorAll('.panel')
const search = document.getElementById("card-search-bar");

function getQuery(name){
  return document.querySelector(name);
}


async function getProductCards(){
  const cardData = await fetch("../php/products.php",{
    method: "POST",
  });

  const data = await cardData.json();

  data.forEach((product, index)=>{

    let cardClass = 'product-card';
    if(index %2 != 0){
      cardClass += ' white-card';
    }
    else{
      cardClass += ' grey-card'
    }
    
    let card = `
    <div class="${cardClass}">
                <div class="product-card-img">
                  <img src="..${product.img_url}" alt="logo" />
                </div>
                <div class="product-card-data">
                  <div class="card-text">
                    <p class="card-name" >${product.name}</p>
                  </div>
                  <div class="card-text">
                    <p>$${product.price}</p>
                  </div>
                  <div class="card-text">
                    <p>$${product.cost}</p>
                  </div>
                </div>
              </div>`;
    getQuery(".product-cards-container").innerHTML += card;
  });
}


function searchBar() {
  const inputValue = search.value.toLowerCase();
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {
    card.classList.remove("white-card", "grey-card");
  });

  let isWhiteCard = false;

  cards.forEach((card) => {
    let cardName = card.querySelector(".card-name").innerText.toLowerCase();
    if (cardName.startsWith(inputValue)) {
      
      if (isWhiteCard) {
        card.classList.add("white-card");
      } else {
        card.classList.add("grey-card");
      }
      
      isWhiteCard = !isWhiteCard;
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}


dashboardButtons.forEach((button)=>{
  button.addEventListener('click',()=>{
    dashboardPages.forEach((page)=>{
      page.classList.remove('active');
      page.classList.add('hidden');
    });
    
    dashboardButtons.forEach((button)=>{
      button.classList.remove('active-btn');
    });
    
    const buttonDataTarget = button.getAttribute('data-target');
    const targetPage = document.querySelector(buttonDataTarget);
    
    targetPage.classList.remove('hidden');
    targetPage.classList.add('active');
    
    button.classList.add('active-btn');
    
  });
});

getProductCards();