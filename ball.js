/*
 The ball class is created here. It is the player-controlled character. 
 The player has to use it to catch stars and avoid obstacles. 
 */

class Ball {
    constructor(x, y, radius) {
        var options = {
            isStatic: false,
            'restitution': 0.3,
            'friction': 0.8,
            'density': 1.2
        }
        this.body = Bodies.circle(x, y, radius, options);
        this.radius = radius;

        World.add(world, this.body);
    }
    display() {
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        ellipseMode(RADIUS);
        fill("pink");
        ellipse(0, 0, this.radius, this.radius);
        pop();
    }
};
