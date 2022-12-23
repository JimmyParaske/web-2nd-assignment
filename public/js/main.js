

// Put your client side JS code here
console.log('Hello world')


fetch("https://wiki-shop.onrender.com/categories")
    .then(response => {
        return response.json();
    })
    .then(data => {
        
        console.log(data);
        let template = {};

        template.templateFunction = Handlebars.compile(
        `{{#each this}}
            <div class='kathgoria'>
            <div class="fotografia">
                <a href="category.html">
                <img src="{{img_url}}">
                </a>
            </div>
            <div class="titlos">
                <h2>{{title}}</h2>
            </div>
            </div>
        {{/each}}`);


        let content = template.templateFunction(data);
        let main = document.getElementById("myData");
        main.innerHTML += content;
    })
    .catch(error => console.log(error));



function appendData(data){

    var rawTemplate = document.getElementById("categories").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var generatedHTML = compiledTemplate(data);

    var categoriesContainer = document.getElementById("myData");
    categoriesContainer.innerHTML = generatedHTML;
}