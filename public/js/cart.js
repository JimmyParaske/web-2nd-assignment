// When cart.html loads
window.addEventListener('load', init);

function init(event) {
    // Get URL parameters
    let urlParams = new URLSearchParams(window.location.search);

    // Get user's username & session id
    let username = urlParams.get('username');
    let sessionId = urlParams.get('sessionId');

    // Get user's cart
    getContents(username, sessionId);
}

function getContents(usernameGiven, sessionIdGiven) {
    let status;

    // Get products in user's cart from server
    fetch('/CRS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usernameGiven, sessionId: sessionIdGiven })
    })
        .then((response) => {
            status = response.status;

            return response.json();
        })
        .then((data) => {
            getCRSStatus(status, data);
        })
        .catch((error) => {
            console.error(error);
        });
}

function getCRSStatus(status, data) {
    console.log(status);

    // If user's cart was received successfully
    if (status == "200") {
        console.log(data);

        // Show products and total cost
        showContents(data.cartItems);
        showTotalCost(data);
    } else if (status == "401") {
        // Else, if user is not logged in, show error message
        window.alert("Please login to view your cart!");
        // And go to category.html
        window.location = './category.html?categoryID=1';
    }
    return;
}

function showContents(products) {
    // Get cart table's template
    let cartTableTemplate = document.getElementById("cart-table-template").textContent;
    window.templates = {};
    window.templates.cartTable = Handlebars.compile(cartTableTemplate);

    // Load cart table's template with cart's products
    let cartTable = document.getElementById("cart-table");
    let loadedTemplate = templates.cartTable({ array: products });
    
    // Load cart table in page
    cartTable.innerHTML = loadedTemplate;
};

function showTotalCost(cost) {
    // Get total cost table's template
    let rawTemplate = document.getElementById("total-cost-template").innerHTML;
    let compiledTemplate = Handlebars.compile(rawTemplate);

    // Load total cost table's template with cart's total cost
    let loadedTemplate = compiledTemplate(cost);

    // Load cart's total cost in page
    let totalCost = document.getElementById("total-cost");
    totalCost.innerHTML = loadedTemplate;
};