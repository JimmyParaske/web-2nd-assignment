

// Put your client side JS code here
console.log('Hello world')


fetch("https://wiki-shop.onrender.com/categories")
    .then(response => {
        return response.json();
    })
    .then(data => {
        
        console.log(data);
        appendData(data);
        


    })
    .catch(error => console.log(error));



function appendData(data){

    var rawTemplate = document.getElementById("categories").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var generatedHTML = compiledTemplate(data);

    var categoriesContainer = document.getElementById("myData");
    categoriesContainer.innerHTML = generatedHTML;
}