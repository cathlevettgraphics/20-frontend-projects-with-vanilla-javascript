const musicContainer = document.getElementById('music-container')

const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('previous')
const nextBtn = document.getElementById('next')

const audio = document.getElementById('audio')
const progressBar = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')

// song titles
const songs = ['hey', 'summer', 'ukulele']

// keep track of song
let songIndex = 2

// initally load song details into DOM
loadSong(songs[songIndex])

// update song details
function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}

// play song
function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}

// pause song
function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  audio.pause()
}
// previous track
function previousSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}

// next track
function nextSong() {
  songIndex++

  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

// update progress bar
function updateProgress(e) {
  const {
    duration,
    currentTime
  } = e.srcElement
  // console.log(duration, currentTime);

  const progressPercent = (currentTime / duration) * 100
  progressBar.style.width = `${progressPercent}%`
}

// set progress bar on click
function setProgress(e) {
  const width = this.clientWidth
  // total width of progress bar is 216px
  // console.log(width);

  // offsetX gives us the position of our click
  const clickX = e.offsetX
  // console.log(clickX);

  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}


// event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})


// change song
prevBtn.addEventListener('click', previousSong)
nextBtn.addEventListener('click', nextSong)

// time / song update event
audio.addEventListener('timeupdate', updateProgress)

// click on progress bar
progressContainer.addEventListener('click', setProgress)

// song ends
audio.addEventListener('ended', nextSong)