/*
 The obstacle class is created here. When the speed increases, the obstacle fades away. 
 Then the score decreases. 
 */

class Obstacle {
    constructor(x, y, width, height) {
        var options = {
            isStatic: false,
            'restitution': 0.8, 
            'density': 1.2,
            'friction': 0.3
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        this.image = loadImage("images/spike.jpg");
        this.Visiblity = 255;

        World.add(world, this.body);
    }
    score() {
        if (this.Visiblity < 0 && this.Visiblity > -100) {
            score -= 1;
        }
    }
    display() {
        var pos = this.body.position;
        if (this.body.speed < 4) {
            push();
            translate(pos.x, pos.y);
            imageMode(CENTER);
            fill(255);
            image(this.image, 0, 0, this.width, this.height);
            pop();
        } else {
            World.remove(world, this.body);
            push();
            this.Visiblity = this.Visiblity - 5;
            tint(255, this.Visiblity);
            image(this.image, this.body.position.x, this.body.position.y, 40, 40);
            pop();
        }
    }
};