const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg,towerImg;
var angle;
var canvas, angle, tower, ground, cannon;
var balls = [] ;
var boats = [] ;

var boatAnimation = [];
var boatSpriteSheet, boatSpriteData;
var brokenBoatAnimation = [];
var brokenBoatSpriteSheet, brokenBoatSpriteData;
var watersplashAnimation= [];
var watersplashSpriteSheet, watersplashSpriteData;

var score
var waterSound,cannonExplosion, pirateHeHe, backgroundMusic

var isLaughing=false
var isGameover = false



function preload() {
  backgroundImg=loadImage("assets/background.gif");
  towerImg=loadImage("assets/tower.png");

  boatSpriteSheet=loadImage("assets/boat/boat.png");
  boatSpriteData=loadJSON("assets/boat/boat.json");
  brokenBoatSpriteSheet=loadImage("assets/boat/brokenBoat.png");
  brokenBoatSpriteData=loadJSON("assets/boat/brokenBoat.json");
  watersplashSpriteSheet=loadImage("assets/waterSplash/waterSplash.png");
  watersplashSpriteData=loadJSON("assets/waterSplash/waterSplash.json");

  waterSound=loadSound("assets/cannon_water.mp3");
  cannonExplosion=loadSound("assets/cannon_explosion.mp3");
  pirateHeHe=loadSound("assets/pirate_laugh.mp3");
  backgroundMusic=loadSound("assets/background_music.mp3");

}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES)

  angle=20;
  
  var options = {
    isStatic: true
  }
  

  
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);
  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);


  cannon= new Cannon(165,120,100,100,angle);
 
  
  var boatFrames= boatSpriteData.frames;
  for(var i=0 ; i < boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }
  var brokenBoatFrames= brokenBoatSpriteData.frames;
  for(var i=0 ; i < brokenBoatFrames.length; i++){
    var pos = brokenBoatFrames [i].position;
    var img = brokenBoatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }
  var watersplashFrames= watersplashSpriteData.frames;
  for(var i=0 ; i < watersplashFrames.length; i++){
    var pos= watersplashFrames[i].position;
    var img = watersplashSpriteSheet.get(pos.x, pos.y, pos.w, pos.h)
    watersplashAnimation.push(img)
  }
  score=0
}

function draw() {

  image (backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);

  push();
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImg, 0, 0, 160, 310);
  pop();
  
  cannon.display();
  
  textSize(25)
  text("Score : "+score,1050,30);
  

  for(var i=0 ; i< balls.length ; i++){
    showCannonballs(balls[i],i)  
    collisionWithBoatDetection(i);
  }
  
   showBoats ();
   
   if(!backgroundMusic.isPlaying()){
      backgroundMusic.play()
      backgroundMusic.setVolume(0.1)
   }


   if(score>=100){
    gameWin()
   }

   fill ("black");
   text("Game created by Ilan !", 20,30)
   

}

function showCannonballs(ball,index){
  if(ball){
    ball.display()
    ball.animate()
    if(ball.body.position.x>=width+30 || ball.body.position.y>=height-50){
      ball.remove(index)
    waterSound.play()
    waterSound.setVolume(0.2)
    }
  }
  
}




function keyReleased(){
  if(keyCode == RIGHT_ARROW){
     balls[balls.length-1].shoot()
     cannonExplosion.play()
     cannonExplosion.setVolume(0.2)
    }
}
function keyPressed(){
  if(keyCode == RIGHT_ARROW){
    var cannonball = new Cannonball(165,120) ;
    balls.push(cannonball)
  
  }
}
function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position, boatAnimation);

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        boats[i].display();
        boats[i].animate();

        var collision=Matter.SAT.collides(this.tower,boats[i].body)
        if(collision.collided && !boats[i].isBroken){
          if(!isLaughing && !pirateHeHe.isPlaying()){
            pirateHeHe.play();
            isLaughing=true;
          }
          isGameover = true;
          gameOver()
        }     
      } 
  
    }
  } 
  else {
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}

function collisionWithBoatDetection(index){
    for(var i = 0; i < boats.length; i++){
      if(balls[index]!=undefined && boats[i]!=undefined){
         var collision=Matter.SAT.collides(balls[index].body,boats[i].body);
        if(collision.collided){
          score=score+10;
          boats[i].remove(i);
          Matter.World.remove(world,balls[index].body)
          delete balls[index]
        }
    }
  }
}


function gameOver(){
  swal(
    {
      title: "Game Over!",
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  )
}
function gameWin(){
  swal({
    title: "Nice Job!",
    text: "Would you like to play again?",
    imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText: "Play Again"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload();
      }
    }
  )
}











































































































































































`















`