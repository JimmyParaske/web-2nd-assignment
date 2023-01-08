fetch("https://wiki-shop.onrender.com/categories")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        let template = {};

        template.templateFunction = Handlebars.compile(
            `{{#each this}}
                <div class='category'>
                    <div class="image">
                        <a href="category.html?categoryID={{id}}">
                            <img src="{{img_url}} alt={{title}}">
                        </a>
                    </div>
                    <div class="title">
                        <h2>{{title}}</h2>
                    </div>
                </div>
            {{/each}}`
        );

        let content = template.templateFunction(data);
        let main = document.getElementById("categories");
        main.innerHTML += content;
    })
    .catch(error => console.log(error));

function appendData(data) {
    var rawTemplate = document.getElementById("categories").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var generatedHTML = compiledTemplate(data);

    var categoriesContainer = document.getElementById("myData");
    categoriesContainer.innerHTML = generatedHTML;
}