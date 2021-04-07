var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;

var score=0;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex2.png","trex3.png","trex4.png", "trex5.png");
    
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
}

function setup() {
  createCanvas(1000, 400);
  
  trex = createSprite(100,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.scale = 0.08;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  
  score = 0;  
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 820,50);
  
  text("Made by Vaibhav Bakshi",820,65);
  
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space") && trex.y >= 100) {
      trex.velocityY = -12;
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    
    spawnClouds();
    
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 110 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
