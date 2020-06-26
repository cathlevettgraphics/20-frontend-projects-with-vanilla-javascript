const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTransactions = [{
//     id: 1,
//     text: 'Flower',
//     amount: -20
//   },
//   {
//     id: 2,
//     text: 'Salary',
//     amount: 300
//   },
//   {
//     id: 3,
//     text: 'Book',
//     amount: -10
//   },
//   {
//     id: 3,
//     text: 'Camera',
//     amount: 150
//   }
// ]

// JSON.parse() turns a stringified array into an array
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

// add transaction
function addTransaction(e) {
  e.preventDefault()

  if (text.value.trim() === '' || amount.value.trim === '') {
    alert('please add text and amount')
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      // parse value as a number with + (same as parse int)
      amount: +amount.value
    }
    transactions.push(transaction)
    addTranasctionDOM(transaction)
    updateValues()
    updateLocalStorage()
    text.value = ''
    amount.value = ''
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000)
}


// add transactions to the DOM list
function addTranasctionDOM(transaction) {
  // get plus or minus sign
  const sign = transaction.amount < 0 ? '-' : '+'

  // create list element in DOM
  const item = document.createElement('li')

  // add a class to the item based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  // create the inner HTML
  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
  `

  // append the list item to the list in the DOM
  list.appendChild(item)

}

// Update the balance income and expense
function updateValues() {

  // get all the amounts 
  const amounts = transactions.map(item => item.amount)
  console.log(amounts)
  // get total amount
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

  // filter income or expense and total each
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  const expense = (amounts
      .filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2)
  console.log(income, expense);

  balance.innerText = `£${total}`
  money_plus.innerText = `£${income}`
  money_minus.innerText = `£${expense}`
}

// remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id)

  updateLocalStorage()

  init()
}

// update locat storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

// init app
function init() {
  list.innerHTML = ''
  // loop over all items in the dummy array and add to the DOM
  transactions.forEach(addTranasctionDOM)
  updateValues()
}

init()


// event listeners
form.addEventListener('submit', addTransaction)