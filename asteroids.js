let canvas;
let ctx; //context?? I think that is what that stands for
let canvasWidth = 1400; //height and width are arbitrary for this.
let canvasHeight = 1000;
let ship;
let keys = []; //to hold multiple keystrokes you need to value them as an array;
let bullets = [];
let asteroids = [];

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ship = new Ship();

    for (let i = 0; i < 8; i++) {
        asteroids.push(new Asteroid());
    }

    document.body.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
        if (e.keyCode === 32) {
            bullets.push(new Bullet(ship.angle));
        }
    });
    //this is feeding key presses and releases into the keys array
    Render(); //calling the Render Function notice CapitalIZED
}
class Ship {
    constructor() {
        this.visible = true;
        this.x = canvasWidth / 2; //center
        this.y = canvasHeight / 2; //center
        this.movingForward = false; //start setting is NOT moving
        this.speed = 0.1; //this is ramp up speed per keydown
        this.velX = 0; //origin speed
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15;
        this.angle = 0; //looking WEST or Zero on a protractor
        this.strokeColor = 'white';
        this.noseX = canvasWidth / 2 + 15; // starting value of nose of ship
        this.noseY = canvasHeight / 2; //becasue of the angle we are pointing we start 
        //at the exact center of the height

    }
    Rotate(dir) {
        this.angle += this.rotateSpeed * dir;
    }
    Update() {
            let radians = this.angle / Math.PI * 180;
            //old x + cos(radians) * distance
            //old y + sin(radians) * distance
            if (this.movingForward) {
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
        this.noseX = this.x - this.radius * Math.cos(radians);
        this.noseY = this.y - this.radius * Math.sin(radians);
        for (let i = 0; i < 3; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath(); //this is the last let of the triangle
        ctx.stroke(); //makes the lines white


    }
}

class Bullet {
    constructor(angle) {
        this.visible = true;
        this.x = ship.noseX;
        this.y = ship.noseY;
        this.angle = angle;
        this.height = 4; //bullets will be small squares
        this.width = 4;
        this.speed = 5; //bullets move 5x faster than ship max speed
        this.velX = 0; //but they start at 0 velocity
        this.velY = 0;
    }
    Update() {
        var radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
        //notice that bullets shot off the side of the screen
        //will NOT show up on the other side - they vanish!
    }
    Draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }
}
class Asteroid {
    constructor(x, y) {
        this.visible = true;
        this.x = Math.floor(Math.random() * canvasWidth);
        this.y = Math.floor(Math.random() * canvasHeight);
        //we have to multiply the random number by the canvas sizes to make sure 
        //they show up in the canvas an not off screen
        this.speed = 1;
        this.radius = 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = "white";
    }
    Update() {
        var radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
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
    }
    Draw() {
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 6);
        var radians = this.angle / Math.PI * 180;
        for (let i = 0; i < 6; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
}


function Render() {
    //is the ship moving forward? Is player pressing the 'W' key?
    ship.movingForward = (keys[87]);
    if (keys[68]) { //'D' key value
        ship.Rotate(1);
    }
    if (keys[65]) { //'A' key value
        ship.Rotate(-1);
    }
    //update the screen by clearing current rectangle and draw new stuff
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ship.Update(); //this updates the data on the ship
    ship.Draw(); //this draws the ship in a brand new place
    if (bullets.length != 0) { //if there is anything in the bullets array...
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].Update(); //...we need to update...
            bullets[i].Draw(); //...and then draw the bullets
        }
    }
    if (asteroids.length != 0) { //if there is anything in the bullets array...
        for (let j = 0; j < bullets.length; j++) {
            asteroids[j].Update(); //...we need to update...
            asteroids[j].Draw(); //...and then draw the bullets
        }
    }
    requestAnimationFrame(Render);
}