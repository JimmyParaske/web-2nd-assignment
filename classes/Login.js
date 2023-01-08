module.exports = class Login {
    constructor(username, sessionId) {
        this.username = username;
        this.sessionId = sessionId;
    }

    // Getters
    getUsername() {
        return this.username;
    }

    getSessionId() {
        return this.sessionId;
    }

    // Setters
    updateSessionId(sessionId) {
        this.sessionId = sessionId;
    }
}