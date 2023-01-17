function getProductID() {
    let search_field = new URLSearchParams(document.location.search);
    return search_field.get("categoryID");
}

let id = getProductID();

function getSubcategory(id) {
    let kathgoria = id.slice(id.length - 1);
    return kathgoria;
}

let subCat = getSubcategory(id);
console.log(subCat);

fetch("https://wiki-shop.onrender.com/categories/" + id + "/products")
    .then(response => { return response.json(); })
    .then(data => {
        console.log(data);

        let rawTemplate = document.getElementById("products-template").innerHTML;
        let compiledTemplate = Handlebars.compile(rawTemplate);
        let ourHTML = compiledTemplate(data);
        let outputHTML = document.getElementById("products");
        outputHTML.innerHTML = ourHTML;
    })
    .catch(error => console.log(error));

fetch("https://wiki-shop.onrender.com/categories/" + id + "/subcategories")
    .then(response => { return response.json(); })
    .then(data => {
        console.log(data);
        let template = {};

        template.templateFunction = Handlebars.compile(
            `<aside class='kathgories-proiontwn'>
               
                <h3>Choose subcategory:</h3>
                    <input type="radio" id="All" name="subcategory-button" class="ypokathgories" value="0" onclick="ShowHideDiv()">
                    <label for="0">All</label>
                    {{#each this}}
                        <div class="koumpia">
                            <input type="radio" id="{{title}}" name="subcategory-button" class="ypokathgories" value="{{title}}" onclick="ShowHideDiv()">
                            <label for="{{title}}">{{title}}</label>
                        </div>
                    {{/each}}
            </aside>`);

        let content = template.templateFunction(data);
        let epiloges = document.getElementById("mySubcategories");
        epiloges.innerHTML += content;
    })
    .catch(error => console.log(error));

function ShowHideDiv() {
    var chk0 = document.getElementById("All");
    var chk1 = document.getElementById("Hoodie");
    var chk2 = document.getElementById("Shirt");
    var chk3 = document.getElementById("Shocks");
    var chk4 = document.getElementById("T-Shirt");
    var chk5 = document.getElementById("DrinkWear");
    var chk6 = document.getElementById("Pens");
    var chk7 = document.getElementById("Stickers");
    var chk8 = document.getElementById("Water Bottle");
    var chk9 = document.getElementById("Games");
    var chk10 = document.getElementById("Onesies");

    var showHoodie = document.getElementsByClassName("1");
    var showShirt = document.getElementsByClassName("2");
    var showSocks = document.getElementsByClassName("3");
    var showTshirt = document.getElementsByClassName("4");

    var showDrinkWear = document.getElementsByClassName("5");
    var showPens = document.getElementsByClassName("6");
    var showStickers = document.getElementsByClassName("7");
    var showWaterBottle = document.getElementsByClassName("8");

    var showGames = document.getElementsByClassName("9");
    var showOnesies = document.getElementsByClassName("10");

    if (id == 1) {
        if (chk0.checked) {
            for (let i = 0; i < showHoodie.length; i++) {
                showHoodie[i].style.display = "block";
            }
            for (let i = 0; i < showShirt.length; i++) {
                showShirt[i].style.display = "block";
            }
            for (let i = 0; i < showTshirt.length; i++) {
                showTshirt[i].style.display = "block";
            }

            showSocks[0].style.display = "block";

            for (let i = 0; i < showDrinkWear.length; i++) {
                showDrinkWear[i].style.display = "block";
            }
            for (let i = 0; i < showPens.length; i++) {
                showPens[i].style.display = "block";
            }
            for (let i = 0; i < showStickers.length; i++) {
                showStickers[i].style.display = "block";
            }
            for (let i = 0; i < showWaterBottle.length; i++) {
                showWaterBottle[i].style.display = "block";
            }
            for (let i = 0; i < showGames.length; i++) {
                showGames[i].style.display = "block";
            }
            for (let i = 0; i < showOnesies.length; i++) {
                showOnesies[i].style.display = "block";
            }
        }
        else if (chk1.checked) {
            for (let i = 0; i < showHoodie.length; i++) {
                showHoodie[i].style.display = "block";
            }
            for (let i = 0; i < showShirt.length; i++) {
                showShirt[i].style.display = "none";
            }
            for (let i = 0; i < showTshirt.length; i++) {
                showTshirt[i].style.display = "none";
            }
            showSocks[0].style.display = "none";
        }
        else if (chk2.checked) {
            for (let i = 0; i < showShirt.length; i++) {
                showShirt[i].style.display = "block";
            }
            for (let i = 0; i < showHoodie.length; i++) {
                showHoodie[i].style.display = "none";
            }
            showSocks[0].style.display = "none";
            for (let i = 0; i < showTshirt.length; i++) {
                showTshirt[i].style.display = "none";
            }
        }
        else if (chk3.checked) {
            showSocks[0].style.display = "block";
            for (let i = 0; i < showHoodie.length; i++) {
                showHoodie[i].style.display = "none";
            }
            for (let i = 0; i < showShirt.length; i++) {
                showShirt[i].style.display = "none";
            }
            for (let i = 0; i < showTshirt.length; i++) {
                showTshirt[i].style.display = "none";
            }
        }
        else if (chk4.checked) {
            for (let i = 0; i < showTshirt.length; i++) {
                showTshirt[i].style.display = "block";
            }
            for (let i = 0; i < showHoodie.length; i++) {
                showHoodie[i].style.display = "none";
            }
            for (let i = 0; i < showShirt.length; i++) {
                showShirt[i].style.display = "none";
            }
            showSocks[0].style.display = "none";
        }
    }

    if (id == 2) {
        if (chk0.checked) {
            for (let i = 0; i < showDrinkWear.length; i++) {
                showDrinkWear[i].style.display = "block";
            }
            for (let i = 0; i < showPens.length; i++) {
                showPens[i].style.display = "block";
            }
            for (let i = 0; i < showStickers.length; i++) {
                showStickers[i].style.display = "block";
            }
            for (let i = 0; i < showWaterBottle.length; i++) {
                showWaterBottle[i].style.display = "block";
            }
        }

        if (chk5.checked) {
            for (let i = 0; i < showDrinkWear.length; i++) {
                showDrinkWear[i].style.display = "block";
            }
            for (let i = 0; i < showPens.length; i++) {
                showPens[i].style.display = "none";
            }
            for (let i = 0; i < showStickers.length; i++) {
                showStickers[i].style.display = "none";
            }
            for (let i = 0; i < showWaterBottle.length; i++) {
                showWaterBottle[i].style.display = "none";
            }
        }

        if (chk6.checked) {
            for (let i = 0; i < showDrinkWear.length; i++) {
                showDrinkWear[i].style.display = "none";
            }
            for (let i = 0; i < showPens.length; i++) {
                showPens[i].style.display = "block";
            }
            for (let i = 0; i < showStickers.length; i++) {
                showStickers[i].style.display = "none";
            }
            for (let i = 0; i < showWaterBottle.length; i++) {
                showWaterBottle[i].style.display = "none";
            }
        }

        if (chk7.checked) {
            for (let i = 0; i < showDrinkWear.length; i++) {
                showDrinkWear[i].style.display = "none";
            }
            for (let i = 0; i < showPens.length; i++) {
                showPens[i].style.display = "none";
            }
            for (let i = 0; i < showStickers.length; i++) {
                showStickers[i].style.display = "block";
            }
            for (let i = 0; i < showWaterBottle.length; i++) {
                showWaterBottle[i].style.display = "none";
            }
        }

        if (chk8.checked) {
            for (let i = 0; i < showDrinkWear.length; i++) {
                showDrinkWear[i].style.display = "none";
            }
            for (let i = 0; i < showPens.length; i++) {
                showPens[i].style.display = "none";
            }
            for (let i = 0; i < showStickers.length; i++) {
                showStickers[i].style.display = "none";
            }
            for (let i = 0; i < showWaterBottle.length; i++) {
                showWaterBottle[i].style.display = "block";
            }
        }
    }

    if (id == 3) {
        if (chk0.checked) {
            for (let i = 0; i < showGames.length; i++) {
                showGames[i].style.display = "block";
            }
            for (let i = 0; i < showOnesies.length; i++) {
                showOnesies[i].style.display = "block";
            }
        }
        else if (chk9.checked) {
            for (let i = 0; i < showGames.length; i++) {
                showGames[i].style.display = "block";
            }
            for (let i = 0; i < showOnesies.length; i++) {
                showOnesies[i].style.display = "none";
            }
        }
        else if (chk10.checked) {
            for (let i = 0; i < showGames.length; i++) {
                showGames[i].style.display = "none";
            }
            for (let i = 0; i < showOnesies.length; i++) {
                showOnesies[i].style.display = "block";
            }
        }
    }
}

// User authentication
let username; // User's username
let sessionId; // User's unique session id

// When login form is submitted
let form = document.getElementById("form");
form.addEventListener('submit', logSubmit);

function logSubmit(event) {
    event.preventDefault();

    username = document.getElementById("username").value;
    let passwordSubmitted = document.getElementById("password").value;

    fetch('/LS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": username, "password": passwordSubmitted })
    })
        .then((response) => {
            getLSStatus(response.status);

            return response.json();
        })
        .then((data) => {
            console.log(data);

            getSessionId(data.sessionId);
        })
        .catch((error) => {
            console.error(error)
        });
}

function getLSStatus(status) {
    console.log(status);

    // If user logged in successfully
    if (status == "200") {
        // Hide log in form
        form.style.display = "none";
    } else if (status == "401") {
        // Else, if user did not log in, print error message
        let message = document.getElementById("message");
        message.innerHTML = "Wrong username or password!"
    } else {
        // Else, show site's error message
        window.alert("Our site is currently unavailable. Please try again later.")
    }

    return;
}

function getSessionId(receivedSessionId) {
    sessionId = receivedSessionId;

    // Load cart's reference with variables
    let rawTemplate = document.getElementById("cart-template").innerHTML;
    let compiledTemplate = Handlebars.compile(rawTemplate);
    let loadedTemplate = compiledTemplate({ "username": username, "sessionId": sessionId });
    let cart = document.getElementById("cart");
    cart.innerHTML = loadedTemplate;

    // Update user's cart size
    getCartSize();

    return;
}

// When buy button of a products is clicked
function buyProduct(event, id, title, cost) {
    event.preventDefault();

    // Add product to user's cart
    fetch('/CIS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": id, "title": title, "cost": cost, "username": username, "sessionId": sessionId })
    })
        .then((response) => {
            getCISStatus(response.status);

            return response;
        })
        .catch((error) => {
            console.error(error);
        });

    // Update user's cart size
    getCartSize();
}

function getCISStatus(status) {
    console.log(status);

    // If product was added successfully
    if (status == "200") {
        // Show success message
        let cartMessage = document.getElementById("cart-message");
        cartMessage.innerHTML = "Product added!"
    } else if (status == "401") {
        // Else, if user is not logged in, show error message
        window.alert("Please login to add products to your cart!");
    } else {
        // Else, show site's error message
        window.alert("Our site is currently unavailable. Please try again later.")
    }

    return;
}

function getCartSize() {
    let status;

    // Get user's cart size from the server
    fetch('/CSS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": username, "sessionId": sessionId })
    })
        .then((response) => {
            status = response.status;

            return response.json();
        })
        .then((data) => {
            showCartSize(status, data);
        })
        .catch((error) => {
            console.error(error);
        });
}

function showCartSize(status, response) {
    console.log(status);
    console.log(response);

    // If cart's size was received successfully
    if (status == "200") {
        // Print cart's size
        let size = document.getElementById("size");
        size.innerHTML = "Cart: " + response.size;
    }

    return;
}