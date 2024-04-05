# inf165-webdev-project

A basic structure for a project for the needs of assignment 2 of course: "**Web Application Technologies and Programming**"
<br>*Department of Computer Science, AUEB*
<br>
```bash
.
├── index.js
├── models
└── public
    ├── index.html
    ├── css
    |   └── style.css
    └── js
        └── main.js
```

The necessary dependencies are already listed in the package.json file. <br>
You can install the necessary dependencies using the command:
```
npm install
```


To test your application, you can start it with the following command:
```
node index.js
```

Of course, after each change in the server code, you will need to restart the application. For your convenience, you can start the application using the nodemon tool as follows:

```
nodemon index.js
```


Every time you change the server code, nodemon automatically restarts the server.

## Useful libraries

- [Handlebars](https://handlebarsjs.com/guide/):  a templating language that allows you to create dynamic HTML templates.
- [expressjs](https://expressjs.com/en/guide/routing.html): rapid web service implementation,
- [uuid](https://www.npmjs.com/package/uuid): generating unique identifiers,
- [nodemon](https://www.npmjs.com/package/nodemon): Tool for automatic restart of a Node.js application upon changes to its files.
