// Include ExpressJS
const express = require('express');
// Include UUID 
const { v4: uuidv4 } = require('uuid');
// Path
const path = require('path');
// Create an ExpressJS app
const app = express();
// Port
const port = 8080;
app.listen(port);
console.log('Server is listening on port ' + port);

// Serve static content from directory "public"
app.use(express.static('public'));

// Parse url-encoded content from body
app.use(express.urlencoded({ extended: false }));

// Parse application/json content from body
app.use(express.json());

// Serve index.html as content root
app.get('/', function (req, res) {

    let options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function (err) {
        console.log(err);
    })
})

// Login Service – LS
const User = require("./classes/User.js");
const Login = require("./classes/Login.js");

const users = [
    new User("Alice", "Alice"),
    new User("Peter", "Peter"),
    new User("Harry", "Harry")
];

let logins = [];

app.post('/LS', async (req, res) => {
    try {
        // Get username & password
        let usernameSubmitted = req.body.username;
        let passwordSubmitted = req.body.password;

        // Find user in the database
        userFound = users.find(user => user.getUsername() == usernameSubmitted);

        // If user authentication succeeded
        if ((userFound) && (userFound.getPassword() == passwordSubmitted)) {
            // Create unique session id
            const code = uuidv4();

            // If user had logged in again
            let userLogged = logins.find(user => user.getUsername() === usernameSubmitted);
            if (userLogged) {
                // Change unique session id
                userLogged.updateSessionId(code);
            } else {
                // Else, log user in
                logins.push(new Login(usernameSubmitted, code));
            }
            console.log(logins);

            // Send response status code
            res.status(200);
            // Send unique session id
            res.send(JSON.stringify({ sessionId: code }));
        } else {
            // Else, send response status code
            res.status(401);
            res.send(JSON.stringify({}));
        }
    } catch {
        // If there is internal server error, send "Not Implemented" response status code
        res.status(501);
        res.send();
    }
});

// Cart Item Service - CIS
const Product = require("./classes/Product.js");

let cart = [];

app.post('/CIS', async (req, res) => {
    try {
        // Get product's id, title & price
        let productId = req.body.id;
        let productTitle = req.body.title;
        let productPrice = req.body.cost;

        // Get user's username & session id
        let usernameSubmitted = req.body.username;
        let sessionIdSubmitted = req.body.sessionId;

        // If user is logged in 
        let userLogged = logins.find(user => user.getUsername() == usernameSubmitted);
        if ((userLogged) && (userLogged.getSessionId() == sessionIdSubmitted)) {
            // If user has already added that product to the cart
            let productAdded = cart.find(product => ((product.getId() == productId) && (product.getUsername() == userFound.getUsername())))
            if (productAdded) {
                // Increase product's quantity 
                productAdded.addQuantity();
            } else {
                // Else, add product to cart
                cart.push(new Product(usernameSubmitted, productId, productTitle, productPrice, 1));
            }
            console.log(cart);

            // Send "Accepted" response status code
            res.status(200);
            res.send();
        } else {
            // Else, send "Unauthorized" response status code
            res.status(401);
            res.send();
        }
    } catch {
        // If there is internal server error, send "Not Implemented" response status code
        res.status(501);
        res.send();
    }
});

// Cart Size Service – CSS
app.post('/CSS', async (req, res) => {
    try {
        // Get username & session id
        let usernameSubmitted = req.body.username;
        let sessionIdSubmitted = req.body.sessionId;

        // If user is logged in 
        let userLogged = logins.find(user => user.getUsername() == usernameSubmitted);
        if ((userLogged) && (userLogged.getSessionId() == sessionIdSubmitted)) {
            // Calculate cart size
            let size = 0;
            // For every product in the cart
            cart.filter(product => {
                // If the item was added by user
                if (product.getUsername() == usernameSubmitted) {
                    // Increase cart size by item's quantity
                    size += product.getQuantity();

                    return true;
                }
                return false;
            })

            // Send "Accepted" response status code
            res.status(200);
            // Send cart size
            res.send(JSON.stringify({ "size": size }));
        } else {
            // Else, send "Unauthorized" response status code
            res.status(401);
            res.send(JSON.stringify({}));
        }
    } catch {
        // If there is internal server error
        // Send response status code
        res.status(501);
        res.send();
    }
});

// Cart Retrieval Service – CRS
app.post('/CRS', async (req, res) => {
    try {
        // Get username & session id
        let usernameSubmitted = req.body.username;
        let sessionIdSubmitted = req.body.sessionId;

        // If user is logged in
        let userLogged = logins.find(user => user.getUsername() == usernameSubmitted);
        if ((userLogged) && (userLogged.getSessionId() == sessionIdSubmitted)) {
            let cartItems = [];
            let totalCost = 0;

            // For every item in the cart
            cart.filter(product => {
                // If the item was added by user
                if (product.getUsername() == usernameSubmitted) {
                    // Add it in the cart contents
                    cartItems.push({ "title": product.getTitle(), "cost": product.getCost(), "quantity": product.getQuantity() });

                    // Increase total cost
                    totalCost += (parseInt(product.getCost()) * product.getQuantity());

                    return true;
                }
                return false;
            })

            // Send "Accepted" response status code
            res.status(200);
            // Send response
            res.send(JSON.stringify({ "cartItems": cartItems, "totalCost": totalCost }));
        } else {
            // Else, send "Unauthorized" response status code
            res.status(401);
            res.send(JSON.stringify({}));
        }
    } catch {
        // If there is internal server error, send "Not Implemented" response status code
        res.status(501);
        res.send();
    }
});