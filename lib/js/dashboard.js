function getQuery(name){
  return document.querySelector(name);
}

getQuery("#card-dashboard-btn").addEventListener("click", () => {
  //makes the card dashboard visible
  getQuery(".card-dashboard").classList.remove("hidden");
  getQuery(".card-dashboard").classList.add("active");
  //makes the card dashboard button active
  getQuery("#card-dashboard-btn").classList.add("active-btn");
   
  //makes the purchase dashboard hidden
  getQuery(".purchase-dashboard").classList.remove("active");
  getQuery(".purchase-dashboard").classList.add("hidden");
  //makes the purchase dashboard button inactive
  getQuery("#purchase-dashboard-btn").classList.remove("active-btn");

  //makes the adm dashboard hidden
  getQuery(".adm-dashboard").classList.remove("active");
  getQuery(".adm-dashboard").classList.add("hidden");
  //makes the adm dashboard button inactive
  getQuery("#adm-dashboard-btn").classList.remove("active-btn");
});

document.getElementById("purchase-dashboard-btn").addEventListener("click", () => {
    //makes the card dashboard hidden
    getQuery(".card-dashboard").classList.remove("active");
    getQuery(".card-dashboard").classList.add("hidden");
    //makes the card dashboard button inactive
    getQuery("#card-dashboard-btn").classList.remove("active-btn");
    
    //makes the purchase dashboard visible
    getQuery(".purchase-dashboard").classList.remove("hidden");
    getQuery(".purchase-dashboard").classList.add("active");
    //makes the purchase dashboard button active
    getQuery("#purchase-dashboard-btn").classList.add("active-btn");
    
    //makes the adm dashboard hidden
    getQuery(".adm-dashboard").classList.remove("active");
    getQuery(".adm-dashboard").classList.add("hidden");
    //makes the adm dashboard button inactive-
    getQuery("#adm-dashboard-btn").classList.remove("active-btn");
});

document.getElementById("adm-dashboard-btn").addEventListener("click", () => {
    //makes the card dashboard hidden
    getQuery(".card-dashboard").classList.remove("active");
    getQuery(".card-dashboard").classList.add("hidden");
    //makes the card dashboard button inactive
    getQuery("#card-dashboard-btn").classList.remove("active-btn");
    
    //makes the purchase dashboard hidden
    getQuery(".purchase-dashboard").classList.remove("active");
    getQuery(".purchase-dashboard").classList.add("hidden");
    //makes the purchase dashboard button inactive
    getQuery("#purchase-dashboard-btn").classList.remove("active-btn");
    
    //makes the adm dashboard visible
    getQuery(".adm-dashboard").classList.remove("hidden");
    getQuery(".adm-dashboard").classList.add("active");
    //makes the adm dashboard button active
    getQuery("#adm-dashboard-btn").classList.add("active-btn");
});