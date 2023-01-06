// Include ExpressJS
const express = require('express');
// Include UUID 
const { v4: uuidv4 } = require('uuid');
// Path
const path = require('path');
// Middleware
const bodyParser = require('body-parser');
// Create an ExpressJS app
const app = express();
// Port
const port = 8080;

app.listen(port)

// Serve static content from directory "public"
app.use(express.static('public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function (req, res) {

    let options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function (err) {
        console.log(err)
    })
})

// Login Service – LS
const usersStored = [
    { "username": "Alice", "password": "Alice" },
    { "username": "Peter", "password": "Peter" },
    { "username": "Harry", "password": "Harry" }
];

let usersLogged = [];

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/LS', async (req, res) => {
    try {
        // Get username & password
        let usernameSubmitted = req.body.username;
        let passwordSubmitted = req.body.password;

        // Find user in the database
        userFound = usersStored.find(user => user.username === usernameSubmitted);

        // If user authentication succeeded
        if ((userFound) && (userFound.password == passwordSubmitted)) {
            // Create unique session id
            const code = uuidv4();

            // If user had logged in again
            let userLogged = usersLogged.find(user => user.username === usernameSubmitted);
            if (userLogged) {
                // Change unique session id
                userLogged.sessionId = code;
            } else {
                // Else, log user in
                usersLogged.push({ "username": usernameSubmitted, "sessionId": code });
            }
            console.log(usersLogged);

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
        // If there is internal server error
        // Send response status code
        res.status(501);
        res.send();
    }
});

// Cart Item Service - CIS
let cart = [];

app.post('/CIS', async (req, res) => {
    try {
        // Get product id, username & session id
        let productSubmitted = req.body.product;
        let usernameSubmitted = req.body.username;
        let sessionIdSubmitted = req.body.sessionId;

        // Find user in the database
        let userFound = usersLogged.find(user => user.username == usernameSubmitted);

        // If user is logged in 
        if ((userFound) && (userFound.sessionId == sessionIdSubmitted)) {
            // If user has added that product to the cart
            let productAdded = cart.find(prod => ((prod.product == productSubmitted) && (prod.username == userFound.username)))
            if (productAdded) {
                // Increase product's quantity 
                productAdded.quantity += 1;
                console.log(cart);
            } else {
                // Else, add product to cart
                cart.push({ "username": usernameSubmitted, "product": productSubmitted, "quantity": 1 });
                console.log(cart);
            }

            // Send response status code
            res.status(200);
            res.send();
        } else {
            // Else, send response status code
            res.status(401);
            res.send();
        }
    } catch {
        // If there is internal server error
        // Send response status code
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

        // Find user in the database
        let userFound = usersLogged.find(user => user.username == usernameSubmitted);

        // If user is logged in 
        if ((userFound) && (userFound.sessionId == sessionIdSubmitted)) {
            // Calculate cart size
            let size = 0;
            // For every item in the cart
            cart.filter(item => {
                // If the item was added by user
                if (item.username == usernameSubmitted) {
                    // Increase cart size by item's quantity
                    size += item.quantity;
                    return true;
                }
                return false;
            })

            // Send response status code
            res.status(200);
            // Send cart size
            res.send(JSON.stringify({ "size": size }));
        } else {
            // Else, send response status code
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