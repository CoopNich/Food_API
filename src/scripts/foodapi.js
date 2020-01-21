

const foodFactory = (food) => {
    return `
 <div>
    <h2>${food.name}</h2>
    <h4>${food.ethnicity}</h4>
    <h5>${food.category}</h4>
    <p>${food.ingredients}</p>
</div>
`
}

const foodContainer = document.querySelector(".foodList")

const addFoodToDom = (foodHTML) => {
    foodContainer.innerHTML += foodHTML
}

fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })