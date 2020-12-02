var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext("2d");

// c.fillStyle = "rgba(255,0,0,0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0,255,0,0.5)";
// c.fillRect(200, 200, 100, 100);
// c.fillStyle = "rgba(0,0,255,0.5)";
// c.fillRect(300, 300, 100, 100);

// //line

// c.beginPath();
// c.moveTo(500, 100);
// c.lineTo(700, 500);
// c.lineTo(400, 600);
// c.strokeStyle = "red";
// c.stroke();

// for (let i = 0; i < 100; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   var r = () => Math.random() * 256;

//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2);
//   c.strokeStyle = `rgb(${r()}, ${r()}, ${r()})`;
//   c.stroke();
// }

//circle //arc

var mouse = {
  x: undefined,
  y: undefined,
};

var maxRadius = 40;
// var minRadius = 2;

var colorArray = ["#3E38F2", "#07038C", "#0439D9", "#056CF2", "#8000FF"];

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArr = [];

for (let i = 0; i < 800; i++) {
  var radius = Math.random() * 3 + 1;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 3;
  var dy = (Math.random() - 0.5) * 3;

  circleArr.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].update();
  }
}

animate();
