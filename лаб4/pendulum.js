let canvas = document.getElementById('Pendulum');
let ctx = canvas.getContext('2d');
const X = canvas.width;
const Y = canvas.height;
const X0 = Math.floor(X/2);
const Y0 = Math.floor(Y/2);
const GRID = 100;
drawGrid(GRID);
const R = 20;
const SCALE = 10;
const g = 9.81;
let l, phi0, omega, t=0;
let raf;
/*
let buttonLen = document.getElementById('length');
let buttonAng = document.getElementById('angle');
*/
//==================================================
function drawGrid(GRID) {
    ctx.clearRect(0, 0, X, Y);
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 0.5;
    let x, y;
    for (x=0; x<X; x+=GRID) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, Y);
        ctx.closePath();
        ctx.stroke();
    }
    for (y=0; y<Y; y+=GRID) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(X, y);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(X0, 0);
    ctx.lineTo(X0, Y);
    ctx.closePath();
    ctx.stroke();
}
//===================================================
function drawPendulum(length,angle) {

    let x, y;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#00FF00";
    x = X0 + Math.floor( length*SCALE*Math.sin(angle));
    y = Math.floor(length*SCALE*Math.cos(angle));
    ctx.beginPath();
    ctx.moveTo(X0, 0);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, R, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
//==================================================

//omega = w
function oscilations() {
    let phi;
    drawGrid(GRID);
    t -= .05
    let beta =.001;
    let T = 2*Math.PI*Math.sqrt(l/g);
    let lambda = beta*T;
    phi =phi0*Math.exp(lambda*t)*Math.cos(omega*t); // формула затухання
    drawPendulum(l, phi);
    raf = window.requestAnimationFrame(oscilations);
}
//==================================================
function go() {
    l=Number(document.getElementById('Length').value);
    phi0=Number(document.getElementById('Angle').value)*Math.PI/180;
    omega = Math.sqrt(g/l);
    drawPendulum(l, phi0);
    document.getElementById('stopButton').disabled = false;
    document.getElementById('goButton').disabled = true;
    document.getElementById('beginButton').disabled = false;
    oscilations();
    document.getElementById('Angle').value = 15;
}
//===================================================
function stop() {
    window.cancelAnimationFrame(raf);
    document.getElementById('goButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
}
//==================================================
function begin() {
    window.cancelAnimationFrame(raf);
    drawGrid(GRID);
    drawPendulum(l, phi0);
    document.getElementById('goButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
}

