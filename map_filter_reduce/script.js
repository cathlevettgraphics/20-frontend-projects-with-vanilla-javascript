const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []

getRandomUser()
getRandomUser()
getRandomUser()

//fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()
  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser);
}

// Double everyone's money – MAP – returns new array
function doubleMoney() {
  data = data.map((user) => {
    return {
      ...user,
      money: user.money * 2
    };
  })
  updateDOM()
}

// sort users by richest – SORT – works in place
function sortByRichest() {
  data.sort((a, b) => b.money - a.money)
  updateDOM()
}

// show onlu people with $1m and above – FILTER – returns new array
function showMillionaires() {
  data = data.filter(user => user.money >= 1000000)
  updateDOM()
}

// Calculate the total wealth of all users – REDUCE
// create element and add to DOM
function calculateTotalWealth() {
  const total = data.reduce((acc, user) => (acc += user.money), 0)
  // console.log(formatMoney(total));
  const wealthElement = document.createElement('div')
  wealthElement.innerHTML = `<h3>Total wealth: <strong>${formatMoney(total)}</strong></h3>`
  main.appendChild(wealthElement)
}

// Add new object to the array
function addData(obj) {
  data.push(obj)
  updateDOM()
}


// update DOM
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
  // Loop through the data array and add to DOM
  providedData.forEach(item => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`
    main.appendChild(element)
  })
}

// format number as money
//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateTotalWealth)