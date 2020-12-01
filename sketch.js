var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var ground;

function preload(){
  
  
  monkey_running=    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 400);
  
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(600,350,1200,10);
  ground.x = ground.width/2;
  console.log(ground.x);
  
  survivalTime = 0;
  
  FoodGroup= createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("aqua");
  
  stroke("black");
  textSize(15);
  fill("black");
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  text("SurvivalTime: "+ survivalTime, 250, 50);
  
  //adding velocity to the ground
  ground.velocityX = -4;
  
  if(ground.x<0){
     ground.x = ground.width/2;
  }
  
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -20;

    }
    
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  food();
  spawnObstacles();
  
  monkey.collide(ground);
  
  drawSprites();
}
 
function food() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 150;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600,330,40,10);
    obstacle.addImage("obstacle", obstacleImage);
    
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    
     //assign lifetime to the variable
    obstacle.lifetime = 150;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
  