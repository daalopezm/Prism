var slider = document.getElementById("myRange");
var output = document.getElementById("angulo");

var angle = slider.value;
output.innerHTML = angle; // Display the default slider value


// Position of the incidence center
let xIncidenceCenter = 400;
let yIncidenceCenter = 400;
let xExpectedIncidenceCenter = 400;
let yExpectedIncidenceCenter = 500;

// shape of the triangle
let side = 200;
let point1x = xExpectedIncidenceCenter;
let point1y = yExpectedIncidenceCenter-side*Math.tan(Math.PI/4)/2;

let point2x = xExpectedIncidenceCenter-side/2;
let point2y = yExpectedIncidenceCenter;

let point3x = xExpectedIncidenceCenter+side/2;
let point3y = yExpectedIncidenceCenter;

// Variables to compute the snell law
// Variables to calculate the intersection point
let m1 = (point1y-point2y)/(point1x-point2x);
let b1 = point1y-m1*point1x;

const sectionVerPrisma = document.getElementById('ver-prisma')
const sectionDibujo = document.getElementById('dibujo')

//Laser
function drawLaser(xcoordinate, ycoordinate){
    let laser = dibujo.getContext("2d");
    laser.fillStyle = "#a76bff";
    laser.beginPath();
    laser.arc(xcoordinate, ycoordinate, 8, 0, 2 * Math.PI);
    laser.closePath();
    laser.fill();
}

function moveLaser(angle){
    let xcoordinate = 400*Math.cos(angle*Math.PI/180+Math.PI/2)+xExpectedIncidenceCenter;
    let ycoordinate = -400*Math.sin(angle*Math.PI/180+Math.PI/2)+yExpectedIncidenceCenter;
    drawLaser(xcoordinate, ycoordinate);
    let m2 = (yExpectedIncidenceCenter - ycoordinate)/(xExpectedIncidenceCenter - xcoordinate);
    let b2 = yExpectedIncidenceCenter - m2*xExpectedIncidenceCenter;
    let xcorte = (b2-b1)/(m1-m2);
    let ycorte = m2*xcorte+b2; 
    let longitud = Math.hypot((xcorte-xcoordinate),(ycorte-ycoordinate));


    drawRay(-angle, xcoordinate, ycoordinate, longitud);
}

//Photodiode

function drawPhotodiode(xcoordinate, ycoordinate){
    let photodiode = dibujo.getContext("2d");
    photodiode.fillStyle = "#CDB4DB";
    photodiode.beginPath();
    photodiode.arc(xcoordinate, ycoordinate, 8, 0, 2 * Math.PI);
    photodiode.closePath();
    photodiode.fill();
}

function movePhotodiode(angle){
    let xcoordinate = -400*Math.cos(angle*Math.PI/180+Math.PI/2)+xExpectedIncidenceCenter;
    let ycoordinate = -400*Math.sin(angle*Math.PI/180+Math.PI/2)+yExpectedIncidenceCenter;
    drawPhotodiode(xcoordinate, ycoordinate);
    drawRay(angle, xcoordinate, ycoordinate, 400);
}


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    angle = this.value;
    dibujo.getContext("2d").clearRect(0,0,dibujo.width,dibujo.height);
    moveLaser(angle);
    movePhotodiode(angle);
    drawPrisma();
}

// Prisma
let prisma = dibujo.getContext("2d")

function drawPrisma() {
    if (dibujo.getContext) {
        const prisma = dibujo.getContext('2d');
        prisma.fillStyle = "rgba(189, 224, 254,0.5)";
        prisma.beginPath();
        prisma.moveTo(xExpectedIncidenceCenter,yExpectedIncidenceCenter);
        prisma.lineTo(point3x,point3y);
        prisma.lineTo(point1x,point1y);
        prisma.lineTo(point2x,point2y);
        prisma.closePath();
        prisma.fill();
    }
}



function drawRay(angulo, startx, starty, len ){
    const ray = dibujo.getContext("2d");
    ray.beginPath();
    ray.moveTo(startx, starty);
    ray.lineTo(startx+len*Math.cos(angulo*Math.PI/180+Math.PI/2), starty+len*Math.sin(angulo*Math.PI/180+Math.PI/2));
    ray.stroke();

}

