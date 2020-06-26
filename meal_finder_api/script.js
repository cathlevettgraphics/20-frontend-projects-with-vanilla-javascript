const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultsHeading = document.getElementById('result-heading'),
  singleMealEl = document.getElementById('single-meal')


// search for a meal function and fetch from api
async function searchMeal(e) {
  e.preventDefault()

  // clear single meal
  singleMealEl.innerHTML = ''

  // get search term
  const searchTerm = search.value

  // check for empty
  if (searchTerm.trim()) {
    // fetch data from the api
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    const data = await res.json()
    console.log(data)
    resultsHeading.innerHTML = `<h2>Search results for ${searchTerm}:</h2>`

    if (data.meals === null) {
      resultsHeading.innerHTML = `<p>There are no search results, try again</p>`
    } else {
      mealsEl.innerHTML = data.meals.map(meal => `
      <div class="meal">
      <img src = "${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="meal-info" data-mealID=${meal.idMeal}>
      <h3>${meal.strMeal}</h3>
      </div>
      </div>
      `)
        .join('')
    }
    // clear search text
    search.value = ''
  } else {
    alert('please enter a search term')
  }
}

// fetch meal by ID
function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0]

      addMealToDOM(meal)
    })
}

// fetch random meal from API
function getRandomMeal(params) {
  // clear meals and headings
  mealsEl.innerHTML = ''
  resultsHeading.innerHTML = ''

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const mealRandom = data.meals[0]

      addMealToDOM(mealRandom)
    })

}

// add meal to DOM
function addMealToDOM(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} – 
      ${meal[`strMeasure${i}`]}`)
    } else {
      break
    }
  }

  singleMealEl.innerHTML = `
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
  <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strMeal}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
    ${ingredients.map(ingred => `<li>${ingred}</li>`).join('')}
  </ul>
  </div>
  </div>
  `
}



// event listeners
submit.addEventListener('submit', searchMeal)
random.addEventListener('click', getRandomMeal)

//
mealsEl.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info')
    } else {
      return false
    }
  })

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealID')
    getMealByID(mealID);
  }
})