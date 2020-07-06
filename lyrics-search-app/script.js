// https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search
const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')
const pagination = document.getElementById('more')


const apiURL = 'https://api.lyrics.ovh'

// search for a song or an artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`)
  const data = await res.json()
  showData(data)
}

// Display sond and artist in the DOM
function showData(data) {
  // create a loop and append to this string
  result.innerHTML = `
  <ul class="songs">
  ${data.data.map(song => `
  <li>
  <span><strong>${song.artist.name}</strong> – ${song.title}</span>
  <button class='btn' data-artist='${song.artist.name}' data-songtitle='${song.title}'>Get lyrics</button>
  </li>
  `).join('')}
  </ul>
  `

  if (data.prev || data.next) {
    more.innerHTML = `
    ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ``}
    ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ``}
    `
  } else {
    more.innerHTML = ''
  }
}

// get previous and next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
  const data = await res.json()
  showData(data)
}

// Get lyrics for song

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)
  const data = await res.json()


  const lyrics = data.lyrics.replace(/(\r\n)|\r|\n/g, '<br>')

  result.innerHTML = `<h2><strong>${artist}</strong> – ${songTitle}</h2>
  <span>${lyrics}</span>
  `

  more.innerHTML = ''
}



// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault()

  const searchTerm = search.value.trim()

  if (!searchTerm) {
    alert('please enter an artist or song')
  } else {
    searchSongs(searchTerm);
  }
})

// get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target
  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist')
    const songTitle = clickedEl.getAttribute('data-songTitle')

    getLyrics(artist, songTitle)
  }
})