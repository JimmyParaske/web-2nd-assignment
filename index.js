// Include ExpressJS
const express = require('express');
// Include UUID 
const { v4: uuidv4 } = require('uuid');
// Session
// const session = require('express-session');
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

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function (err) {
        console.log(err)
    })
})

// Login
const users = [
    { "username": "Alice", "password": "Alice" },
    { "username": "Peter", "password": "Peter" },
    { "username": "Harry", "password": "Harry" }
];

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/auth', async (req, res) => {
    try {
        // Get username & password from user
        let usernameSubmitted = req.body.username;
        let passwordSubmitted = req.body.password;

        // Find user in the database
        let userFound = users.find(user => user.username === usernameSubmitted);

        // If user authentication succeeded
        if ((userFound) && (userFound.password == passwordSubmitted)) {
            // req.session.loggedin = true;

            // Create unique session id
            const code = uuidv4();

            // Send response status code
            res.status(200);
            // Send unique session id
            res.send(JSON.stringify({ sessionId: code }));
        } else {
            // If user authentication failed
            // Send response status code
            res.status(401);
            res.send();
        }
    } catch {
        // If there is internal server error
        // Send response status code
        res.status(500);
        res.send();
    }
});

app.get('/category', function (req, res) {
    // If the user is loggedin
    // if (req.session.loggedin) {

    // } else {
    //     // Not logged in

    // }
    // res.end();
});