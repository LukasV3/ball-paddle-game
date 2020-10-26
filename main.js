const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const div = document.querySelector("div");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
let score = 0;

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1) + min);
  return num;
}

function Slider() {
  this.x = width / 2;
  this.y = height - 100;
  this.w = 100;
  this.h = 12;
  this.sx = this.x - this.w / 2;

  this.direction = undefined;
  this.speed = 4;

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37) {
      this.direction = "left";
    } else if (e.keyCode === 39) {
      this.direction = "right";
    }
  });

  this.show = function () {
    ctx.fillStyle = "white";
    ctx.fillRect(this.sx, this.y, this.w, this.h);
  };

  this.update = function () {
    if (this.direction === "left") {
      this.sx -= this.speed;
    }
    if (this.direction === "right") {
      this.sx += this.speed;
    }

    if (this.sx <= 0) {
      this.sx = 0;
    }
    if (this.sx + this.w >= width) {
      this.sx = width - this.w;
    }
  };
}
const slider = new Slider();

function Ball() {
  this.x = width / 2;
  this.y = height / 4;
  this.r = 10;
  this.velX = random(-3, 3);
  this.velY = -4;

  this.show = function () {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  };

  this.update = function () {
    if (this.x + this.r >= width) {
      this.velX = -this.velX;
    }
    if (this.x - this.r <= 0) {
      this.velX = -this.velX;
    }
    if (
      this.y + this.r >= slider.y &&
      this.x >= slider.sx &&
      this.x <= slider.sx + slider.w
    ) {
      score++;
      this.velY = -this.velY;
    }
    if (this.y - this.r <= 0) {
      this.velY = -this.velY;
    }
    if (this.y + this.r >= height) {
      this.velX = 0;
      this.velY = 0;
      slider.speed = 0;
    }

    this.x += this.velX;
    this.y -= this.velY;
  };
}
const ball = new Ball();

let frames = 0;

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  slider.show();
  slider.update();

  ball.show();
  ball.update();

  div.innerText = score;

  frames++;
  if (frames % 500 === 0) {
    if (ball.velX < 0) {
      ball.velX--;
    } else {
      ball.velX++;
    }
  }
  requestAnimationFrame(draw);
}

draw();
