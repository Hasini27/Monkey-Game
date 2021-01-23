var PLAY = 1
var END = 0
var gameState = PLAY
var Monkey , Monkey_running, Monkey_collide
var bananaImage, obstacleImage
var bananaGroup, obstacleGroup
var score
var ground, groundImage
var invisibleGround
var gameOver
var restart


function preload(){
  
  Monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  Monkey_collide=loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundImage = loadImage("ground.jpg");   
  
  gameoverSpr=loadImage("gameOver.png");
  restartSpr=loadImage("restart.png");
  
 
}



function setup() {
  createCanvas(600,400);
  
  Monkey = createSprite(90,360,20,50);
  Monkey.addAnimation("running",Monkey_running);
  Monkey.addAnimation("collide",Monkey_collide);
  Monkey.scale=0.25;
  
  ground = createSprite(200,250,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale=1.52;
  
  Monkey.depth=3;
  
  score=0;
  
  gameOver = createSprite(300,140);
  gameOver.addImage(gameoverSpr);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart = createSprite(300,200);
  restart.addImage(restartSpr);
  restart.scale=0.15;
  restart.visible=false;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  
  invisibleGround = createSprite(300,399,600,30);
  invisibleGround.visible = false;
}


function draw() {
  background("black")
  textSize(22);
  fill("white");
  text("Survival time: " + score, 300, 80)
  
  if(gameState === PLAY){
    
    gameOver.visible=false;
    restart.visible=false;
    
    //Monkey.debug=true;
    Monkey.setCollider("rectangle",0,0,400,400);

    ground.velocityX = -(4 +score/100);
    
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& Monkey.y >= 100) {
        Monkey.velocityY = -12;
    }
    
    Monkey.velocityY = Monkey.velocityY + 0.8
    
    Monkey.collide(invisibleGround);
  
     spawnBananas();

    spawnObstacles();
    
    if(obstacleGroup.isTouching(Monkey)){
        gameState = END;     
    }
  }
   else if (gameState === END) {
     
     gameOver.visible=true;
     restart.visible=true;
     
      Monkey.changeAnimation("collide",      Monkey_collide);
     
      ground.velocityX = 0;
      Monkey.velocityY = 0;
     
     console.log("score" + score)
   
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
     
     obstacleGroup.destroyEach();
     obstacleGroup.destroyEach();
     
     if(mousePressedOver(restart)) {
        reset();}
     
 // score = score + Math.round(frameCount/60);
   }
drawSprites();
}

function spawnBananas(){
  if (frameCount%80 === 0){
    var banana = createSprite(600,100,50,50);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
   banana.lifetime = 170;
    banana.depth = Monkey.depth;
    Monkey.depth = Monkey.depth + 1;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  
  if (frameCount%200 === 0){
    var Obstacle = createSprite(620,380,50,50);
    Obstacle.addImage(obstacleImage);
    Obstacle.scale = 0.13 ;
    Obstacle.velocityX = -3
    Obstacle.lifetime = 220;
     Obstacle.depth = Monkey.depth;
    Monkey.depth = Monkey.depth + 1;
    obstacleGroup.add(Obstacle);
    
  }
}

function reset(){ 
  gameState = PLAY;
  score=0;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  Monkey.changeAnimation("running",Monkey_running); 
   ground.velocityX = -(4 + score/100);}