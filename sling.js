/*
 The sling class is created here. 
 It creates a constraint between the ball and a point. 
 When the mouse is dragged and released, it releases from the constraint. 
 Pressing the space bar attaches it back to the constraint. 
 */

class Sling {
    constructor(bodyA, pointB) {
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.pointB = pointB;
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }
    fly() {
        this.sling.bodyA = null;
    }
    attach(body) {
        this.sling.bodyA = body;
    }
    display() {
        if (this.sling.bodyA) {
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            push();
            stroke(0);
            line(pointA.x, pointA.y, pointB.x, pointB.y);
            pop();
        }
    }
}