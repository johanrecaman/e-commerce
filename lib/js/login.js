function formTypeToggle(){
  const formBtns = document.querySelectorAll(".form-btn");
  const signupInput = document.getElementById("signup-input");
  
  formBtns.forEach((button)=>{
    document.getElementById("signup-submit").classList.add("invisible");

    button.addEventListener('click', ()=>{
      document.getElementById("signup-msg-container").innerHTML = "";
      document.querySelector(".form-container").classList.remove("invisible");
      
      signupInput.classList.remove('visible');
      signupInput.classList.add('invisible');
      
      document.querySelectorAll('.form-input').forEach((input)=>{
        input.classList.remove("empty-input");
      });
      document.querySelectorAll('.empty-text').forEach((text)=>{
        text.innerHTML = "";
      })

      formBtns.forEach((btn) => {
        btn.classList.remove("form-btn-border");
      });
      
      document.querySelectorAll(".form-title").forEach((title)=>{
        title.classList.remove('visible');
        title.classList.add('invisible');
      });
      
      document.querySelectorAll(".submit-btn").forEach((btn)=>{
        btn.classList.add('invisible');
      });

      button.classList.add("form-btn-border");
      
      const targetForm = document.querySelector(button.getAttribute('form-target'));
      const targetTitle = document.querySelector(button.getAttribute('title-target'));
      const targetBtn = document.querySelector(button.getAttribute("btn-target"));
      
      targetForm.classList.remove('invisible');
      targetTitle.classList.remove('invisible');
      targetBtn.classList.remove('invisible');
    });
  });
}

async function signupSubmit(event){
  event.preventDefault();
  const form = document.querySelectorAll(".form");
  let isEmpty = false;

  form.forEach((form) => {
    const errorText = form.querySelector('div.empty-text');
    const input = form.querySelector('input')

    errorText.innerHTML = "";
    input.classList.remove("empty-input");

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
    let signupForm = document.querySelector('.form-container');
    let signupData = new FormData(signupForm);
  
    const signupPromise = await fetch("./lib/php/login.php?action=signup",{
      method: "POST",
      body: signupData
    });
  
    let response = await signupPromise.json();
    if(response == "success"){
      document.querySelector(".form-container").classList.add("invisible");

      let container = document.getElementById("signup-msg-container");
      container.innerHTML = `
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
     document.getElementById('signup-email').classList.add('empty-input');
     document.querySelector(".wrong-email").innerHTML = "Já existe uma conta associada a este email.";
    }
  }
}

async function loginSubmit(event) {
  event.preventDefault();
  const forms = document.querySelectorAll(".login-input")
  let isEmpty = false;
  forms.forEach((form)=>{
    const input = form.querySelector('input');
    const errorText = form.querySelector('div.empty-text');

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
      isEmpty = false;
    }
  })

  if(!isEmpty){
    let loginForm = document.querySelector('.form-container');
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
    document.querySelector(".wrong-email").innerHTML = "";
    document.querySelector(".wrong-password").innerHTML = "";
    document.querySelector("#signup-email").classList.remove("empty-input");
    document.querySelector("#signup-password").classList.remove('empty-input');
    console.log(loginResponse);
        if(loginResponse == "senha_invalida"){
          document.querySelector(".wrong-password").innerHTML = "Senha inválida."
          document.querySelector("#signup-password").classList.add('empty-input');
        }
        else if(loginResponse == "email_invalido"){
          document.querySelector(".wrong-email").innerHTML = "Email inválido."
          document.querySelector("#signup-email").classList.add("empty-input")
        }
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

export async function whichUser(path){
  const userResponse = await fetch(path,{
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
    <button id="form-close" onclick="loginToggle(1)">
      <img class="login-exit-img" src= "./lib/img/other-img/exit.svg">
    </button>
    <div class="form-text">
      <h1 class="form-title" id="signup-title" >Create Your Account</h1>
      <h1 class="form-title" id="login-title">Welcome Back</h1>
    </div>
    <div class="form-header">
      <button form-target=".login-input" title-target="#login-title" btn-target="#login-submit" class="form-btn form-btn-border">Log In</button>
      <button form-target="#signup-input" title-target="#signup-title" btn-target="#signup-submit" class="form-btn">Sign Up</button>
    </div>
    <form class="form-container">
      <div class="input-container">
        <div id="signup-input" class="form">
          <label for="signup-name">Name</label>
          <input type="text" name="name" class="form-input" id="signup-name" placeholder="Your name"/>
          <div class="empty-text"></div>
        </div>
        <div class="login-input form">
          <label for="signup-email">E-mail</label>
          <input type="email" name="email" class="form-input" id="signup-email" placeholder="Your email"/>
          <div class="empty-text wrong-email"></div>
        </div>
        <div class="login-input" form> 
          <label for="signup-password">Password</label>
          <input type="password" name="password" class="form-input" id="signup-password" placeholder="Your password"/>
          <div class="empty-text wrong-password"></div>
        </div>
      </div>
      <div class="btn-container">
        <button class="submit-btn" type="submit" id="signup-submit" onclick="signupSubmit(event)" >Sign Up</button>
        <button class="submit-btn" type="submit" id="login-submit" onclick="loginSubmit(event)" >login</button>
      </div>
    </form>
    <div id="signup-msg-container"></div>
  </div>`
              
  if(action == 0){
    if(await verifyLogin("./lib/php/login.php?action=isLoggedIn")){
    }
    else{
      document.querySelector(".login-container").innerHTML = form;
      overlay.classList.add("visible");
      
      document.getElementById("signup-input").classList.add("invisible")
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