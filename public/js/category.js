


function getProductID(){

    let search_field = new URLSearchParams(document.location.search);
    return search_field.get("categoryId");
}


let id = getProductID();


function getSubcategory(id){

    let kathgoria = id.slice(id.length -1);
    return kathgoria;
}

fetch("https://wiki-shop.onrender.com/categories/" + id + "/products")
    .then(response => {return response.json();})
    .then(data =>{
        console.log(data);
        let template = {};
    })