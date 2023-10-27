const formBtns = document.querySelectorAll(".form-btn");
const forms = document.querySelectorAll(".form");
const formTitles = document.querySelectorAll(".form-title");
const loginBtn = document.getElementById("login-btn");
const overlay = document.querySelector(".overlay");
const loginPage = document.querySelector(".login-popup");

function formClose() {
    loginPage.classList.remove("visible");
    overlay.classList.remove("visible");
}

document.getElementById("login-submit").addEventListener('click', async (event)=>{
  event.preventDefault();
  let loginForm = document.getElementById('login-form');
  let loginData = new FormData(loginForm);
  
  const loginPromise = await fetch("./lib/php/login.php", {
      method: "POST",
      body: loginData
  });

  let loginResponse = await loginPromise.json();
  if(loginResponse == "adm"){
    window.location.href = "./lib/html/dashboard.html"
  }
  else if(loginResponse == "user"){
    window.location.reload();
  }
  else{
    
  }
  
})

loginBtn.addEventListener('click', ()=>{
    loginPage.classList.add("visible");
    overlay.classList.add("visible")
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