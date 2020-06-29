const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endGameEl = document.getElementById('end-game-container')
const settings = document.getElementById('settings')
const settingsBtn = document.getElementById('settings-btn')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

// list of words for game
// replace with wordnki API
// Your API Key is:  bbcm1hjch8ddr54aze029y1sv9al1gpgzih9kr1xepfr0w07i
// https://developer.wordnik.com/docs#/word
// https://developer.wordnik.com/gettingstarted

const words = ['sigh', 'tense', 'cat', 'dog', 'computer', 'ball', 'plane', 'warlike', 'juice', 'dependent', 'steer', 'silver', 'highfalutin', 'quince', 'tree', 'programmer', 'pandas', 'elephant', 'pies']

// init word
let randomWord

// init score
let score = 0

// init time in seconds
let time = 10

// init focus on text on start – this adds cursor to input box
text.focus()

// set difficulty to value in local storage or set to medium if not in local storage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

// set difficulty select value
difficultySelect.value = difficulty

// start counting down in 1second increments
const timeInterval = setInterval(updateTime, 1000)

// generate a random word from words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

// add generated word to DOM
function addWordToDOM() {
  randomWord = getRandomWord()
  word.innerHTML = randomWord
}
addWordToDOM()

// update score
function updateScore() {
  score++
  scoreEl.innerHTML = score
}

// update time
function updateTime() {
  time--
  timeEl.innerHTML = `${time}s`

  if (time === 0) {
    clearInterval(timeInterval)
    // end the game
    gameOver()
  }
}

// game over show end screen
function gameOver() {
  endGameEl.innerHTML = `
  <h1>Time ran out!</h1>
  <p>Your final score is ${score}</p>
  <button onclick="window.location.reload()">Replay</button>
  `
  endGameEl.style.display = 'flex'
}

// event listeners

// typing
text.addEventListener('input', e => {
  const insertedText = e.target.value

  if (insertedText === randomWord) {
    addWordToDOM()
    updateScore()

    // clear the input box
    e.target.value = ''

    // easy – add five seconds if answer is correct, med – add 3 secs, hard – add 2 secs

    if (difficulty === 'hard') {
      time += 2
    } else if (difficulty === 'medium') {
      time += 10
    } else {
      time += 5
    }
    updateTime()





  }
})

//settings button click to hide
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide')
})

// change the difficulty
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value
  // set local storage
  localStorage.setItem('difficulty', difficulty)
})