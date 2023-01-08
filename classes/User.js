module.exports = class User {
    constructor(username,password) {
        this.username = username;
        this.password = password;
    }

    // Getters
    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }
}