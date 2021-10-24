var PLAY =1;
var END = 0;
var gameState = PLAY;
var score=0;

var riverbg, river
var boat, boatimg
var block1, block2
var obstacles, obstaclesimage
var obsgroup
var treasurechest,treasureimage
var treasuregroup;
var shark, sharkimage;
var sharkgroup;
var gameover, gmoverimg;
var replay, replayimg;


function preload(){
  sharkimage=loadAnimation('mouthopen.png','mouthclose.png')
  riverbg=loadImage('Riverbg.jpg');
  boatimg=loadImage('boat.png');
  obstaclesimage=loadImage('obstacles.png');
  treasureimage=loadImage('treasure chest.png');
  gmoverimg=loadImage('gameover.jpg');
  replayimg=loadImage('playagain.png');
}
function setup(){
  
  createCanvas(displayWidth - 20, displayHeight - 30);
  obsgroup=new Group();
  treasuregroup=new Group();
  river=createSprite(displayWidth/2, displayHeight/2);
  river.x=river.width/2;
  river.addImage(riverbg);
  boat=createSprite(75,displayHeight/2);
  boat.addImage(boatimg);
  boat.scale=0.2;
  boat.setCollider('rectangle', 200, 0, 50, 50);
  river.scale=6.0; 
  sharkgroup=new Group();
  
  

  block1=createSprite(75,75,200,50)
  block1.visible=false;
  block2=createSprite(75,displayHeight-150,200,50)
  block2.visible=false;

  gameover=createSprite(displayWidth/2, displayHeight/2);
  gameover.addImage(gmoverimg);
  gameover.visible=false;
  replay=createSprite(displayWidth/2, displayHeight/4);
  replay.addImage(replayimg);
  replay.visible=false;
}
function draw(){
  background("green");
//creating Infinite BG

  if (gameState === PLAY) {
    if (river.x<50){
      river.x=river.width/2+500;
      
    }
    river.velocityX = - (4.5 + 5* score/10);
    //vertical movement
    boat.y=mouseY;
    boat.collide(block1);
    boat.collide(block2);

    //increasing score when touching treasure & destroying the one particular treasure.
    for (var i= 0 ;i<treasuregroup.length;i++) {
            trea = treasuregroup.get(i)
            if (trea.isTouching(boat)){
              score=score+5;
              trea.destroy();
              }
    }

    
      
    //ending the game
    if(obsgroup.isTouching(boat)||sharkgroup.isTouching(boat)){
      gameState = END
      
    }
    // spawning obstacles
    spawnObs();
    treasure();
    sharkFun();


  } 
  else if (gameState===END) {
 obsgroup.setVelocityXEach(0);
  river.velocityX=0;
  obsgroup.setLifetimeEach(-1);
treasuregroup.setVelocityXEach(0);
treasuregroup.setLifetimeEach(-1);
sharkgroup.setVelocityXEach(0);
sharkgroup.setLifetimeEach(-1);
gameover.visible=true;
replay.visible=true;

if(mousePressedOver(replay)){
  restart();
}

}




  drawSprites();
  //scoring system text
  fill('orange');
  textSize(25);
  text('Score : '+score, displayWidth-200, 50);


}
function spawnObs(){
  if (frameCount%88===0){
    obstacles=createSprite (displayWidth, random(70,displayHeight-150));
    obstacles.addImage(obstaclesimage);
    obstacles.velocityX = -(5.0 + 5* score/10);
    obstacles.scale = 0.3
    obstacles.lifetime  = 500;
    
    obstacles.setCollider('rectangle', 0, 0, 200, 200)
    obsgroup.add(obstacles);
   
    
    

  }
  
}

function treasure(){
  if (frameCount%95===0){
    treasurechest=createSprite(displayWidth, random(70,displayHeight-150));
    treasurechest.addImage(treasureimage);
    treasurechest.velocityX = - (4.5 + 5* score/10);
    treasurechest.scale = 0.18;
    treasurechest.lifetime = 500;
    treasuregroup.add(treasurechest);
  }
}
function sharkFun(){
  if (frameCount%95===0){
    s=createSprite (displayWidth, random(70,displayHeight-150));
    s.addAnimation('sharkimage', sharkimage);
    s.velocityX = -(5.0 + 5* score/10);
    s.scale = 0.3
    s.lifetime  = 500;
    
    s.setCollider('rectangle', 0, 0, 200, 200)
    sharkgroup.add(s);
    
    
    
  }
  }

function restart () {
  gameState =PLAY;
  score = 0;
  obsgroup.destroyEach();
  treasuregroup.destroyEach();
 sharkgroup.destroyEach();
  replay.visible = false;
  gameover.visible=false;
  river.velocityX=-3;
}
