let userName
let userPass


/* ----- Deleting all cookies when the page is loading ----- */
function deleteAllCookies() {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Account/Logout');
    xhr.send();
}


/* -----  register function starts when clicking register button -----  */
function register() {
    userName = document.getElementById("user-name").value;
    userPass = document.getElementById("user-pass").value;
    if (userName === "" || userPass === "") {
        alert("Please fill out the required fields")
        if (userName === "") {
            document.getElementById("required-username").style.display = "block";
        }
        else {
            document.getElementById("required-username").style.display = "none";
        }
        if (userPass === "") {
            document.getElementById("required-password").style.display = "block";
        }
        else {
            document.getElementById("required-password").style.display = "none";
        }
    }


    function reqListener() {
        console.log(this.responseText);
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener)
    xhr.open('Post', '/Account/Register');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                document.getElementById("register_table").style.display = "none"
                document.getElementById("home_view").style.display = "block"
                document.getElementById("home-title").style.display = "block"
                document.getElementById("home-paragraph").style.display = "block"
                document.getElementById("home-paragraph").innerText = "Register successful! Log in to select your model and customize it."
            } else if (status === 500) {
                // There has been an error with the request!
                console.log('failed register')
                let failedRegister = document.getElementById('failed-register')
                failedRegister.innerText = "Username is already taken."
                failedRegister.style.display = "block"
            }
        }

    }
    var data = new FormData();
    data.append('username', userName);
    data.append('password', userPass);
    xhr.send(data);
    
}
/* -----  register function ends -----  */


/* -----  login function starts when clicking log in button -----  */
function login() {
    userName = document.getElementById("user-name-login").value
    userPass = document.getElementById("user-pass-login").value

    if (userName === "" || userPass === "") {

        alert("Please fill out the required fields")
        if (userName === "") {
            document.getElementById("required-username-login").style.display = "block";
        }
        else {
            document.getElementById("required-username-login").style.display = "none";
        }
        if (userPass === "") {
            document.getElementById("required-password-login").style.display = "block";
        }
        else {
            document.getElementById("required-password-login").style.display = "none";
        }
    }
    else {
        // New POST request to controller
        var xhr = new XMLHttpRequest()
        xhr.open('Post', '/Account/Login')

        xhr.onreadystatechange = function () {
            // In local files, status is 0 upon success in Mozilla Firefox
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status
                if (status === 0 || (status >= 200 && status < 400)) {
                    // The request has been completed successfully
                    console.log(xhr.responseText)                 
                    document.getElementById("login_table").style.display = "none"
                    document.getElementById("login-button").style.display = "none"
                    document.getElementById("registration-button").style.display = "none"
                    document.getElementById("logout-button").style.display = "block"
                    document.getElementById("home_view").style.display = "block"
                    document.getElementById("home-title").style.display = "block"
                    document.getElementById("home-paragraph").style.display = "block"
                    document.getElementById("home-paragraph").innerText = "Hello $userName, select your model and customize it.".replace('$userName', userName)

                    if (xhr.responseText == "admin") {
                       
                    }

                } else if (status === 500) {
                    // There has been an error with the request!
                    console.log('failed login')
                    let failedlogin = document.getElementById('failed-login')
                    failedlogin.innerText = "Invalid. Please try again."
                    failedlogin.style.display = "block"
                }
            }
        };
        // Sending login details to controller 
        var data = new FormData()
        data.append('username', userName)
        data.append('password', userPass)
        xhr.send(data)
    }
}
/* -----  log in function ends -----  */


/* -----  logout function starts when clicking logout button -----  */
function logout() {
    document.getElementById("register_table").style.display = "none"
    document.getElementById("login_table").style.display = "none"
    document.getElementById("home_view").style.display = "block"
    document.getElementById("logout-button").style.display = "none"
    document.getElementById("login-button").style.display = "block"
    document.getElementById("registration-button").style.display = "block"
    document.getElementById("home_view").style.display = "block"
    document.getElementById("home-title").style.display = "block"
    document.getElementById("home-paragraph").style.display = "block"
    document.getElementById("home-paragraph").innerText = "Please select your model and customize it."
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Account/Logout');
    xhr.send();
}
/* -----  log out function ends -----  */


/* -----  showregister function starts, register view on page -----  */
function showRegister() {


    document.getElementById("home_view").style.display = "none"
    document.getElementById("register_table").style.display = "block"
    document.getElementById("login_table").style.display = "none"
    document.getElementById("register-button").style.display = "block"

}
/* -----  showregister function ends -----  */


/* -----  showLogin function starts, login view on page -----  */
function showLogin() {

    document.getElementById("home_view").style.display = "none"
    document.getElementById("register_table").style.display = "none"
    document.getElementById("login_table").style.display = "block"
    document.getElementById("login-button").style.display = "block"
    document.getElementsByTagName("BODY")[0].filter = "blur(8px)"
}
/* -----  showLogin function ends -----  */


/* -----  showHome function starts, home view on page -----  */
function showHome() {

    document.getElementById("home_view").style.display = "block"
    document.getElementById("register_table").style.display = "none"
    document.getElementById("login_table").style.display = "none"

}
/* -----  showHome function ends -----  */





