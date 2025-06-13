let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// el metodo fillRect permite rellenar un rectangulo en el canvas tomando como parametros
//una posicion x, y, width, height. Empezando su coordenada desde la parte superior
//izquierda del canvas 

function randomColor(){
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    let Color = `rgb(${red} ${green} ${blue})`;
    return Color;
}

let ctx = canvas.getContext("2d");

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


ctx.beginPath();
ctx.arc(400,150,30, 0, Math.PI * 2, false);
ctx.strokeStyle = "violet";
ctx.stroke();

function randomXY(min,max){
    let position = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(position);
    
    position > 0 ? position = position : position = -position;

    return position;
}


let radius = 30;
let x = randomXY(radius, (innerWidth - 30));
let y = randomXY(radius, (innerHeight - 30));
let dx = 5;
let dy = 5;
let bounce = 0;
let increaseSpeed = false;

let color = randomColor();

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI * 2, false);

    ctx.strokeStyle = "blue";
    ctx.stroke();

    if(x + radius > innerWidth || x - radius < 0){
        dx = -dx;
        bounce++;
    };

    if(y + radius > innerHeight || y - radius < 0){
        dy = -dy
        bounce++;
    };

    if(bounce >= 2){
        bounce = 0;       
         if(dx > 0){
            dx++;
         }else{
            dx--
         };
         if(dy > 0){
            dy++
         }else{
            dy--
         };     
    }

    

    x += dx;
    y += dy;
};



 //animate();