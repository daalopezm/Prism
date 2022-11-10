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



const sectionVerPrisma = document.getElementById('ver-prisma')
const sectionDibujo = document.getElementById('dibujo')

//Laser



function drawLaser(xcoordinate, ycoordinate){
    let laser = dibujo.getContext("2d");
    laser.fillStyle = "#a76bff";
    laser.clearRect(xcoordinate, ycoordinate,0,dibujo.width,dibujo.height);
    laser.beginPath();
    laser.arc(xcoordinate, ycoordinate, 8, 0, 2 * Math.PI);
    laser.closePath();
    laser.fill();
}

function moveLaser(angle){
    let xcoordinate = 400*Math.cos(angle*Math.PI/180+Math.PI/2)+xExpectedIncidenceCenter;
    let ycoordinate = -400*Math.sin(angle*Math.PI/180+Math.PI/2)+yExpectedIncidenceCenter;
    drawLaser(xcoordinate, ycoordinate);
}



// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    angle = this.value;
    moveLaser(angle);    
}




let prisma = dibujo.getContext("2d")



function drawPrisma() {
    if (dibujo.getContext) {
        const prisma = dibujo.getContext('2d');
        prisma.fillStyle = "#a2d2ff";
        prisma.beginPath();
        prisma.moveTo(xExpectedIncidenceCenter,yExpectedIncidenceCenter);
        prisma.lineTo(xExpectedIncidenceCenter+side/2,yExpectedIncidenceCenter);
        prisma.lineTo(xExpectedIncidenceCenter,yExpectedIncidenceCenter-side*Math.tan(Math.PI/4)/2);
        prisma.lineTo(xExpectedIncidenceCenter-side/2,yExpectedIncidenceCenter);
        prisma.closePath();
        prisma.fill();
    }
}

drawPrisma();
