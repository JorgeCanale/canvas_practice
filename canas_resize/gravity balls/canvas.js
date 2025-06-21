let canvas = document.querySelector("canvas");

let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let friction = 0.9;
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
}
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function randomColor(){
    let color = Math.floor(Math.random() * (balls.length - 0 ) + 0);
    return myColors[color];
}

function randomNumber (min,max){
    let number = Math.floor(Math.random() * (max - min) + min);    
    number > 0 ? number = number : number = -number;

    return number;
}


function Ball (x,y,radius,dx,dy,color,fric){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxHeigh = y - radius;
    this.energy = fric; 
    this.color = color;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        
     };

     this.update = function(){

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
        
        
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
     };
}

let balls = [];
let ball;

function init (){
     balls = [];
    for (let i = 0; i < 50; i++) {
            let dx = (Math.random() + 10); 
            let dy = (Math.random() + 0.9);
            let color = randomColor();
            let radius =  randomNumber(18,30);
            let ball = new Ball(randomNumber(30,innerWidth), randomNumber(30,innerHeight),radius,dx,dy, color, friction);
            balls.push(ball);
        }; 

            // let dx = (Math.random() + 3); 
            // let dy = (Math.random() + 0.9);
            // let color = randomColor();
            // let radius =  randomNumber(18,30);
            // ball = new Ball(randomNumber(30,innerWidth), randomNumber(30,innerHeight),radius,dx,dy, color, friction);
    }



function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw()
        balls[i].update()
    }
    // ball.draw();
    // ball.update();
};

    
init();
animate();