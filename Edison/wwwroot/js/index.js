// User details
let userName;
let userPass;

// Car details
let carModel;
let carColor;
let wheel;


/* ----- Deleting all cookies when the page is loading ----- */
function getLoggedInUser() {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Authentication/CheckForCookie');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                if (xhr.responseText != "") {
                    if (xhr.responseText === "Admin") {
                        document.getElementById("adminlog-button").style.display = "block"
                    }
                    document.getElementById("login-button").style.display = "none"
                    document.getElementById("registration-button").style.display = "none"
                    document.getElementById("logout-button").style.display = "block"
                    document.getElementById("home-paragraph").style.display = "block"
                    document.getElementById("mymodel-button").style.display = "block"
                    userName = xhr.responseText
                    document.getElementById("home-paragraph").innerText = "Hello $userName, select your model and customize it.".replace('$userName', userName)
                }
            } else if (status === 500) {
                // There has been an error with the request!            
            }
        }
    }
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
                failedRegister.innerText = "Faileg to register."
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
                    console.log("username: " + xhr.responseText)                 
                    document.getElementById("login_table").style.display = "none"
                    document.getElementById("login-button").style.display = "none"
                    document.getElementById("registration-button").style.display = "none"
                    document.getElementById("logout-button").style.display = "block"
                    document.getElementById("home_view").style.display = "block"
                    document.getElementById("mymodel-button").style.display = "block"
                    document.getElementById("home-title").style.display = "block"
                    document.getElementById("model-3").style.display = "block"
                    document.getElementById("model-x").style.display = "block"
                    document.getElementById("model-s").style.display = "block"
                    document.getElementById("home-paragraph").style.display = "block"
                    document.getElementById("home-paragraph").innerText = "Hello $userName, select your model and customize it.".replace('$userName', userName)

                    if (xhr.responseText == "admin") {
                        console.log("user is admin")
                        document.getElementById("adminlog-button").style.display = "block"
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
    document.getElementById("adminlog-button").style.display = "none"
    document.getElementById("mymodel-button").style.display = "none"
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
    document.getElementById("model-3").style.display = "none"
    document.getElementById("model-x").style.display = "none"
    document.getElementById("model-s").style.display = "none"

}
/* -----  showregister function ends -----  */


/* -----  showLogin function starts, login view on page -----  */
function showLogin() {

    document.getElementById("home_view").style.display = "none"
    document.getElementById("register_table").style.display = "none"
    document.getElementById("login_table").style.display = "block"
    document.getElementById("login-button").style.display = "block"
    document.getElementById("model-3").style.display = "none"
    document.getElementById("model-x").style.display = "none"
    document.getElementById("model-s").style.display = "none"
}
/* -----  showLogin function ends -----  */


/* -----  showHome function starts, home view on page -----  */
function showHome() {
    //set home view
    document.getElementById("home_view").style.display = "block"
    //set home view

    //set car buttons
    document.getElementById("model-3").style.display = "block"
    document.getElementById("model-x").style.display = "block"
    document.getElementById("model-s").style.display = "block"
    //set car buttons

    /*******************************************************/

    // disable register view
    document.getElementById("register_table").style.display = "none"
    // disable register view

    // disable login view
    document.getElementById("login_table").style.display = "none"
    // disable login view

    // disable mymodel view
    document.getElementById("mymodel_table").style.display = "none"
    document.getElementById("delete-confirm").innerText = ""
    // disable mymodel view

    // disable model s view
    document.getElementById("model_s_page").style.display = "none"
    document.getElementById("model-s-homebutton").style.display = "none"
    document.getElementById("left-border").style.display = "none"
    document.getElementById("model-s-color-white").style.display = "none"
    document.getElementById("model-s-color-black").style.display = "none"
    document.getElementById("model-s-color-black").style.display = "none"
    document.getElementById("autopilot-model-s-colorp").style.display = "none"
    document.getElementById("model-s-car-pic").style.display = "none"
    document.getElementById("right-border").style.display = "none"
    document.getElementById("autopilot-model-s").style.display = "none"
    document.getElementById("model-s-car-autopilot-preview").style.display = "none"
    // disable model s view


    // disable model x view
    document.getElementById("model_x_page").style.display = "none"
    document.getElementById("model-x-homebutton").style.display = "none"
    document.getElementById("left-border-x").style.display = "none"
    document.getElementById("model-x-color-white").style.display = "none"
    document.getElementById("model-x-color-black").style.display = "none"
    document.getElementById("model-x-color-red").style.display = "none"
    document.getElementById("autopilot-model-x-colorp").style.display = "none"
    document.getElementById("model-x-car-pic").style.display = "none"
    document.getElementById("model-x-car-pic").src = "/media/Tesla/Model S/model_x_white.png";
    document.getElementById("right-border-x").style.display = "none"
    document.getElementById("autopilot-model-x").style.display = "none"
    document.getElementById("model-x-car-autopilot-preview").style.display = "none"
    document.getElementById("model-x-wheel1").style.display = "none"
    document.getElementById("model-x-wheel2").style.display = "none"
    // disable model x view


    // disable model 3 view
    document.getElementById("model_3_page").style.display = "none"
    document.getElementById("model-3-homebutton").style.display = "none"
    document.getElementById("left-border-3").style.display = "none"
    document.getElementById("model-3-color-white").style.display = "none"
    document.getElementById("model-3-color-black").style.display = "none"
    document.getElementById("model-3-color-red").style.display = "none"
    document.getElementById("autopilot-model-3-colorp").style.display = "none"
    document.getElementById("model-3-car-pic").style.display = "none"
    document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_white.png";
    document.getElementById("right-border-3").style.display = "none"
    document.getElementById("autopilot-model-3").style.display = "none"
    document.getElementById("model-3-car-autopilot-preview").style.display = "none"
    document.getElementById("model-3-wheel1").style.display = "none"
    document.getElementById("model-3-wheel2").style.display = "none"
    // disable model 3 view


    // disable Admin view
    let confirmation = document.getElementById("confirmation")
    confirmation.innerText = ""
    document.getElementById("admin_table").style.display = "none"
    document.getElementById("renderList").style.display = "none"
    // disable Admin view
}
/* -----  showHome function ends -----  */


/* -----  showAdminLog view starts -----  */
function showAdminLog() {
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/Admin/ShowUserActivities')
    xhr.send()

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                document.getElementById("home_view").style.display = "none"
                document.getElementById("register_table").style.display = "none"
                document.getElementById("login_table").style.display = "none"
                document.getElementById("login-button").style.display = "none"
                document.getElementById("register-button").style.display = "none"
                document.getElementById("admin_table").style.display = "block"
                document.getElementById("renderList").style.display = "block"
                document.getElementById("model-3").style.display = "none"
                document.getElementById("model-x").style.display = "none"
                document.getElementById("model-s").style.display = "none"

                console.log(xhr.responseText)
                let JSONOfActivities = JSON.parse(xhr.responseText);

                let listOfActivities = [];
                for (var i = 0; i < JSONOfActivities.length; i++) {
                    let activity = "(" + JSONOfActivities[i].userID + ") " + JSONOfActivities[i].activity
                    listOfActivities.push(activity)
                }
                listOfActivities.reverse();
                listRendererActivities(listOfActivities);
            }
        }
    };
}

function listRendererActivities(list) {
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'actList');
    document.getElementById('renderList').appendChild(ul);
    list.forEach(renderScheduleList);

    function renderScheduleList(element, index, arr) {
        let li = document.createElement('li');
        li.setAttribute('id', 'activity-item');
        ul.appendChild(li);

        li.innerHTML = li.innerHTML + element;
    }
}

function deleteUser() {
    let confirmation = document.getElementById("confirmation")
    let user = document.getElementById("banned-user").value
    console.log(user)
    // New GET request to controller
    var xhr = new XMLHttpRequest()
    xhr.open('Post', '/Account/DeleteUser')
    // Sending login details to controller 
    if (user === userName) {
        confirmation.innerText = "You can not delete yourself lol"
    }
    var data = new FormData()
    data.append('user', user)
    xhr.send(data)

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfull!
                if (xhr.responseText === "Deleted") {         
                    confirmation.innerText = "User deleted successfully."
                } else {
                    confirmation.innerText = "Wrong username."
                }
            } else if (status === 500) {
                // There has been an error with the request!
            }
        }
    };
}

/* -----  showAdminLog view ends -----  */


/* -----  Mymodel view starts -----  */
function showUserModels() {
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/CarModel/GetUserModels')
    xhr.send()

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                document.getElementById("home_view").style.display = "none"
                document.getElementById("register_table").style.display = "none"
                document.getElementById("login_table").style.display = "none"
                document.getElementById("login-button").style.display = "none"
                document.getElementById("register-button").style.display = "none"
                document.getElementById("model-3").style.display = "none"
                document.getElementById("model-x").style.display = "none"
                document.getElementById("model-s").style.display = "none"

                document.getElementById("mymodel_table").style.display = "block"
                document.getElementById("model-list").style.display = "block"
                document.getElementById("model-update-view").style.display = "none"
               

      

                console.log(xhr.responseText)


                let JSONModels = JSON.parse(xhr.responseText);
               
                let ulEl = document.getElementById("model-list");
                let select = document.getElementById("model-select");

                //refreshing select
                select.options.length = 0;
                //refreshing ul
                ulEl.innerHTML = '';

                for (var i = 0; i < JSONModels.length; i++) {
                    let liEL = document.createElement("li")
                    let option = document.createElement("option")

                    liEL.setAttribute("id", "modelitem")
                    option.setAttribute("id", "modeloption")

                    option.innerText = "Model ID:" + JSONModels[i].carID

                    liEL.innerText =
                        "Model ID: " + JSONModels[i].carID +
                        "   ||   Model Type: " + JSONModels[i].modelType +
                        "   ||   Model Color: " + JSONModels[i].modelColor +
                        "   ||   Model Wheel Type: " + JSONModels[i].modelWheel +
                        "   ||   Order Status: " + JSONModels[i].isPayed
                    ulEl.appendChild(liEL)
                    select.appendChild(option)
                }
            }
        }
    };
}


function requestedDelete() {
    let confirmation = document.getElementById("delete-confirm")
    let selectValue = document.getElementById("model-select").value

    // New POST request to controller
    var xhr = new XMLHttpRequest()
    console.log(selectValue)
    xhr.open('Post', '/CarModel/DeleteCarForUser')
    // Sending login details to controller 
    var data = new FormData()
    data.append('car_id', selectValue)
    xhr.send(data)

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfull!
                if (xhr.responseText === "paid") {
                    confirmation.innerText = "Successfully deleted a paid car, please visit us in the nearest Tesla center with your vehicle and paperwork."
                    confirmation.style.color = "green"
                } else if (xhr.responseText === "unpaid") {
                    confirmation.innerText = "Successfully deleted an unpaid car."
                    confirmation.style.color = "green"
                }

                //refreshing select after delete
                document.getElementById("model-select").options.length = 0;

                //refreshing ul after delete
                let ulEl = document.getElementById("model-list");
                ulEl.innerHTML = '';

                //regenerate data without refreshing the page
                showUserModels()
            } else if (status === 500) {
                // There has been an error with the request!
                confirmation.innerText = "Something went wrong, please try again."
            }
        }
    };
}


function requestedUpdate() {

    document.getElementById("model-update-view").style.display = "block"

    let confirmation = document.getElementById("delete-confirm")
    confirmation.innerText = ""
    let selectValue = document.getElementById("model-select").value

    let selectValueModel = document.getElementById("update-model-type").value
    let selectValueColor = document.getElementById("update-model-color").value
    let selectValueWheel = document.getElementById("update-model-wheel").value

    let carModelPic = document.getElementById("update-car-pic")
    let carModelColorPic = document.getElementById("update-color-pic")
    let carWheelPic = document.getElementById("update-wheel-pic")
    // New POST request to controller
    var xhr = new XMLHttpRequest()
    console.log(selectValue)
    xhr.open('Post', '/CarModel/GetCarForUser')
    // Sending login details to controller 
    var data = new FormData()
    data.append('car_id', selectValue)
    xhr.send(data)

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfull!
                console.log(xhr.responseText)

                let JSONOfCarmodel = JSON.parse(xhr.responseText);

                selectElement('update-model-type', JSONOfCarmodel.modelType)
                selectElement('update-model-color', JSONOfCarmodel.modelColor)
                selectElement('update-model-wheel', JSONOfCarmodel.modelWheel)

                function selectElement(id, valueToSelect) {
                    let element = document.getElementById(id);
                    element.value = valueToSelect;
                }

           

                if (JSONOfCarmodel.modelType === "Model S") {
                    if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "White") {
                        carModelPic.src = '/media/Tesla/Model S/model_s_white.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Black") {
                        carModelPic.src = '/media/Tesla/Model S/model_s_black.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Red") {
                        carModelPic.src = '/media/Tesla/Model S/model_s_red.png'
                        carModelColorPic.src = '/media/Tesla/red_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "White") {
                        carModelPic.src = '/media/Tesla/Model S/model_s_white_2.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Black") {
                        carModelPic.src = '/media/Tesla/Model S/model_s_black_2.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Red") {
                        carModelPic.src = '/media/Tesla/Model S/model_s_red_2.png'
                        carModelColorPic.src = '/media/Tesla/red_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel2.png'
                    }
                } else if (JSONOfCarmodel.modelType === "Model X") {
                    if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "White") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_white.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Black") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_black.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Red") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_red.png'
                        carModelColorPic.src = "url('/media/Tesla/red_color.jpg')"
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "White") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_white_2.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Black") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_black_2.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Red") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_red_2.png'
                        carModelColorPic.src = '/media/Tesla/red_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel2.png'
                    }
                } else if (JSONOfCarmodel.modelType === "Model 3") {
                    if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "White") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_white.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Black") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_black.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Red") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_red.png'
                        carModelColorPic.src = '/media/Tesla/red_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "White") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_white_2.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Black") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_black_2.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Red") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_red_2.png'
                        carModelColorPic.src = '/media/Tesla/red_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel2.png'
                    }
                }
            } else if (status === 500) {
                // There has been an error with the request!
                confirmation.innerText = "Something went wrong, please try again."
                confirmation.style.color = "red"
            }
        }
    };
}

function confirmUpdate() {
    let confirmation = document.getElementById("delete-confirm")

    let selectValue = document.getElementById("model-select").value

    let selectValueModel = document.getElementById("update-model-type").value
    let selectValueColor = document.getElementById("update-model-color").value
    let selectValueWheel = document.getElementById("update-model-wheel").value

    // New POST request to controller
    var xhr = new XMLHttpRequest()
    console.log(selectValue)
    xhr.open('Post', '/CarModel/UpdateCarForUser')
    // Sending login details to controller 
    var data = new FormData()
    data.append('car_id', selectValue)
    data.append('car_model', selectValueModel)
    data.append('car_color', selectValueColor)
    data.append('car_wheel', selectValueWheel)
    xhr.send(data)

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfull!
                confirmation.innerText = "Successfully updated your car, please visit us in the nearest Tesla center with your vehicle and paperwork."
                confirmation.style.color = "green"


                //refreshing select after delete
                document.getElementById("model-select").options.length = 0;

                //refreshing ul after delete
                let ulEl = document.getElementById("model-list");
                ulEl.innerHTML = '';

                //regenerate data without refreshing the page
                showUserModels()
            } else if (status === 500) {
                // There has been an error with the request!
                confirmation.innerText = "Something went wrong, please try again."
                confirmation.style.color = "red"
            }
        }
    };

}

let selectValueModel = document.getElementById("update-model-type")
let selectValueColor = document.getElementById("update-model-color")
let selectValueWheel = document.getElementById("update-model-wheel")

function changeSrc() {

    let selectValueModelValue = document.getElementById("update-model-type").value
    let selectValueColorValue = document.getElementById("update-model-color").value
    let selectValueWheelValue = document.getElementById("update-model-wheel").value

    let model = document.getElementById("update-car-pic")
    let color = document.getElementById("update-color-pic")
    let wheel = document.getElementById("update-wheel-pic")

    //here comes the if train :(
    if (selectValueModelValue === "Model S") {
        if (selectValueWheelValue === "Wheel 1" && selectValueColorValue === "White") {
            model.src = '/media/Tesla/Model S/model_s_white.png'
            color.src = '/media/Tesla/white_color.jpg'
            wheel.src = '/media/Tesla/Model S/model_s_wheel1.png'
        } else if (selectValueWheelValue === "Wheel 1" && selectValueColorValue === "Black") {
            model.src = '/media/Tesla/Model S/model_s_black.png'
            color.src = '/media/Tesla/black_color.jpg'
            wheel.src = '/media/Tesla/Model S/model_s_wheel1.png'
        } else if (selectValueWheelValue === "Wheel 1" && selectValueColorValue === "Red") {
            model.src = '/media/Tesla/Model S/model_s_red.png'
            color.src = '/media/Tesla/red_color.jpg'
            wheel.src = '/media/Tesla/Model S/model_s_wheel1.png'
        } else if (selectValueWheelValue === "Wheel 2" && selectValueColorValue === "White") {
            model.src = '/media/Tesla/Model S/model_s_white_2.png'
            color.src = '/media/Tesla/white_color.jpg'
            wheel.src = '/media/Tesla/Model S/model_s_wheel2.png'
        } else if (selectValueWheelValue === "Wheel 2" && selectValueColorValue === "Black") {
            model.src = '/media/Tesla/Model S/model_s_black_2.png'
            color.src = '/media/Tesla/black_color.jpg'
            wheel.src = '/media/Tesla/Model S/model_s_wheel2.png'
        } else if (selectValueWheelValue === "Wheel 2" && selectValueColorValue === "Red") {
            model.src = '/media/Tesla/Model S/model_s_red_2.png'
            color.src = '/media/Tesla/red_color.jpg'
            wheel.src = '/media/Tesla/Model S/model_s_wheel2.png'
        }
    } else if (selectValueModelValue === "Model X") {
        if (selectValueWheelValue === "Wheel 1" && selectValueColorValue === "White") {
            model.src = '/media/Tesla/Model X/model_x_white.png'
            color.src = '/media/Tesla/white_color.jpg'
            wheel.src = '/media/Tesla/Model X/model_x_wheel1.png'
        } else if (selectValueWheelValue === "Wheel 1" && selectValueColorValue === "Black") {
            model.src = '/media/Tesla/Model X/model_x_black.png'
            color.src = '/media/Tesla/black_color.jpg'
            wheel.src = '/media/Tesla/Model X/model_x_wheel1.png'
        } else if (selectValueWheelValue === "Wheel 1" && selectValueColorValue === "Red") {
            model.src = '/media/Tesla/Model X/model_x_red.png'
            color.src = '/media/Tesla/red_color.jpg'
            wheel.src = '/media/Tesla/Model X/model_x_wheel1.png'
        } else if (selectValueWheelValue === "Wheel 2" && selectValueColorValue === "White") {
            model.src = '/media/Tesla/Model X/model_x_white_2.png'
            color.src = '/media/Tesla/white_color.jpg'
            wheel.src = '/media/Tesla/Model X/model_x_wheel2.png'
        } else if (selectValueWheelValue === "Wheel 2" && selectValueColorValue === "Black") {
            model.src = '/media/Tesla/Model X/model_x_black_2.png'
            color.src = '/media/Tesla/black_color.jpg'
            wheel.src = '/media/Tesla/Model X/model_x_wheel2.png'
        } else if (selectValueWheelValue === "Wheel 2" && selectValueColorValue === "Red") {
            model.src = '/media/Tesla/Model X/model_x_red_2.png'
            color.src = '/media/Tesla/red_color.jpg'
            wheel.src = '/media/Tesla/Model X/model_x_wheel2.png'
        }
    } else if (selectValueModelValue === "Model 3") {
        if (selectValueWheelValue === "Wheel 1" && selectValueColorValue === "White") {
            model.src = '/media/Tesla/Model 3/model_3_white.png'
            color.src = '/media/Tesla/white_color.jpg'
            wheel.src = '/media/Tesla/Model 3/model_3_wheel1.png'
        } else if (selectValueWheelValue === "Wheel 1" && selectValueColorValue === "Black") {
            model.src = '/media/Tesla/Model 3/model_3_black.png'
            color.src = '/media/Tesla/black_color.jpg'
            wheel.src = '/media/Tesla/Model 3/model_3_wheel1.png'
        } else if (selectValueWheelValue === "Wheel 1" && selectValueColorValue === "Red") {
            model.src = '/media/Tesla/Model 3/model_3_red.png'
            color.src = '/media/Tesla/red_color.jpg'
            wheel.src = '/media/Tesla/Model 3/model_3_wheel1.png'
        } else if (selectValueWheelValue === "Wheel 2" && selectValueColorValue === "White") {
            model.src = '/media/Tesla/Model 3/model_3_white_2.png'
            color.src = '/media/Tesla/white_color.jpg'
            wheel.src = '/media/Tesla/Model 3/model_3_wheel2.png'
        } else if (selectValueWheelValue === "Wheel 2" && selectValueColorValue === "Black") {
            model.src = '/media/Tesla/Model 3/model_3_black_2.png'
            color.src = '/media/Tesla/black_color.jpg'
            wheel.src = '/media/Tesla/Model 3/model_3_wheel2.png'
        } else if (selectValueWheelValue === "Wheel 2" && selectValueColorValue === "Red") {
            model.src = '/media/Tesla/Model 3/model_3_red_2.png'
            color.src = '/media/Tesla/red_color.jpg'
            wheel.src = '/media/Tesla/Model 3/model_3_wheel2.png'
        }
    }
}

selectValueModel.addEventListener("change", changeSrc)
selectValueColor.addEventListener("change", changeSrc)
selectValueWheel.addEventListener("change", changeSrc)



/* -----  Mymodel view ends -----  */



/*************************************************************************************************
 * Model S view settings starts 
 * ***********************************************************************************************/



/* -----  showModelSView function starts, model S on page -----  */
function showModelSView() {
    // set the default values 
    carColor = "White"
    carModel = "Model S"
    wheel = "Wheel 1"

    //disable  home view
    document.getElementById("home_view").style.display = "none"
    //disable home view

    //disable car buttons from home view
    document.getElementById("model-3").style.display = "none"
    document.getElementById("model-x").style.display = "none"
    document.getElementById("model-s").style.display = "none"
    //disable car buttons from home view


    // disable register view
    document.getElementById("register_table").style.display = "none"
    // disable register view

    // disable login view
    document.getElementById("login_table").style.display = "none"
    // disable login view


    // disable model x view
    document.getElementById("model_x_page").style.display = "none"
    document.getElementById("model-x-homebutton").style.display = "none"
    document.getElementById("left-border-x").style.display = "none"
    document.getElementById("model-x-color-white").style.display = "none"
    document.getElementById("model-x-color-black").style.display = "none"
    document.getElementById("model-x-color-red").style.display = "none"
    document.getElementById("autopilot-model-x-colorp").style.display = "none"
    document.getElementById("model-x-car-pic").style.display = "none"
    document.getElementById("model-x-car-pic").src = "/media/Tesla/Model S/model_x_white.png";
    document.getElementById("right-border-x").style.display = "none"
    document.getElementById("autopilot-model-x").style.display = "none"
    document.getElementById("model-x-car-autopilot-preview").style.display = "none"
    document.getElementById("model-x-wheel1").style.display = "none"
    document.getElementById("model-x-wheel2").style.display = "none"
    // disable model x view


    /*******************************************************/

    // enable model s view
    document.getElementById("model_s_page").style.display = "block"
    document.getElementById("model-s-homebutton").style.display = "block"
    document.getElementById("left-border").style.display = "block"
    document.getElementById("model-s-color-white").style.display = "block"
    document.getElementById("model-s-color-black").style.display = "block"
    document.getElementById("model-s-color-red").style.display = "block"
    document.getElementById("autopilot-model-s-colorp").style.display = "block"
    document.getElementById("model-s-car-pic").style.display = "block"
    document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_white.png";
    document.getElementById("right-border").style.display = "block"
    document.getElementById("autopilot-model-s").style.display = "block"
    document.getElementById("model-s-car-autopilot-preview").style.display = "block"
    document.getElementById("model-s-wheel1").style.display = "block"
    document.getElementById("model-s-wheel2").style.display = "block"
    // enable model s view
}
/* -----  showModelSView function ends -----  */


// make black color clickable
document.getElementById("model-s-color-black").addEventListener("click", chooseModelSBlack)
function chooseModelSBlack() {

    if (wheel === "Wheel 1") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_black.png"
        carColor = "Black"
        carModel = "Model S"
        wheel = "Wheel 1"
        console.log(userName)
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (wheel === "Wheel 2") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_black_2.png"
        carColor = "Black"
        carModel = "Model S"
        wheel = "Wheel 2"
        console.log(userName)
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

// make white color clickable
document.getElementById("model-s-color-white").addEventListener("click", chooseModelSWhite)
function chooseModelSWhite() {
    if (wheel === "Wheel 1") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_white.png"
        carColor = "White"
        carModel = "Model S"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (wheel === "Wheel 2") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_white_2.png"
        carColor = "White"
        carModel = "Model S"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

// make red color clickable
document.getElementById("model-s-color-red").addEventListener("click", chooseModelSRed)
function chooseModelSRed() {
    if (wheel === "Wheel 1") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_red.png"
        carColor = "Red"
        carModel = "Model S"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (wheel === "Wheel 2") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_red_2.png"
        carColor = "Red"
        carModel = "Model S"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}


// make wheel 1 clickable
document.getElementById("model-s-wheel1").addEventListener("click", chooseModelSwheel1)
function chooseModelSwheel1() {
    if (carColor === "White") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_white.png"
        carColor = "White"
        carModel = "Model S"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Black") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_black.png"
        carColor = "Black"
        carModel = "Model S"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Red") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_red.png"
        carColor = "Red"
        carModel = "Model S"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

// make wheel 2 clickable
document.getElementById("model-s-wheel2").addEventListener("click", chooseModelSwheel2)
function chooseModelSwheel2() {
    if (carColor === "White") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_white_2.png"
        carColor = "White"
        carModel = "Model S"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Black") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_black_2.png"
        carColor = "Black"
        carModel = "Model S"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Red") {
        document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_red_2.png"
        carColor = "Red"
        carModel = "Model S"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

/*************************************************************************************************
 * Model S view settings ends
 * ***********************************************************************************************/




/*************************************************************************************************
 * Model X view settings starts 
 * ***********************************************************************************************/



/* -----  showModelXView function starts, model X on page -----  */
function showModelXView() {
    // set the default values 
    carColor = "White"
    carModel = "Model X"
    wheel = "Wheel 1"

    //disable  home view
    document.getElementById("home_view").style.display = "none"
    //disable home view

    //disable car buttons from home view
    document.getElementById("model-3").style.display = "none"
    document.getElementById("model-x").style.display = "none"
    document.getElementById("model-s").style.display = "none"
    //disable car buttons from home view


    // disable register view
    document.getElementById("register_table").style.display = "none"
    // disable register view

    // disable login view
    document.getElementById("login_table").style.display = "none"
    // disable login view


    // disable model s view
    document.getElementById("model_s_page").style.display = "none"
    document.getElementById("model-s-homebutton").style.display = "none"
    document.getElementById("left-border").style.display = "none"
    document.getElementById("model-s-color-white").style.display = "none"
    document.getElementById("model-s-color-black").style.display = "none"
    document.getElementById("model-s-color-red").style.display = "none"
    document.getElementById("autopilot-model-s-colorp").style.display = "none"
    document.getElementById("model-s-car-pic").style.display = "none"
    document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_white.png";
    document.getElementById("right-border").style.display = "none"
    document.getElementById("autopilot-model-s").style.display = "none"
    document.getElementById("model-s-car-autopilot-preview").style.display = "none"
    document.getElementById("model-s-wheel1").style.display = "none"
    document.getElementById("model-s-wheel2").style.display = "none"
    // disable model s view


    /*******************************************************/

    // enable model x view
    document.getElementById("model_x_page").style.display = "block"
    document.getElementById("model-x-homebutton").style.display = "block"
    document.getElementById("left-border-x").style.display = "block"
    document.getElementById("model-x-color-white").style.display = "block"
    document.getElementById("model-x-color-black").style.display = "block"
    document.getElementById("model-x-color-red").style.display = "block"
    document.getElementById("autopilot-model-x-colorp").style.display = "block"
    document.getElementById("model-x-car-pic").style.display = "block"
    document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_white.png";
    document.getElementById("right-border-x").style.display = "block"
    document.getElementById("autopilot-model-x").style.display = "block"
    document.getElementById("model-x-car-autopilot-preview").style.display = "block"
    document.getElementById("model-x-wheel1").style.display = "block"
    document.getElementById("model-x-wheel2").style.display = "block"
    // enable model x view
}
/* -----  showModelXView function ends -----  */


// make black color clickable
document.getElementById("model-x-color-black").addEventListener("click", chooseModelXBlack)
function chooseModelXBlack() {

    if (wheel === "Wheel 1") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_black.png"
        carColor = "Black"
        carModel = "Model X"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (wheel === "Wheel 2") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_black_2.png"
        carColor = "Black"
        carModel = "Model X"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

// make white color clickable
document.getElementById("model-x-color-white").addEventListener("click", chooseModelXWhite)
function chooseModelXWhite() {
    if (wheel === "Wheel 1") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_white.png"
        carColor = "White"
        carModel = "Model X"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (wheel === "Wheel 2") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_white_2.png"
        carColor = "White"
        carModel = "Model X"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

// make red color clickable
document.getElementById("model-x-color-red").addEventListener("click", chooseModelXRed)
function chooseModelXRed() {
    if (wheel === "Wheel 1") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_red.png"
        carColor = "Red"
        carModel = "Model X"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (wheel === "Wheel 2") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_red_2.png"
        carColor = "Red"
        carModel = "Model X"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}


// make wheel 1 clickable
document.getElementById("model-x-wheel1").addEventListener("click", chooseModelXwheel1)
function chooseModelXwheel1() {
    if (carColor === "White") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_white.png"
        carColor = "White"
        carModel = "Model X"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Black") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_black.png"
        carColor = "Black"
        carModel = "Model X"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Red") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_red.png"
        carColor = "Red"
        carModel = "Model X"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

// make wheel 2 clickable
document.getElementById("model-x-wheel2").addEventListener("click", chooseModelXwheel2)
function chooseModelXwheel2() {
    if (carColor === "White") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_white_2.png"
        carColor = "White"
        carModel = "Model X"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Black") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_black_2.png"
        carColor = "Black"
        carModel = "Model X"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Red") {
        document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_red_2.png"
        carColor = "Red"
        carModel = "Model X"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

/*************************************************************************************************
 * Model X view settings ends
 * ***********************************************************************************************/





/*************************************************************************************************
 * Model 3 view settings starts 
 * ***********************************************************************************************/



/* -----  showModel3View function starts, model 3 on page -----  */
function showModel3View() {
    // set the default values 
    carColor = "White"
    carModel = "Model 3"
    wheel = "Wheel 1"

    //disable  home view
    document.getElementById("home_view").style.display = "none"
    //disable home view

    //disable car buttons from home view
    document.getElementById("model-3").style.display = "none"
    document.getElementById("model-x").style.display = "none"
    document.getElementById("model-s").style.display = "none"
    //disable car buttons from home view


    // disable register view
    document.getElementById("register_table").style.display = "none"
    // disable register view

    // disable login view
    document.getElementById("login_table").style.display = "none"
    // disable login view


    // disable model s view
    document.getElementById("model_s_page").style.display = "none"
    document.getElementById("model-s-homebutton").style.display = "none"
    document.getElementById("left-border").style.display = "none"
    document.getElementById("model-s-color-white").style.display = "none"
    document.getElementById("model-s-color-black").style.display = "none"
    document.getElementById("model-s-color-red").style.display = "none"
    document.getElementById("autopilot-model-s-colorp").style.display = "none"
    document.getElementById("model-s-car-pic").style.display = "none"
    document.getElementById("model-s-car-pic").src = "/media/Tesla/Model S/model_s_white.png";
    document.getElementById("right-border").style.display = "none"
    document.getElementById("autopilot-model-s").style.display = "none"
    document.getElementById("model-s-car-autopilot-preview").style.display = "none"
    document.getElementById("model-s-wheel1").style.display = "none"
    document.getElementById("model-s-wheel2").style.display = "none"
    // disable model s view


    // disable model x view
    document.getElementById("model_x_page").style.display = "none"
    document.getElementById("model-x-homebutton").style.display = "none"
    document.getElementById("left-border-x").style.display = "none"
    document.getElementById("model-x-color-white").style.display = "none"
    document.getElementById("model-x-color-black").style.display = "none"
    document.getElementById("model-x-color-red").style.display = "none"
    document.getElementById("autopilot-model-x-colorp").style.display = "none"
    document.getElementById("model-x-car-pic").style.display = "none"
    document.getElementById("model-x-car-pic").src = "/media/Tesla/Model X/model_x_white.png";
    document.getElementById("right-border-x").style.display = "none"
    document.getElementById("autopilot-model-x").style.display = "none"
    document.getElementById("model-x-car-autopilot-preview").style.display = "none"
    document.getElementById("model-x-wheel1").style.display = "none"
    document.getElementById("model-x-wheel2").style.display = "none"
    // disable model x view


    /*******************************************************/

    // enable model 3 view
    document.getElementById("model_3_page").style.display = "block"
    document.getElementById("model-3-homebutton").style.display = "block"
    document.getElementById("left-border-3").style.display = "block"
    document.getElementById("model-3-color-white").style.display = "block"
    document.getElementById("model-3-color-black").style.display = "block"
    document.getElementById("model-3-color-red").style.display = "block"
    document.getElementById("autopilot-model-3-colorp").style.display = "block"
    document.getElementById("model-3-car-pic").style.display = "block"
    document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_white.png";
    document.getElementById("right-border-3").style.display = "block"
    document.getElementById("autopilot-model-3").style.display = "block"
    document.getElementById("model-3-car-autopilot-preview").style.display = "block"
    document.getElementById("model-3-wheel1").style.display = "block"
    document.getElementById("model-3-wheel2").style.display = "block"
    // enable model 3 view
}
/* -----  showModel3View function ends -----  */


// make black color clickable
document.getElementById("model-3-color-black").addEventListener("click", chooseModel3Black)
function chooseModel3Black() {

    if (wheel === "Wheel 1") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_black.png"
        carColor = "Black"
        carModel = "Model 3"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (wheel === "Wheel 2") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_black_2.png"
        carColor = "Black"
        carModel = "Model 3"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

// make white color clickable
document.getElementById("model-3-color-white").addEventListener("click", chooseModel3White)
function chooseModel3White() {
    if (wheel === "Wheel 1") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_white.png"
        carColor = "White"
        carModel = "Model 3"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (wheel === "Wheel 2") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_white_2.png"
        carColor = "White"
        carModel = "Model 3"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

// make red color clickable
document.getElementById("model-3-color-red").addEventListener("click", chooseModel3Red)
function chooseModel3Red() {
    if (wheel === "Wheel 1") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_red.png"
        carColor = "Red"
        carModel = "Model 3"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (wheel === "Wheel 2") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_red_2.png"
        carColor = "Red"
        carModel = "Model 3"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}


// make wheel 1 clickable
document.getElementById("model-3-wheel1").addEventListener("click", chooseModel3wheel1)
function chooseModel3wheel1() {
    if (carColor === "White") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_white.png"
        carColor = "White"
        carModel = "Model 3"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Black") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_black.png"
        carColor = "Black"
        carModel = "Model 3"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Red") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_red.png"
        carColor = "Red"
        carModel = "Model 3"
        wheel = "Wheel 1"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

// make wheel 2 clickable
document.getElementById("model-3-wheel2").addEventListener("click", chooseModel3wheel2)
function chooseModel3wheel2() {
    if (carColor === "White") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_white_2.png"
        carColor = "White"
        carModel = "Model 3"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Black") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_black_2.png"
        carColor = "Black"
        carModel = "Model 3"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    } else if (carColor === "Red") {
        document.getElementById("model-3-car-pic").src = "/media/Tesla/Model 3/model_3_red_2.png"
        carColor = "Red"
        carModel = "Model 3"
        wheel = "Wheel 2"
        console.log("Data: " + carColor + " " + carModel + " " + wheel)
    }
}

/*************************************************************************************************
 * Model 3 view settings ends
 * ***********************************************************************************************/

function addCarToUser() {
    // New POST request to controller
    var xhr = new XMLHttpRequest()
    xhr.open('Post', '/CarModel/AddCarToUser')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfull!
            } else if (status === 500) {
                // There has been an error with the request!
            }
        }
    };
    // Sending login details to controller 
    var data = new FormData()
    data.append('username', userName)
    data.append('carmodel', carModel)
    data.append('carcolor', carColor)
    data.append('carwheel', wheel)
    xhr.send(data)
}
/******************************************************************************************************** */



/*************************************************************************************************
 * Payment site starts
 * ***********************************************************************************************/

function getShoppingCart() {
    // New POST request to controller
    var xhr = new XMLHttpRequest()
    xhr.open('Post', '/Payment/GetShoppingCart')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                console.log(xhr.responseText)

                let JSONOfCarmodel = JSON.parse(xhr.responseText)

                let carModel = document.getElementById("car-model")
                let carColor = document.getElementById("car-color")
                let carWheel = document.getElementById("car-wheel")
                let carModelPic = document.getElementById("car-model-pic")
                let carModelColorPic = document.getElementById("car-model-color-pic")
                let carWheelPic = document.getElementById("car-wheel-pic")

                //here comes the if train :(
                if (JSONOfCarmodel.modelType === "Model S") {
                    if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "White" ) {
                        carModelPic.src = '/media/Tesla/Model S/model_s_white.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Black" ) {
                        carModelPic.src = '/media/Tesla/Model S/model_s_black.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Red" ) {
                        carModelPic.src = '/media/Tesla/Model S/model_s_red.png'
                        carModelColorPic.src = '/media/Tesla/red_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "White" ) {
                        carModelPic.src = '/media/Tesla/Model S/model_s_white_2.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Black" ) {
                        carModelPic.src = '/media/Tesla/Model S/model_s_black_2.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Red" ) {
                        carModelPic.src = '/media/Tesla/Model S/model_s_red_2.png'
                        carModelColorPic.src = '/media/Tesla/red_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model S/model_s_wheel2.png'
                    }
                } else if (JSONOfCarmodel.modelType === "Model X") {
                    if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "White") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_white.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Black") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_black.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Red") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_red.png'
                        carModelColorPic.src = "url('/media/Tesla/red_color.jpg')"
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "White") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_white_2.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Black") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_black_2.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Red") {
                        carModelPic.src = '/media/Tesla/Model X/model_x_red_2.png'
                        carModelColorPic.src = '/media/Tesla/red_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model X/model_x_wheel2.png'
                    }
                } else if (JSONOfCarmodel.modelType === "Model 3") {
                    if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "White") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_white.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Black") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_black.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 1" && JSONOfCarmodel.modelColor === "Red") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_red.png'
                        carModelColorPic.src = '/media/Tesla/red_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel1.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "White") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_white_2.png'
                        carModelColorPic.src = '/media/Tesla/white_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Black") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_black_2.png'
                        carModelColorPic.src = '/media/Tesla/black_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel2.png'
                    } else if (JSONOfCarmodel.modelWheel === "Wheel 2" && JSONOfCarmodel.modelColor === "Red") {
                        carModelPic.src = '/media/Tesla/Model 3/model_3_red_2.png'
                        carModelColorPic.src = '/media/Tesla/red_color.jpg'
                        carWheelPic.src = '/media/Tesla/Model 3/model_3_wheel2.png'
                    }
                }
                carModel.innerHTML = JSONOfCarmodel.modelType
                carColor.innerHTML = JSONOfCarmodel.modelColor
                carWheel.innerHTML = JSONOfCarmodel.modelWheel
            } else if (status === 500) {
                // There has been an error with the request!
            }
        }
    };
    // Sending login details to controller 
    var data = new FormData()
    data.append('username', userName)
    console.log("elkuldott username: " + userName)
    xhr.send(data)
}


function carPayed() {
    // New GET request to controller
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/Payment/MakeCarPayed')
    xhr.send()
}

function deleteUnpaidModel() {
    // New GET request to controller
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/Payment/DeleteCarAfterOrder')
    xhr.send()
    let button = document.getElementById("delete-model-button")
    button.innerText = "Model successfully deleted. Click on 'Back' to visit home view again."
    button.style.textDecoration = "none"
    button.style.color = "green"

    document.getElementById("buy-model-paypal").style.display = "none"
    document.getElementById("payment").style.display = "none"

}

/*************************************************************************************************
 * Payment site ends
 * ***********************************************************************************************/





/*************************************************************************************************
 * Transaction site starts
 * ***********************************************************************************************/

function getTransactionDetails() {
    // New GET request to controller
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/Payment/GetTransaction')
    xhr.send()

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfull!
                let JSONOfTransaction = JSON.parse(xhr.responseText)
                console.log(xhr.responseText)

                let transactionID = document.getElementById("transaction-id")
                let customername = document.getElementById("customername")
                let orderdate = document.getElementById("orderdate")


                transactionID.innerText = JSONOfTransaction.transID
                customername.innerText = JSONOfTransaction.carOwner
                orderdate.innerText = JSONOfTransaction.orderDate

            } else if (status === 500) {
                // There has been an error with the request!
            }
        }
    };
}

function sendEmail() {
    let transactionID;
    let customername;
    let orderdate;

    // New GET request to controller
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/Payment/GetTransaction')
    xhr.send()

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfull!
                let JSONOfTransaction = JSON.parse(xhr.responseText)
                console.log(xhr.responseText)

                transactionID = JSONOfTransaction.transID
                customername = JSONOfTransaction.carOwner
                orderdate = JSONOfTransaction.orderDate

                //get the email from the user
                var txt;
                var email = prompt("Please enter your email:", "email");
                if (email == null || email == "") {
                    txt = "User cancelled the prompt.";
                    alert(txt)
                } 
                    
                //send the email
                Email.send({
                    Host: "smtp.gmail.com",
                    Username: "ferencziviktor11@gmail.com",
                    Password: "518a2c49FD110199Integral",
                    To: email,
                    From: "ferencziviktor11@gmail.com",
                    Subject: "Confirmation - Tesla Model S Order",
                    //Body: "TransactionID: $transid".replace("$transid", transactionID) +
                    //      " Customer: $customername".replace("$customername", customername) +
                    //      " Order date: orderdate".replace("orderdate", orderdate)
                    Body: "xdd"
                })
                    .then(function (message) {
                        alert("mail sent successfully")
                    });
            } else if (status === 500) {
                // There has been an error with the request!
            }
        }
    };
}

/*************************************************************************************************
 * Transaction site ends
 * ***********************************************************************************************/


