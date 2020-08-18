/*
  The star class is created here. 
  When the star speed increases on the ground, it fades. 
  Then the score increases. 
 */

class Star {
    constructor(x, y, width, height) {
        var options = {
            isStatic: false,
            'restitution': 0.8
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        this.image = loadImage("images/newstar.jpg");
        this.Visiblity = 255;

        World.add(world, this.body);
    }
    points() {
        if (this.Visiblity < 0 && this.Visiblity > -100) {
            score++; 
        }
    }
    display() {
        var pos = this.body.position;
        if (this.body.speed < 6 && pos.y < 640) {
            push();
            translate(pos.x, pos.y);
            imageMode(CENTER);
            image(this.image, 0, 0, this.width, this.height);
            pop();
        }
        if (this.body.speed > 6 && pos.y > 640){
            World.remove(world, this.body);
            push();
            this.Visiblity = this.Visiblity - 5;
            tint(255, this.Visiblity);
            imageMode(CENTER);
            image(this.image, this.body.position.x, this.body.position.y, 40, 40);
            pop();
        }
    }
};