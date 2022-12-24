


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
                <div class="{{subcategory_id}}">
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
               </div>
            {{/each}}`);
    
    
            let content = template.templateFunction(data);
            let products = document.getElementById("myProducts");
            let teliko = products;

            teliko.innerHTML += content;
           
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
                    <input type="radio" id="All" name="subcategory-button" class="ypokathgories" value="0" onclick="ShowHideDiv()">
                    <label for="0">All</label>
                    {{#each this}}
                        <div class="koumpia">
                            <input type="radio" id="{{title}}" name="subcategory-button" class="ypokathgories" value="{{title}}" onclick="ShowHideDiv()">
                            <label for="{{id}}">{{title}}</label>
                        </div>
                    {{/each}}
            </aside>`);
    
    
            let content = template.templateFunction(data);
            let epiloges = document.getElementById("mySubcategories");
            epiloges.innerHTML += content;
    })
    .catch(error => console.log(error));

   
    function ShowHideDiv() {
        var chk0 = document.getElementById("All");
        var chk1 = document.getElementById("Hoodie");
        var chk2 = document.getElementById("Shirt");
        var chk3 = document.getElementById("Shocks");
        var chk4 = document.getElementById("T-Shirt");
        var chk5 = document.getElementById("DrinkWear");
        var chk6 = document.getElementById("Pens");
        var chk7 = document.getElementById("Stickers");   
        var chk8 = document.getElementById("Water Bottle");
        var chk9 = document.getElementById("Games");
        var chk10 = document.getElementById("Onesies");
        
        var showHoodie = document.getElementsByClassName("1");
        var showShirt = document.getElementsByClassName("2");
        var showSocks = document.getElementsByClassName("3");
        var showTshirt = document.getElementsByClassName("4");
     
        var showDrinkWear = document.getElementsByClassName("5");
        var showPens = document.getElementsByClassName("6");
        var showStickers = document.getElementsByClassName("7");
        var showWaterBottle = document.getElementsByClassName("8");
      
        var showGames = document.getElementsByClassName("9");
        var showOnesies  = document.getElementsByClassName("10");
        

       

        

        if(id == 1){
            if(chk0.checked){
                for(let i=0; i < showHoodie.length ; i++){
                    showHoodie[i].style.display = "block";
                }
                for(let i=0; i < showShirt.length ; i++){
                    showShirt[i].style.display = "block";
                }
                for(let i=0; i < showTshirt.length ; i++){
                    showTshirt[i].style.display = "block";
                }
    
                showSocks[0].style.display = "block";
    
                for(let i=0; i < showDrinkWear.length ; i++){
                    showDrinkWear[i].style.display = "block";
                }
                for(let i=0; i < showPens.length ; i++){
                    showPens[i].style.display = "block";
                }
                for(let i=0; i < showStickers.length ; i++){
                    showStickers[i].style.display = "block";
                }
                for(let i=0; i < showWaterBottle.length ; i++){
                    showWaterBottle[i].style.display = "block";
                }
                for(let i=0; i < showGames.length ; i++){
                    showGames[i].style.display = "block";
                }
                for(let i=0; i < showOnesies.length ; i++){
                    showOnesies[i].style.display = "block";
                }
    
            }
            else if(chk1.checked){
                for(let i=0; i < showHoodie.length ; i++){
                    showHoodie[i].style.display = "block";
                }
                for(let i=0; i < showShirt.length ; i++){
                    showShirt[i].style.display = "none";
                }
                for(let i=0; i < showTshirt.length ; i++){
                    showTshirt[i].style.display = "none";
                }
                showSocks[0].style.display = "none";
            }
            else if(chk2.checked){
                for(let i=0; i < showShirt.length ; i++){
                    showShirt[i].style.display = "block";
                }
                for(let i=0; i < showHoodie.length ; i++){
                    showHoodie[i].style.display = "none";
                }
                showSocks[0].style.display = "none";
                for(let i=0; i < showTshirt.length ; i++){
                    showTshirt[i].style.display = "none";
                }
            }
            else if(chk3.checked){

                showSocks[0].style.display = "block";
                for(let i=0; i < showHoodie.length ; i++){
                    showHoodie[i].style.display = "none";
                }
                for(let i=0; i < showShirt.length ; i++){
                    showShirt[i].style.display = "none";
                }
                for(let i=0; i < showTshirt.length ; i++){
                    showTshirt[i].style.display = "none";
                }

            }
            else if(chk4.checked){

                for(let i=0; i < showTshirt.length ; i++){
                    showTshirt[i].style.display = "block";
                }
                for(let i=0; i < showHoodie.length ; i++){
                    showHoodie[i].style.display = "none";
                }
                for(let i=0; i < showShirt.length ; i++){
                    showShirt[i].style.display = "none";
                }
                showSocks[0].style.display = "none";

            }
        }

        if(id == 2){
            if(chk0.checked){

                for(let i=0; i < showDrinkWear.length ; i++){
                    showDrinkWear[i].style.display = "block";
                }
                for(let i=0; i < showPens.length ; i++){
                    showPens[i].style.display = "block";
                }
                for(let i=0; i < showStickers.length ; i++){
                    showStickers[i].style.display = "block";
                }
                for(let i=0; i < showWaterBottle.length ; i++){
                    showWaterBottle[i].style.display = "block";
                }
                
            }
            if(chk5.checked){

                for(let i=0; i < showDrinkWear.length ; i++){
                    showDrinkWear[i].style.display = "block";
                }
                for(let i=0; i < showPens.length ; i++){
                    showPens[i].style.display = "none";
                }
                for(let i=0; i < showStickers.length ; i++){
                    showStickers[i].style.display = "none";
                }
                for(let i=0; i < showWaterBottle.length ; i++){
                    showWaterBottle[i].style.display = "none";
                }
                
            }
            if(chk6.checked){

                for(let i=0; i < showDrinkWear.length ; i++){
                    showDrinkWear[i].style.display = "none";
                }
                for(let i=0; i < showPens.length ; i++){
                    showPens[i].style.display = "block";
                }
                for(let i=0; i < showStickers.length ; i++){
                    showStickers[i].style.display = "none";
                }
                for(let i=0; i < showWaterBottle.length ; i++){
                    showWaterBottle[i].style.display = "none";
                }
            }
            if(chk7.checked){

                for(let i=0; i < showDrinkWear.length ; i++){
                    showDrinkWear[i].style.display = "none";
                }
                for(let i=0; i < showPens.length ; i++){
                    showPens[i].style.display = "none";
                }
                for(let i=0; i < showStickers.length ; i++){
                    showStickers[i].style.display = "block";
                }
                for(let i=0; i < showWaterBottle.length ; i++){
                    showWaterBottle[i].style.display = "none";
                }
            }
            if(chk8.checked){

                for(let i=0; i < showDrinkWear.length ; i++){
                    showDrinkWear[i].style.display = "none";
                }
                for(let i=0; i < showPens.length ; i++){
                    showPens[i].style.display = "none";
                }
                for(let i=0; i < showStickers.length ; i++){
                    showStickers[i].style.display = "none";
                }
                for(let i=0; i < showWaterBottle.length ; i++){
                    showWaterBottle[i].style.display = "block";
                }
            }
        }    
        
        if(id == 3){

            if(chk0.checked){

                for(let i=0; i < showGames.length ; i++){
                    showGames[i].style.display = "block";
                }
                for(let i=0; i < showOnesies.length ; i++){
                    showOnesies[i].style.display = "block";
                }
               
                
            }
            else if(chk9.checked){
                for(let i=0; i < showGames.length ; i++){   
                    showGames[i].style.display = "block";
                }
                for(let i=0; i < showOnesies.length ; i++){
                    showOnesies[i].style.display = "none";
                }

            }
            else if(chk10.checked){
                for(let i=0; i < showGames.length ; i++){
                    showGames[i].style.display = "none";
                }
                for(let i=0; i < showOnesies.length ; i++){
                    showOnesies[i].style.display = "block";
                }
            }


        }
    }
