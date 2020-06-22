const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-again-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')

const figureParts = document.querySelectorAll('.figure-part')

// make this a fetch request as next step
const words = ['application', 'programming', 'interface', 'panda']

// get random word from the words array
let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = []
const wrongLetters = []

// show the hidden word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
  // split into array
  .split('')
  // map through each letter to see if it is included in the correct letters array, if it is – show letter, if not, leave blank
  .map(letter => `
  <span class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
  </span>
  `).join('')}
  `;
  // show characters in word on the same line – replace new line \n with a empty string
  const innerWord = wordEl.innerText.replace(/\n/g, '')

  if (innerWord == selectedWord) {
    finalMessage.innerText = '🎉 Congratulations! You won! 🎉'
    popup.style.display = 'flex'
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `
  // display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length


    if (index < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  })

  // check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'You lost 🤬'
    popup.style.display = 'flex'
  }
}

// show notification – turn on class 'show', and remove after 2 secs
function showNotification() {
  notification.classList.add('show')
  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

// keydown letter press
window.addEventListener('keydown', e => {
  // letters a-z run 65-90 as keycodes
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key
    if (selectedWord.includes(letter)) {
      // if letter IS NOT ALREADY IN correctLetters – push the letter
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)

        displayWord()
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)

        updateWrongLettersEl()
      } else {
        showNotification()
      }
    }
  }
})

// restart game and play again
playAgainBtn.addEventListener('click', () => {
  // empty arrays
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = words[Math.floor(Math.random() * words.length)]
  displayWord()
  updateWrongLettersEl()
  popup.style.display = 'none'
})

displayWord()