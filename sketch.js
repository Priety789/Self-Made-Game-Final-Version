/*
 The player controls a ball and has to use it to catch stars that increase the score. 
 If the player touches the obstacles, the score decreases. 
 The step is a platform that keeps the stars from touching the ground and disappearing. 
 The whole game finishes in two minutes. 
 */

var ground;
var ball;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var step;
var ballConstraint;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var score = 0;
var star = [];
var timer = 120;
var gameState = "play";
var sound;
var backgroundColor = "black";

function setup() {
    createCanvas(windowWidth, windowHeight);

	engine = Engine.create();
	world = engine.world;
    
    ground = Bodies.rectangle(750, 650, 1500, 40, { isStatic: true });
 	World.add(world, ground);
    
    ball = new Ball(200, 300, 20);

    ballConstraint = new Sling(ball.body, { x: 200, y: 300 });

    obstacle1 = new Obstacle(150, 620, 40, 40);
    obstacle2 = new Obstacle(350, 620, 40, 40);
    obstacle3 = new Obstacle(550, 620, 40, 40);
    obstacle4 = new Obstacle(950, 620, 40, 40);
    obstacle5 = new Obstacle(1150, 620, 40, 40);
    obstacle6 = new Obstacle(1350, 620, 40, 40);
    
    step = new Step(750, 590, 200, 100);

	Engine.run(engine);
}

function draw() {
    background(backgroundColor);

    if (touches.length > 0) {
        ballConstraint.fly();
        touches = [];
    }

    ball.display();

    fill("pink");
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, 1500, 40);

    obstacle1.score();
    obstacle2.score();
    obstacle3.score();
    obstacle4.score();
    obstacle5.score();
    obstacle6.score();

    obstacle1.display();
    obstacle2.display();
    obstacle3.display();
    obstacle4.display();
    obstacle5.display();
    obstacle6.display();

    step.display();

    ballConstraint.display();

    fill(255);
    textSize(20);

    if (gameState === "play") {
        text("Use the ball to catch the stars and increase your score!", width / 2 - 250, height / 2 - 360);
        text("Avoid the obstacles! They will decrease your score!", width / 2 - 230, height / 2 - 310);
        text("Use the mouse to direct the ball, and the space bar to try again!", width / 2 - 300, height / 2 - 260);
        text("You have two minutes! Go!", width / 2 - 150, height / 2 - 210);
        addStars();
        setTimer();
    }

    endGame();

    text("Score: " + score, 1350, 50);
    text("Timer: " + timer, 1350, 150);
}

function mouseDragged() {
    Matter.Body.setPosition(ball.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
    ballConstraint.fly();
    backgroundColor = color(random(0, 255), random(0, 255), random(0, 255));
}

function keyPressed() {
    if (keyCode === 32) {
        ballConstraint.attach(ball.body);
    }
}

function addStars() {
    if (frameCount % 80 === 0) {
        star.push(new Star(random(150, 1350), 470, 40, 40));
    }

    for (var i = 0; i < star.length; i++) {
        star[i].points();
        star[i].display();
    }
}

function setTimer() {
    if (frameCount % 30 === 0) {
        timer -= 1;
    }

    if (timer < 0) {
        timer = 0;
        gameState = "end";
    }
}

function endGame() {
    if (gameState === "end") {
        mouseDragged = null;
        mouseReleased = null;
        keyPressed = null;
        text("Game Over!", 700, 425);
    }
}