function verifyLogin(){
    let user = JSON.parse(localStorage.getItem('user'));
    const navbar = document.getElementById('navbar');
    if(user?.username)
        navbar.classList.add('logedIn')
    else
        navbar.classList.remove('logedIn')
}

function loginSubmit(e, f){
    e.preventDefault();

    function findUser(user){
        return f.username.value == user.username && f.password.value == user.password;
    }

    let users = JSON.parse(localStorage.getItem('users'));
    let user = users?.find(findUser);
    if(user){
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/'
    }
    else
        alert('Usuario ou senha incorretos')

    verifyLogin();
}

function logout(){
    localStorage.removeItem('user');
    verifyLogin();
    window.location.href = '/'
}

verifyLogin();

function hamburguerMenu() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }