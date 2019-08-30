let canvas;
let ctx; //context?? I think that is what that stands for
let canvasWidth = 1400; //height and width are arbitrary for this.
let canvasHeight = 1000;
let keys = []; //to hold multiple keystrokes you need to value them as an array;

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas() {
    canvas = document.getElementById('my-canvas');
    ctx canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.body.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
    });
    //this is feeding key presses into key array and releases
    //key strokes as well
    Render(); //calling the Render Function notice CapitalIZED
}
class Ship {
    constructor() {
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.speed = 0.1; //this is ramp up speed per keydown
        this.velX = 0; //origin speed
        this.velY = 0;
        this.rotationSpeed = 0.001;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = 'white';

    }
    Rotate(dir) {
        this.angle += this.RotateSpeed * dir;
    }
    update() {
        let radians = this.angle / Math.PI * 180;
        //old x + Cos(radians) * Distance
        //old y + SIN(radians) * Distance
        if (movingForward) {
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }
        //these are reset position if you go off the screen
        if (this.x < this.radius) {
            this.x = canvas.width;
        }
        if (this.x > this.width) {
            this.x = this.radius;
        }
        if (this.y < this.radius) {
            this.y = canvas.height;
        }
        if (this.y > this.height) {
            this.y = canvas.radius
        }
        this.velX *= 0.99; //this will slow down the ship
        this.velY *= 0.99; //this will slow down the ship

        this.x -= this.velX;
        this.y -= this.velY;

    }
}

let ship = new Ship();


function Render() {

}