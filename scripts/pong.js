var player = 250
var computer = 250
var ball = [500, 300, Math.PI / (Math.random() * 3 + 3), 1]
var mainLoop

function main() {
	set()
	mainLoop = setInterval(gameTick, 5);
	document.getElementsByTagName("main")[0].addEventListener("mousemove", function(event){
		player = event.clientY - 50;
	})
}

function set() {
	var c = document.getElementById("pong");
	var ctx = c.getContext("2d");
	ctx.beginPath()
	ctx.moveTo(500,0);
	ctx.lineTo(500,600);
	ctx.strokeStyle = 'white';
	ctx.stroke();
	ctx.fillStyle = "white";
	ctx.fillRect(3 , player, 5, 100);
	ctx.fillRect(990, computer, 5, 100);
	ctx.fill()
	ctx.closePath()
}

function gameTick() {
	var c = document.getElementById("pong");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	set()

	ball[0] = ball[0] + ball[3] * Math.sin(ball[2]);
	ball[1] = ball[1] + ball[3] * Math.cos(ball[2]);

	ctx.beginPath();
	ctx.arc(ball[0], ball[1], 5, 0, Math.PI * 2);
	ctx.fillStyle = "white";
	ctx.stroke();
	ctx.fill();
	ctx.closePath();


	if (ball[0] < 14) {
		if (player <= ball[1] && player + 100 >= ball[1]) {
			ball[2] = ball[2] * -1;
			ball[3] = ball[3] + 0.2
		} else if (ball[0] < -5) {
			document.getElementById("p1").textContent = "Computer wins !"
			clearInterval(mainLoop);
		}
	} else if (ball[0] > 984) {
		if (computer <= ball[1] && computer + 100 >= ball[1]) {
			ball[2] = ball[2] * -1;
			ball[3] = ball[3] + 0.2
		} else if (ball[0] > 1005) {
			document.getElementById("p1").textContent = "Player wins !"
			clearInterval(mainLoop);
		}
	}

	if (ball[1] < 0 || ball[1] > 600) {
		ball[2] = Math.PI - ball[2]
	}

	if (ball[0] > 500) {
		if (computer + 48 > ball[1] && computer >= 0) computer = computer - 4;
		else if (computer + 52  < ball[1] && computer <= 500) computer = computer + 4;
	}
}


function computerUp() {
	if (computer >= 0) computer = computer - 10;
}

function computerDown() {
	if (computer <= 500) computer = computer + 10;
}
