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

// MySQL database
const database = require("./classes/Database.js");

// Login Service – LS
app.post('/LS', async (req, res) => {
    try {
        // Get username & password
        let usernameSubmitted = req.body.username;
        let passwordSubmitted = req.body.password;

        // Find user in the database
        let query = `SELECT * FROM WikiShop.Users WHERE username=?`;
        database.query(query, [usernameSubmitted], function (error, result) {
            // If user authentication succeeded
            if ((result.length != 0) && (result[0].password == passwordSubmitted)) {
                // Create unique session id
                const code = uuidv4();

                // If user had logged in again
                query = `SELECT * FROM WikiShop.Logins WHERE username=?`;
                database.query(query, [usernameSubmitted], function (error, result) {
                    if (result.length != 0) {
                        // Change user's unique session id
                        let query = `UPDATE WikiShop.Logins SET sessionID=? WHERE username=?`;
                        database.query(query, [code, usernameSubmitted]);
                    } else {
                        // Else, log user in
                        let query = `INSERT INTO WikiShop.Logins (username,sessionID) VALUES (?,?)`;
                        database.query(query, [usernameSubmitted, code]);
                    }
                });

                // Send "Accepted" response status code
                res.status(200);
                // Send unique session id
                res.send(JSON.stringify({ sessionId: code }));
            } else {
                // Else, send "Unauthorized" response status code
                res.status(401);
                res.send(JSON.stringify({}));
            }
        });
    } catch {
        // If there is internal server error, send "Not Implemented" response status code
        res.status(501);
        res.send();
    }
});

// Cart Item Service - CIS
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
        query = `SELECT * FROM WikiShop.Logins WHERE username=?`;
        database.query(query, [usernameSubmitted], function (error, result) {
            if ((result.length != 0) && (result[0].sessionID == sessionIdSubmitted)) {
                // If user has already added that product to the cart
                query = `SELECT * FROM WikiShop.Cart WHERE (productID=? AND username=?)`;
                database.query(query, [productId, usernameSubmitted], function (error, result) {
                    if (result.length != 0) {
                        // Increase product's quantity 
                        let query = `UPDATE WikiShop.Cart SET productQuantity=? WHERE (productID=? AND username=?)`;
                        database.query(query, [(result[0].productQuantity + 1), result[0].productID, result[0].username]);
                    } else {
                        // Else, add product to cart
                        let query = `INSERT INTO WikiShop.Cart (username, productID, productTitle, productPrice, productQuantity) VALUES (?,?,?,?,?)`;
                        database.query(query, [usernameSubmitted, productId, productTitle, productPrice, 1]);
                    }
                });

                // Send "Accepted" response status code
                res.status(200);
                res.send();
            } else {
                // Else, send "Unauthorized" response status code
                res.status(401);
                res.send();
            }
        })
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
        query = `SELECT * FROM WikiShop.Logins WHERE username=?`;
        database.query(query, [usernameSubmitted], function (error, result) {
            if ((result.length != 0) && (result[0].sessionID == sessionIdSubmitted)) {
                // Get user's cart
                query = `SELECT * FROM WikiShop.Cart WHERE username=?`;
                database.query(query, [usernameSubmitted], function (error, result) {
                    let size = 0;
                    // For every product in user's cart
                    for (i = 0; i < result.length; i++) {
                        // Raise cart's size by product's quantity
                        size += result[i].productQuantity;
                    }

                    // Send "Accepted" response status code
                    res.status(200);
                    // Send cart size
                    res.send(JSON.stringify({ "size": size }));
                });
            } else {
                // Else, send "Unauthorized" response status code
                res.status(401);
                res.send(JSON.stringify({}));
            }
        })
    } catch {
        // If there is internal server error, send response status code
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
        query = `SELECT * FROM WikiShop.Logins WHERE username=?`;
        database.query(query, [usernameSubmitted], function (error, result) {
            if ((result.length != 0) && (result[0].sessionID == sessionIdSubmitted)) {
                // Get user's cart
                query = `SELECT * FROM WikiShop.Cart WHERE username=?`;
                database.query(query, [usernameSubmitted], function (error, result) {
                    let cartItems = [];
                    let totalCost = 0;

                    // For every product in user's cart
                    for (i = 0; i < result.length; i++) {
                        // Add it in the cart contents
                        cartItems.push({ "title": result[i].productTitle, "cost": result[i].productPrice, "quantity": result[i].productQuantity });

                        // Increase total cost
                        totalCost += (result[i].productPrice * result[i].productQuantity);
                    }

                    // Send "Accepted" response status code
                    res.status(200);
                    // Send response
                    res.send(JSON.stringify({ "cartItems": cartItems, "totalCost": totalCost }));
                });
            } else {
                // Else, send "Unauthorized" response status code
                res.status(401);
                res.send(JSON.stringify({}));
            }
        })
    } catch {
        // If there is internal server error, send "Not Implemented" response status code
        res.status(501);
        res.send();
    }
});