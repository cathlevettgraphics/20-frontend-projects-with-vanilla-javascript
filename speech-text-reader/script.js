// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const textArea = document.getElementById('text')
const readButton = document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')

const data = [{
    image: './img/angry.jpg',
    text: 'I\'m angry'
  },
  {
    image: './img/drink.jpg',
    text: 'I\'m thirsty'
  },
  {
    image: './img/food.jpg',
    text: 'I\'m hungry'
  },
  {
    image: './img/grandma.jpg',
    text: 'I want to go to grandmas'
  },
  {
    image: './img/happy.jpg',
    text: 'I\'m happy'
  },
  {
    image: './img/home.jpg',
    text: 'I want to go home'
  },
  {
    image: './img/hurt.jpg',
    text: 'I\'m hurt'
  },
  {
    image: './img/outside.jpg',
    text: 'I want to go outside'
  },
  {
    image: './img/sad.jpg',
    text: 'I\'m sad'
  },
  {
    image: './img/scared.jpg',
    text: 'I\'m scared'
  },
  {
    image: './img/school.jpg',
    text: 'I want to go to school'
  },
  {
    image: './img/tired.jpg',
    text: 'I\'m tired'
  }
]

// loop through the data and append each image and text to the DOM
data.forEach(createBox)

// create boxes in UI
function createBox(item, index) {
  const box = document.createElement('div')

  // destructure the object to get these items (same as data.image, data.text)
  const {
    image,
    text
  } = item

  box.classList.add('box')
  box.innerHTML = `
  <img src="${image}" alt="${text}">
  <p class="info">${text}</p>
  `
  // speak event
  box.addEventListener('click', () => {
    setTextMessage(text)
    speakText()

    // Add an active effect
    box.classList.add('active')
    // Remove the class of active after 800ms
    setTimeout(() => box.classList.remove('active'), 800)

  })

  main.appendChild(box)
}

// Init speech synth
const message = new SpeechSynthesisUtterance()

// store voices and populate the option box
let voices = []

function getVoices() {
  voices = speechSynthesis.getVoices()

  voices.forEach(voice => {
    const option = document.createElement('option')

    option.value = voice.name
    option.innerText = `${voice.name} ${voice.lang}`

    voicesSelect.appendChild(option)
  })
}

// Set text
function setTextMessage(text) {
  message.text = text
}

// Speek the text
function speakText() {
  speechSynthesis.speak(message)
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value)
}

// voices changes
speechSynthesis.addEventListener('voiceschanged', getVoices)

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show'))

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show'))

// Change voice
voicesSelect.addEventListener('change', setVoice)

// Read text from box
readButton.addEventListener('click', () => {
  setTextMessage(textArea.value)
  speakText()
})

getVoices()