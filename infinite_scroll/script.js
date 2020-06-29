const postsContainer = document.getElementById('post-container')
const loading = document.querySelector('.loader')
const filter = document.getElementById('filter')

let limit = 3
let page = 1


// fetch posts from API
async function getPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
  const data = await res.json()
  return data
}

// show posts in the DOM
async function showPosts() {
  const posts = await getPosts()
  // console.log(posts);

  // loop through posts, create element and append to DOM
  posts.forEach(post => {
    const postEl = document.createElement('div')
    postEl.classList.add('post')
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
    <h2 class="post-title">${post.title}</h2>
    <p class="post-body">${post.body}</p>
    </div>
    `
    postsContainer.appendChild(postEl)
  });
}

// show loader and fetch more posts
function showLoading() {
  loading.classList.add('show')

  setTimeout(() => {
    loading.classList.remove('show')

    setTimeout(() => {
      page++
      showPosts()

    }, 300)
  }, 1000)
}

// filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase()
  const posts = document.querySelectorAll('.post')
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase()
    const body = post.querySelector('.post-body').innerText.toUpperCase()

    // if there is no index, ie it doesn't exist – it will return -1
    // so if the term is in the title or body, it will return > -1
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex'
    } else {
      post.style.display = 'none'
    }
  })
}

// show initial posts
showPosts()

// add scroll event listener to the window object
window.addEventListener('scroll', () => {
  // destructurning allows us to pull variables out of element
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // show loaded
    showLoading()
  }
})

// filter posts
filter.addEventListener('input', filterPosts)