//config


let testgit = 0;
let canvas = document.querySelector("canvas");
canvas.height = 640;
canvas.width = 360;
let c = canvas.getContext("2d");


let birdWidth = 40; // configuration de la taille de flappybird
let birdHeight = 30;

let pipeWidth = 90; //configuration de la taille des tuyaux
let pipeHeight = 640;

let holeSize = 150; // configuration de la taille de l'espace entre les tuyaux

let pipeArray = []; // initialisation de la liste des tuyaux

let timer = 0; // initialisation du timer quiva définir le raprochement entre différents tuyaux 

let timeBetween = 230; // variable qui définit le temps entre l'apparition de nouvezaux tuyaux. 

let rotation = 2; // variable qui règle la roation en fonction de la vitesse 

let gameOver =  false;

let score = 0;


let birdImage = new Image (); // chargement des images
birdImage.src = "flappybird.png";

let background = new Image ();
background.src = "flappybirdbg.png";

let topPipe = new Image ();
topPipe.src = "toppipe.png";

let bottomPipe = new Image ();
bottomPipe.src = "bottompipe.png";

let bird = new Bird ();

//classe Bird

function Bird (){

    this.x = canvas.width/3 - (birdWidth/2);
    this.y = canvas.height/2 - (birdHeight/2);
    this.dy = 0;
    this.acc = 0.4;

    this.size = canvas.width/20;

    this.draw = function() {
        c.save();
        c.translate(this.x-birdWidth/2,this.y+birdHeight/2);
        c.rotate(this.dy*rotation*Math.PI/180);
        c.drawImage(birdImage,birdWidth/-2,birdHeight/-2,birdWidth,birdHeight); 
        //c.fillRect (birdWidth/-2,birdHeight/-2,birdWidth,birdHeight);
        c.restore();
    }

    this.update = function() {
        this.y += this.dy;
        this.dy += this.acc;
        this.draw();
    }
}

function Pipes (random){

    this.x = canvas.width + pipeWidth;
    this.y = random;
    this.draw = function (){
        c.drawImage(topPipe    ,this.x - pipeWidth/2 , -pipeHeight*random - holeSize/2     , pipeWidth , pipeHeight);
        c.drawImage(bottomPipe ,this.x - pipeWidth/2 , pipeHeight*(1-random) + holeSize/2  , pipeWidth , pipeHeight);
    }

    this.update = function (){
        this.x -=1;
        this.draw();

        if (this.x == bird.x) {score++};
    }
}

// Fonctions 

function colision (){
    for (let i = 0 ; i < pipeArray.length; i++){
        
        if (bird.x > pipeArray[i].x - pipeWidth/2 && bird.x < pipeArray[i].x + pipeWidth/2 && (bird.y - birdHeight/1.5> pipeHeight*(1-pipeArray[i].y) || bird.y + birdHeight/1.5 < pipeHeight*(1-pipeArray[i].y)-holeSize)){
            gameOver = true;
            
        }
    }

}

function drawGameOver (){
    if (gameOver){
        c.beginPath();
        c.font = "50px Arial";
        c.fillStyle = "rgba(255, 255, 255, 1)";
        c.textAlign = "center";
        c.fillText("Game Over", 190 ,300);
        c.fillStyle = "rgba(0, 0, 0, 1)";
    }
}

function drawScore (){
    let message = score.toString();
    message = "Score : "+message;
    c.beginPath();
    c.font = "15px Arial";
    c.fillStyle = "rgba(255, 255, 255, 1)";
    c.textAlign = "center";
    c.fillText(message, 40,20);
    c.fillStyle = "rgba(0, 0, 0, 1)";
}

function init() {
    c.beginPath();
    c.drawImage(background,0,0);
    bird.draw();
    pipeArray.push(new Pipes(Math.random()));
}

function animate() {

    if (gameOver == false) {
        requestAnimationFrame(animate);
    };

    timer ++;
    

    c.clearRect(0,0,innerWidth,innerHeight);
    c.beginPath();
    c.drawImage(background,0,0);

    colision();
    bird.update();
    for (let i = 0; i < pipeArray.length; i++) {
        pipeArray[i].update();
    }

    if (timer == timeBetween) {
        timer = 0;
        pipeArray.push(new Pipes(Math.random()));
    }


    if (pipeArray.length > 5){
        pipeArray.shift();
    }
    console.log(bird);
    console.log(pipeArray[0]);
    drawGameOver();
    drawScore();
    
}

// Interactivity

window.addEventListener("keypress", function(event){

    if(event.code == "Space") {
        bird.dy = -8; 
    }
})

//Main

animate(); 
init();