// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')

// 1 Create canvas context
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// Init score
let score = 0

const brickRowCount = 9
const brickColumnCount = 5

// Create ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
}

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
}

// Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
}

// Create bricks
const bricks = []
// create the nine vertical columns
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = []
  // Create the five rows within columns
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
    // Add new arrays to an object and include all original brickInfo
    bricks[i][j] = {
      x,
      y,
      ...brickInfo
    }
  }
}

console.log(bricks);

// Draw ball on canvas
function drawBall() {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

// Draw score on canvas
function drawScore() {
  ctx.font = '20px Arial'
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath()
      ctx.rect(brick.x, brick.y, brick.w, brick.h)
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'
      ctx.fill()
      ctx.closePath()
    })
  })
}

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx

  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w
  }
  if (paddle.x < 0) {
    paddle.x = 0
  }
}

// Move ball on canvas
function moveBall() {
  // Append the ball.direction x and y to starting x and y coordinates
  ball.x += ball.dx
  ball.y += ball.dy

  // Wall collision (x) left / right
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1 // the same as ball.dx = ball.dx * -1
  }

  // Wall collision (y) top / bottom
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1 // the same as ball.dx = ball.dx * -1
  }
  // console.log(ball.x, ball.y);

  //Paddle collision
  if (ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y) {
    ball.dy = -ball.speed
  }

  // Brick collision
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h) // bottom brick check 
        {
          ball.dy *= -1
          brick.visible = false

          increaseScore()
        }
      }
    })
  })

  // Hit bottom wall lose
  if (ball.y + ball.size > canvas.height) {
    showAllBricks()
    score = 0
  }
}

// Increase score
function increaseScore() {
  score++
  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks()
  }
}

// Make all bricks appear
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach(brick => {
      brick.visible = true
    })
  })
}



// Draw everything
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBall()
  drawPaddle()
  drawScore()
  drawBricks()
}

// Update canvas drawing and animation
function update() {
  movePaddle()
  moveBall()
  // Draw everything
  draw()

  requestAnimationFrame(update)
}

update()

//  Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed
  }
}

//  Keyup event
function keyup(e) {
  if (e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft') {
    paddle.dx = 0
  }
}


// Keyboard event handlers
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyup)

// Rules annd close event handlers
rulesBtn.addEventListener('click', () => {
  rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
  rules.classList.remove('show')
})