let canvas = document.querySelector("canvas");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: undefined,
    y: undefined,
}

let maxRadius = 40;
let minRadius = 2;

let myColors = [
    '#D6D58E',
    '#DBF227',
    '#9FC131',
    '#005C53'
];

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function randomXY(min,max){
    let position = Math.floor(Math.random() * (max - min * 2) + min);    
    position > 0 ? position = position : position = -position;

    return position;
}

function randomColor(){
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    let Color = `rgb(${red} ${green} ${blue})`;
    return Color;
}

let ctx = canvas.getContext("2d");

function Circle (x,y,radius,dx,dy,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.oR = radius;
    this.color = myColors[Math.floor(Math.random() * myColors.length)];

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
     };

     this.update = function(){

        
            if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        };

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy
        };

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 &&
             mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1;
            };
        }else if( this.radius > this.oR){
            this.radius -=1
        };

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
     };
}




// ctx.fillStyle = randomColor();

// ctx.fillRect(100, 100, 100, 100);

// ctx.fillStyle = randomColor();

// ctx.fillRect(1000, 100, 100, 100);

// ctx.fillStyle = randomColor();

// ctx.fillRect(570, 300, 100, 100);

// dibujando una linea
// Con este metedo le digo a canvas que va a empezar un unuevo "camino" o "linea" 
//el cual no esta ligado a ningun dibujado anterior
// ctx.beginPath();

//el metodo "moveTo" toma por argumento las coordenadas x e y desde la cual se va a 
//empezar a trazar la linea, es decir "me muevo" hacia esas coordenadas
// ctx.moveTo(50,300);

//el metodo "lineTo" recibe como argumento las coordenadas x e Y y trza una linea
//desde el punto inicial que marcamos anterior mente hacia las coordenadas nuevas
// ctx.lineTo(100, 350);
// ctx.lineTo(200, 350);
// ctx.lineTo(60, 200);

//el metodo "strokeStyle" nos permite personalizar el color del trazo
// ctx.strokeStyle = randomColor();

//el metodo "stroke" es lo que permite que la linea anterior se reenderize
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(400,150,30, 0, Math.PI * 2, false);
// ctx.strokeStyle = "violet";
// ctx.stroke();


// for(let i = 0; i< 50; i++){
//     ctx.beginPath();
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     ctx.strokeStyle = randomColor();
//     ctx.stroke();
// };


let radius = 30;
let bounce = 0;
let increaseSpeed = false;


let circles = [];
let amountOfCircles = 350;

function init (){

    circles = [];

    for (let j = 0; j < amountOfCircles; j++) {
        let dx = (Math.random() - 0.5); 
        let dy = (Math.random() - 0.5);
        let rx = randomXY(radius, (innerWidth - 30));
        let ry = randomXY(radius, (innerHeight - 30));
        let randomRadius = (Math.floor(Math.random() *(7 - 3 + 1) + 3));
        let rColor = "white"
        const circle = new Circle(rx,ry,randomRadius,dx,dy,rColor);
        circles.push(circle)

            };
        };



function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circles.length; i++) {
         circles[i].draw();
         circles[i].update();

    }
    
};

    //on bounce increase speed logic
    // if(bounce >= 2){
    //     bounce = 0;     
    //      if(dx > 0){
    //         dx++;
    //      }else{
    //         dx--
    //      };
    //      if(dy > 0){
    //         dy++
    //      }else{
    //         dy--
    //      };     
    // };

init();
animate();

    // let i = 1;
    // let j = 1;

    // ctx.beginPath();
    // let xx = 25 + i * 50; // x coordinate
    // let yy = 25 + i * 50; // y coordinate
    // let radius2 = 20; // Arc radius
    // let startAngle = i; // Starting point on circle
    // let endAngle = Math.PI + (Math.PI * i) / 2; // End point on circle
    // let counterclockwise = j % 2 === 1; // Draw counterclockwise

    // console.log(endAngle);
    // ctx.arc(xx, yy, radius2, startAngle, endAngle, true);

    //   ctx.stroke();

