async function login(){
    let loginForm = document.getElementById('login-form');
    let loginData = new FormData(loginForm);

    const loginPromisse = await fetch("./lib/php/login.php", {
        method: "POST",
        body: loginData
    });

    let loginValidation = await loginPromisse.text();
    console.log(loginValidation);
}