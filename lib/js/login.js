function formTypeToggle(){
  const formBtns = document.querySelectorAll(".form-btn");
  const forms = document.querySelectorAll(".form");
  const formTitles = document.querySelectorAll(".form-title");
  
  formBtns.forEach((button)=>{

    button.addEventListener('click', ()=>{
      formBtns.forEach((btn) => {
        btn.classList.remove("form-btn-border");
      });
      button.classList.add("form-btn-border");
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
}

async function signupSubmit(event){
  event.preventDefault();
  const forms = document.querySelectorAll(".signup-form");
  let isEmpty = false;

  forms.forEach((form) => {
    const input = form.querySelector('input');
    const errorText = form.querySelector('div.empty-text');

    if (input.value == "") {
      input.classList.add("empty-input");
      switch (input.name) {
        case "name":
          errorText.innerHTML = "É necessário informar um nome.";
          break;
        case "email":
          errorText.innerHTML = "É necessário informar um email.";
          break;
        case "password":
          errorText.innerHTML = "É necessário informar uma senha.";
          break;
      }
      isEmpty = true;
    }
    else{
      input.classList.remove("empty-input")
      errorText.innerHTML = ""
    }
});

  if(!isEmpty){
    let signupForm = document.getElementById('signup-form');
    let signupData = new FormData(signupForm);
  
    const signupPromise = await fetch("./lib/php/login.php?action=signup",{
      method: "POST",
      body: signupData
    });
  
    let response = await signupPromise.json();
    if(response == "success"){
      let form = document.getElementById("signup-form");
      form.innerHTML = `
      <div>
        <div id="signup-complete-img-container">
          <img src="./lib/img/other-img/check.svg" alt="" id="signup-complete-img">
        </div>
        <div id="signup-complete-text-container">
          <h1 class="signup-complete-text">Cadastro Completo!</h1>
          <p class="signup-complete-text">Volte para completar o login</p>
        </div>
      </div>`
    }
    else{
      console.log("teste");
    }
  }
}

async function loginSubmit(event) {
  event.preventDefault();
  const forms = document.querySelectorAll(".login-form")
  let isEmpty = false;
  forms.forEach((form)=>{
    const input = form.querySelector('input');
    const errorText = form.querySelector('div.login-empty-text');

    if (input.value == "") {
      input.classList.add("empty-input");
      switch (input.name) {
        case "email":
          errorText.innerHTML = "É necessário informar um email.";
          break;
        case "password":
          errorText.innerHTML = "É necessário informar uma senha.";
          break;
      }
      isEmpty = true;
    }
    else{
      input.classList.remove("empty-input")
      errorText.innerHTML = ""
    }
  })

  if(!isEmpty){
    let loginForm = document.getElementById('login-form');
    let loginData = new FormData(loginForm);
    
    const loginPromise = await fetch("./lib/php/login.php?action=login", {
        method: "POST",
        body: loginData
    });
  
    let loginResponse = await loginPromise.json();
    if(loginResponse == "adm"){
        window.location.href = "./lib/html/dashboard.html";
    }
    else if(loginResponse == "user"){
        window.location.reload();
    }
    else{
        
    }
  }
}

export async function verifyLogin(path){
  const loginStatus = await fetch(path, {
    method: "GET",
  })

  let user_type = await loginStatus.json();
    if(user_type == "adm"){
      window.location.href = "./lib/html/dashboard.html";
    }
    else if(user_type == "user"){
      document.querySelector(".logout-container").classList.add("dropdown-content");
      return true
    }
    else if(user_type == "none"){
      document.querySelector(".logout-container").classList.remove("dropdown-content");
      return false
    }
    
}

export async function whichUser(){
  const userResponse = await fetch('./lib/php/login.php?action=whichUser',{
    method:"GET",
  })

  let userId = await userResponse.json();
  return userId;
}

async function logout(path, pagePath){
  const logoutData = await fetch(path,{
    method: "POST",
  })
  
  window.location.replace(pagePath);
}

export async function loginToggle(action){
  const overlay = document.querySelector(".overlay");

  let form = `
  <div class="login-popup visible">
    <button id="form-close" onclick="loginToggle(1)"></button>
    <div class="form-text">
      <h1 class="form-title" id="signup-title" >Create Your Account</h1>
      <h1 class="form-title" id="login-title">Welcome Back</h1>
    </div>
    <div class="form-header">
      <button data-target="#login-form" data-toggle="#login-title" class="form-btn form-btn-border">Log In</button>
      <button data-target="#signup-form" data-toggle="#signup-title" class="form-btn">Sign Up</button>
    </div>
    <form id="signup-form" class="form" method="POST">
      <div id="signup-form" >
        <label for="signup-name">Name</label>
        <input type="text" name="name" class="form-input" id="signup-name" placeholder="Your name"/>
        <div class = "empty-text"></div>
      </div>
      <div class="signup-form">
        <label for="signup-email">E-mail</label>
        <input type="email" name="email" class="form-input" id="signup-email" placeholder="Your email"/>
        <div class = "empty-text"></div>
      </div>
      <div class="signup-form">
        <label for="signup-password">Password</label>
        <input type="password" name="password" class="form-input" id="signup-password" placeholder="Your password"/>
        <div class = "empty-text"></div>
      </div>
      <button type="submit" id="signup-submit" onclick="signupSubmit(event)" >sign up</button>
    </form>
    <form id="login-form" class="form" method="POST">
      <div class="login-form">
        <label for="login-email">E-mail</label>
        <input type="email" name="email" class="form-input" id="login-email" placeholder="Your email"/>
        <div class = "login-empty-text"></div>
      </div>
      <div class="login-form">
        <label for="login-password">Password</label>
        <input type="password" name="password" class="form-input" id="login-password" placeholder="Your password"/>
        <div class = "login-empty-text"></div>
      </div>
      <button type="submit" id="login-submit" onclick="loginSubmit(event)" >login</button>
    </form>
  </div>`
              
  if(action == 0){
    if(await verifyLogin("./lib/php/login.php?action=isLoggedIn")){
    }
    else{
      document.querySelector(".login-container").innerHTML += form;
      overlay.classList.add("visible");
      
      document.getElementById("login-form").classList.remove("invisible");
      document.getElementById("login-title").classList.remove("invisible");
      
      document.getElementById("signup-form").classList.add("invisible");
      document.getElementById("signup-title").classList.add("invisible");
  
      formTypeToggle();
    }
  }
  else{
    document.querySelector(".login-container").innerHTML = "";
    overlay.classList.remove("visible");
  }
}

window.loginToggle = loginToggle;
window.loginSubmit = loginSubmit;
window.signupSubmit = signupSubmit;
window.verifyLogin = verifyLogin;
window.logout = logout;