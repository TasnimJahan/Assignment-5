document.getElementById("search").addEventListener("click", function () {
    const foodName = document.getElementById("foodName").value;
    searchByName(foodName);
});


// Searching food
function searchByName(nameOfFood) {
    if (nameOfFood.length === 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${nameOfFood}`)
            .then((response) => response.json())
            .then((data) => displayFood(data));
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfFood}`)
            .then((response) => response.json())
            .then((data) => displayFood(data));
    }

    // display food
    const displayFood = (foods) => {
        if (foods.meals === null) {
            document.getElementById("wrongValueDiv").style.display = "block";
            document.getElementById("ingredientsDiv").style.display = "none";
            document.getElementById("notMatched").addEventListener("click", function () {
                document.getElementById("wrongValueDiv").style.display = "none";
            })
        } else {
            const foodItemDiv = document.getElementById("foodItemDiv");

            foods.meals.forEach((food) => {
                const foodDiv = document.createElement("div");
                foodDiv.className = "itemOfFood";

                foodDiv.innerHTML = `
            <div class="col">
                <div onclick="displayIngredients('${food.idMeal}')" class="card h-100 box">
                    <img src=${food.strMealThumb} class="card-img-top food-img" alt="...">
                    <div class="card-body">
                         <h5 class="card-title title">${food.strMeal}</h5>
                    </div>
                </div>
            </div>
            `;
                foodItemDiv.appendChild(foodDiv);
            });
        }
    };
}

//ingredient corner
const displayIngredients = (id) => {
    document.getElementById("ingredientsDiv").style.display = "block";
    document.getElementById("wrongValueDiv").style.display = "none";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => displayIngredientsFood(data.meals[0]));
}

// displaying ingredients
const displayIngredientsFood = (foodId) => {
    for (let i = 1; i <= 20; i++) {
        const ingredientItem = foodId['strIngredient' + i];
        if (ingredientItem === null || ingredientItem === "") {
            break;
        }
        const listOfIngredients = document.getElementById("listOfIngredients");
        const p = document.createElement("p");

        listOfIngredients.appendChild(p);
        const span1 = document.createElement("span");
        span1.innerHTML = `<i class="fas fa-check-square"></i>`;
        const span2 = document.createElement("span");
        span2.innerText = ingredientItem;
        // p.innerText = ingredientItem;
        p.appendChild(span1);
        p.appendChild(span2);
    }

    // ingredient image and title
    const ingredientImage = document.getElementById("ingredientImage");
    ingredientImage.src = foodId.strMealThumb;
    const ingredientTitle = document.getElementById("ingredientTitle");
    ingredientTitle.innerText = foodId.strMeal;
}