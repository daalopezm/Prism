var slider = document.getElementById("myRange");
var output = document.getElementById("angulo");
var incidenceAngle = document.getElementById("primeranguloincidencia");
var inputRefractiveIndexAir = document.getElementById("refractiveIndexAir1");
var inputRefractiveIndexPrism = document.getElementById("refractiveIndexPrism1");

var angle = slider.value;
output.innerHTML = angle; // Display the default slider value

var refractiveIndexAir = inputRefractiveIndexAir.value;
var refractiveIndexPrism = inputRefractiveIndexPrism.value;


// Position of the incidence center
let xIncidenceCenter = 400;
let yIncidenceCenter = 400;
let xExpectedIncidenceCenter = 400;
let yExpectedIncidenceCenter = 400;

// shape of the triangle
let side = 200;
let angleOfSides = Math.PI/4;
let point1x = xExpectedIncidenceCenter;
let point1y = yExpectedIncidenceCenter-side*Math.tan(angleOfSides)/2;

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

//Get refractive index values

function getRefractiveIndexAir(){
    refractiveIndexAir = inputRefractiveIndexAir.value;
}

function getRefractiveIndexPrism(){
    refractiveIndexPrism = inputRefractiveIndexPrism.value;
}

//Laser
let distanceFromTheExpectedIncidenceCenterPhotoLaser = 300;

function drawLaser(xcoordinate, ycoordinate){
    let laser = dibujo.getContext("2d");
    laser.fillStyle = "#a76bff";
    laser.beginPath();
    laser.arc(xcoordinate, ycoordinate, 8, 0, 2 * Math.PI);
    laser.closePath();
    laser.fill();
}

function moveLaser(angle){
    let xcoordinate = distanceFromTheExpectedIncidenceCenterPhotoLaser*Math.cos(angle+Math.PI/2)+xExpectedIncidenceCenter;
    let ycoordinate = -distanceFromTheExpectedIncidenceCenterPhotoLaser*Math.sin(angle+Math.PI/2)+yExpectedIncidenceCenter;
    drawLaser(xcoordinate, ycoordinate);

    let m2 = (yExpectedIncidenceCenter - ycoordinate)/(xExpectedIncidenceCenter - xcoordinate);
    let b2 = yExpectedIncidenceCenter - m2*xExpectedIncidenceCenter;
    let xcorte = (b2-b1)/(m1-m2);
    let ycorte = m2*xcorte+b2; 
    let longitud = Math.hypot((xcorte-xcoordinate),(ycorte-ycoordinate));
    let dotProductV1V2 = -(1+m1*m2);
    let normV1 = Math.hypot(1,m1);
    let normV2 = Math.hypot(1,m2);
    let firstIncidenceAngle = Math.asin(dotProductV1V2/(normV1*normV2));
    incidenceAngle.innerHTML = firstIncidenceAngle*180/Math.PI;
    drawRay(-angle, xcoordinate, ycoordinate, longitud);

    let transmittedAngle = Math.asin(refractiveIndexAir*Math.sin(firstIncidenceAngle)/refractiveIndexPrism);
    let sin3 = Math.sin(transmittedAngle+Math.PI/2-angleOfSides);
    let ycorte1 = point2y;
    let xcorte1 = (ycorte1-ycorte)/(Math.tan(transmittedAngle+Math.PI/2-angleOfSides))+xcorte;
    let longitud1 = (ycorte1-ycorte)/sin3;
    drawRay(transmittedAngle-angleOfSides, xcorte, ycorte, longitud1);
    

    let reflectedAngle = -transmittedAngle+angleOfSides-Math.PI;
    drawRay(reflectedAngle, xcorte1, ycorte1, 300);
    
    //normal
    drawRay(Math.PI/2-angleOfSides+Math.PI/2, xcorte, ycorte, 20);

    

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
    let xcoordinate = -distanceFromTheExpectedIncidenceCenterPhotoLaser*Math.cos(angle+Math.PI/2)+xExpectedIncidenceCenter;
    let ycoordinate = -distanceFromTheExpectedIncidenceCenterPhotoLaser*Math.sin(angle+Math.PI/2)+yExpectedIncidenceCenter;
    drawPhotodiode(xcoordinate, ycoordinate);
    drawRay(angle, xcoordinate, ycoordinate, distanceFromTheExpectedIncidenceCenterPhotoLaser);
}


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    angle = this.value;
    dibujo.getContext("2d").clearRect(0,0,dibujo.width,dibujo.height);
    moveLaser(angle*Math.PI/180);
    movePhotodiode(angle*Math.PI/180);
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
    ray.lineTo(startx+len*Math.cos(angulo+Math.PI/2), starty+len*Math.sin(angulo+Math.PI/2));
    ray.stroke();

}

