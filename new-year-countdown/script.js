const days = document.getElementById('days')
const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const countdown = document.getElementById('countdown')
const year = document.getElementById('year')
const loading = document.getElementById('loading')

const currentYear = new Date().getFullYear()

const newYearTime = new Date(`January 01 ${currentYear + 1}`)

// Set background year
year.innerHTML = currentYear + 1

// Update countdown time
function updateCountdown() {
  const currentTime = new Date()
  const difference = newYearTime - currentTime

  // calculate days until 1 January
  // milliseconds > seconds > hours > days
  const d = Math.floor(difference / 1000 / 60 / 60 / 24)
  // use modulo to account for the hours already passed today
  const h = Math.floor(difference / 1000 / 60 / 60) % 24
  const m = Math.floor(difference / 1000 / 60) % 60
  const s = Math.floor(difference / 1000) % 60

  // Add values to DOM
  days.innerHTML = d
  hours.innerHTML = h < 10 ? `0${h}` : h
  minutes.innerHTML = m < 10 ? `0${m}` : m
  seconds.innerHTML = s < 10 ? `0${s}` : s
}

// Show spinner before countdown
setTimeout(() => {
  loading.remove()
  countdown.style.display = 'flex'
}, 1000)

// Update the countdown each second
setInterval(updateCountdown, 1000)