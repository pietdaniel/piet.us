console.log("Welcome to piet.us!")
function ranrange(range,x) {
	x = typeof x !== 'undefined' ? x : 0;
	return Math.floor(range*Math.random())+1+x;
}

function square() {
	this.w = 10
	this.h = 10
	this.x = 0
	this.y = 0
	this.offset = 1
	this.getNext = function getNext() {
			var n = new square();
			var dir = ''
			switch (ranrange(4)) {
				case 1:
					n.x = this.x 
					n.y = this.y + this.h + this.offset
					return n;
				case 2:
					n.x = this.x 
					n.y = this.y - this.h - this.offset
					return n;
				case 3:
					n.x = this.x + this.w + this.offset
					n.y = this.y 
					return n;
				case 4:
					n.x = this.x - this.w - this.offset
					n.y = this.y 
					return n;
			}
	};
}

function animate() {
	this.square = new square();
	this.canvas = document.getElementById("canvas")
	this.canvas_delta_top  = 10;
	this.canvas_delta_left = 10;
	this.ctx = this.canvas.getContext("2d");
	this.squares = new Array();

	this.refresh = function refresh() {
		this.ctx.fillStyle="#ffd";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
	this.resize = function resize(sqrs) {
	  this.canvas.width = window.innerWidth - 20;
	  this.canvas.height = window.innerHeight - 20;
	  for (sq in this.squares) {
	  	this.drawSquare(this.squares[sq]);
	  }
	}
	this.draw = function draw() {
			this.drawSquare(this.square)
			this.squares.push(this.square);
			this.square = this.square.getNext();
	}
	this.drawSquare = function drawSquare(sq) {
		this.ctx.fillStyle="rgba(0,0,0,.2)";
		this.ctx.fillRect((this.canvas.width / 2) + sq.x,(this.canvas.height / 2) + sq.y,sq.h,sq.w);
	}
}

$(document).ready(function() {
	animate = new animate();
	window.addEventListener('resize', function(){animate.resize()}, false);
	animate.resize();
	function loop() {
		animate.draw();
		setTimeout(loop, 1);
	}loop();
});
