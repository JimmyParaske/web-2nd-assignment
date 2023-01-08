module.exports = class Product {
    constructor(username, id, title, cost, quantity){
        this.username = username;
        this.id = id;
        this.title = title;
        this.cost = cost;
        this.quantity = quantity;
    }

    // Getters
    getUsername() {
        return this.username;
    }

    getId(){
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getCost() {
        return this.cost;
    }

    getQuantity() {
        return this.quantity;
    }

    // Setters
    addQuantity() {
        this.quantity += 1;
    }
}