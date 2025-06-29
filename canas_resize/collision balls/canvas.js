let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball;
let walls;
let friction = 0.9;
let collision = [];
let balls = [];
let myColors = [
    '#D6D58E',
    '#DBF227',
    '#9FC131',
    '#005C53'
];

function reduceFriction (speed,fric){
    if(Math.abs(speed) > 0.2 && fric > 0.05){
       return fric - 0.03;
    }else{
        return 0; 
    };
};

    function checkCollision(ball , wall){
        let closestX = Math.max(wall.x, Math.min(ball.x, wall.x + wall.width));
        let closestY = Math.max(wall.y, Math.min(ball.y, wall.y + wall.heigh));        
        let dx = ball.x - closestX;
        let dy = ball.y - closestY;

        return (dx * dx + dy * dy) < (ball.radius * ball.radius);
    };


function randomColor(){
    let color = Math.floor(Math.random() * (balls.length - 0 ) + 0);
    return myColors[color];
}

function randomNumber (min,max){
    let number = Math.floor(Math.random() * (max - min) + min);    
    number > 0 ? number = number : number = -number;

    return number;
}


function Wall (x, y, width, heigh,id){
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigh = heigh;
    this.id = id;

    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this. y, this.width, this.heigh);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
};

function Ball (x,y,radius,dx,dy,color,fric,id){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxHeigh = y - radius;
    this.energy = fric; 
    this.color = color;
    this.id = id;
    

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();

     };

     this.resolveCollision = function (wall){
        const ballCenterX = this.x;
        const ballCenterY = this.y;
        const wallCenterX = wall.x + wall.width / 2;
        const wallCenterY = wall.y + wall.heigh / 2;

        const dx = ballCenterX - wallCenterX;
        const dy = ballCenterY - wallCenterY;
        
        const overlapX = wall.width / 2 + this.radius - Math.abs(dx);
        const overlapY = wall.heigh / 2 + this.radius - Math.abs(dy);

        if(overlapX < overlapY){
            this.dx = -this.dx * this.energy;
            this.energy = reduceFriction(this.ed, this.energy);
            if(dx > 0){
                this.x = wall.x + wall.width + this.radius;
            }else{
                this.x = wall.x - this.radius;
            }

        }else{
            this.dy = -this.dy * this.energy
            this.energy = reduceFriction(this.dy, this.energy);
            if(dy > 0 ){
                this.y = wall.y + wall.heigh + this.radius;
            }else{
                this.y =  wall.y - this.radius;
            }
        }
     }

     this.update = function(colision){

        if(this.x + this.radius > innerWidth ){
            this.x = innerWidth - this.radius - 1;
            this.dx = -this.dx * this.energy;
             this.energy = reduceFriction(this.dx, this.energy);
            console.log("the floor is increasing the friction but like crazy");
            
        }else if(this.x - this.radius < 0){
            this.dx = -this.dx * this.energy;
            this.energy = reduceFriction(this.dx, this.energy);
        }

        if(this.y + this.radius >= innerHeight){
                this.y = innerHeight - this.radius;
                this.dy = -this.dy * this.energy;
                Math.abs(this.dy) > 0.2 ? this.energy = reduceFriction(this.dy,this.energy) : this.dy = 0;
                if(this.maxHeigh > innerHeight - this.radius){
                    this.maxHeigh = innerHeight -this.radius;
                    this.dy = 0;
                }else{
                    this.maxHeigh +=  Math.floor(Math.abs(this.dy));
                }
            //    console.log(`posicion: x ${this.x} y ${this.y} ancho:${innerWidth} Velocidad: x - ${this.dx} y - ${this.dy} Friction: ${friction} Radius: ${this.radius}`)
            
        }else{
            this.dy += 1;
        }

        if(Math.abs(this.dx) > 0.1 && this.y == innerHeight - this.radius){
            this.energy = reduceFriction(this.dx , this.energy);
            this.dx = this.dx * this.energy;
        }else if(Math.abs(this.dx) <= 0.1){
            this.dx  = 0;
        }
        
        collision.forEach((wall, index) => {
            if(checkCollision(this, wall)){
                console.log(`colision con la pared: ${index}`);
                
                this.resolveCollision(wall);
            };
        });
        
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
     };
};


function init (){
     balls = [];
     walls = [];
     collision = [];
    for (let i = 0; i < 50; i++) {
            let dx = (Math.random() + 10); 
            let dy = (Math.random() + 0.9);
            let color = randomColor();
            let radius =  randomNumber(18,30);
            let ball = new Ball(randomNumber(30,innerWidth), randomNumber(30,innerHeight),radius,dx,dy, color, friction, i);
            balls.push(ball);
        };
    
    for (let i = 0; i < 20 ; i++) {
         let wall = new Wall(randomNumber(100,innerWidth - 100), randomNumber(100,innerHeight - 100), 30, 100, `w${i}`);
            collision.push({x: wall.x, y: wall.y, width: wall.width, heigh: wall.heigh, id: wall.id })
            walls.push(wall);
    }
        
    };





function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
    };
    for( let i = 0; i < walls.length; i++){
        walls[i].draw();
    }
};

    
init();
animate();