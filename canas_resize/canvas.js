let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// el metodo fillRect permite rellenar un rectangulo en el canvas tomando como parametros
//una posicion x, y, width, height. Empezando su coordenada desde la parte superior
//izquierda del canvas 

function randomXY(min,max){
    let position = Math.floor(Math.random() * (max - min + 1) + min);    
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
    this.dx =dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
     };

     this.update = function(){

        
            if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        };

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy
        };

            this.x += this.dx;
            this.y += this.dy;

            this.draw()
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
let dx = 5;
let dy = 5;
let bounce = 0;
let increaseSpeed = false;


let circles = [];


for (let j = 0; j < 100; j++) {
    let rx = randomXY(radius, (innerWidth - 30));
    let ry = randomXY(radius, (innerHeight - 30));
    let rColor = randomColor()
    const circle = new Circle(rx,ry,radius,dx,dy,rColor);
    circles.push(circle)
}

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

// animate();


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

