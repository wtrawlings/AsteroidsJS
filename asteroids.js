let canvas;
let ctx; //context?? I think that is what that stands for
let canvasWidth = 1400; //height and width are arbitrary for this.
let canvasHeight = 1000;
let keys = []; //to hold multiple keystrokes you need to value them as an array;

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
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
    Update() {
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
        //this is drawing the triangle that represents your ship
        //x and y are the center of a circle with radius of 15
        //we devide the circle up into a triangle (3 equidistant points)
    Draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath(); //start drawing the ship from here
        let vertAngle = ((Math.PI * 2) / 3);
        let radians = this.angle / Math.PI * 180;
        for (let i = 0; i < 3; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath(); //this is the last let of the triangle
        ctx.stroke(); //makes the lines white

    }
}

let ship = new Ship();


function Render() {
    //is the ship moving forward? Is player pressing the 'W' key?
    ship.movingForward = (keys[87]);
    if (keys[68]) { //'D' key value
        ship.Rotate(1);
    }
    if (keys[65]) { //'A' key value
        ship.Rotate(-1);
    }
    //update the screen by clearing current and draw new stuff
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ship.Update();
    ship.Draw();
    requestAnimationFrame(Render);
}