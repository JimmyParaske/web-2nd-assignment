


function getProductID(){

    let search_field = new URLSearchParams(document.location.search);
    return search_field.get("categoryID");
}


let id = getProductID();


function getSubcategory(id){

    let kathgoria = id.slice(id.length -1);
    return kathgoria;
}

let subCat = getSubcategory(id);
console.log(subCat);    

console.log(subCat);

fetch("https://wiki-shop.onrender.com/categories/" + id + "/products")
    .then(response => {return response.json();})
    .then(data =>{
        console.log(data);
        let template = {};


        template.templateFunction = Handlebars.compile(
        
            
            `{{#each this}} 
                    <div class='proion'>
                        <div class="title">
                            <h2>{{title}}</h2>
                        </div>

                        <div class="photo">  
                            <img src="{{image}} alt{{title}}">
                        </div>

                        <div class="perigrafh">
                            <h3>Description:</h3> 
                            <p>{{description}}</p>
                            <div class="prod">
                                <h5>product code:</h5>
                                <p class="kwdikos">{{id}}</p>
                            </div>
                        </div>

                        <div class="price">
                            <h3>Price:</h3>
                            <p>{{cost}}.99$</p>
                        </div>
                    </div>
                {{/each}}`);
    
    
            let content = template.templateFunction(data);
            let products = document.getElementById("myProducts");
            products.innerHTML += content;
    })
    .catch(error => console.log(error));
   




fetch("https://wiki-shop.onrender.com/categories/" + id + "/subcategories")
    .then(response => {return response.json();})
    .then(data =>{
        console.log(data);
        let template = {};


        template.templateFunction = Handlebars.compile(
            `<aside class='kathgories-proiontwn'>
               
                <h3>Choose subcategory:</h3>
                    <input type="radio" id="0" name="subcategory-button" class="ypokathgories" value="0">
                    <label for="0">All</label>
                    {{#each this}}
                        <div class="koumpia">
                            <input type="radio" id="{{id}}" name="subcategory-button" class="ypokathgories" value="{{title}}">
                            <label for="{{id}}">{{title}}</label>
                        </div>
                    {{/each}}
            </aside>`);
    
    
            let content = template.templateFunction(data);
            let products = document.getElementById("mySubcategories");
            products.innerHTML += content;
    })
    .catch(error => console.log(error));