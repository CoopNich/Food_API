

const foodFactory = (food) => {
    return `
 <div>
    <h2>${food.name}</h2>
    <h4>${food.ethnicity}</h4>
    <h5>${food.category}</h4>
</div>
`
}

const foodContainer = document.querySelector(".foodList")

const addFoodToDom = (foodHTML) => {
    foodContainer.innerHTML += foodHTML
}

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
        })
    })