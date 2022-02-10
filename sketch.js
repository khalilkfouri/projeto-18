var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg,score;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(300,100);
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.35
  
  score = 0
}

function draw() {
  background(0);

  fill("red")
    stroke("yellow")
     textSize(35)
  text("YOUR SCORE IS:" + score,220,300)
  

   if(gameState === "play"){

     if(tower.y > 400){
      tower.y = 300
    }


    if(keyDown("space")){
      ghost.velocityY = -5
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x + -5
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 5
    }
    
    ghost.velocityY = ghost.velocityY + 0.15

    createDoor();
    
    if(climbersGroup.isTouching(ghost)|| ghost.y >600){
      ghost.velocityY = 0
      ghost.destroy()
      gameState = "end"
    }
    drawSprites();
   }
   if (gameState === "end"){
    fill("red")
    stroke("yellow")
     textSize(35)
    text("GAME OVER",230,250)

   }

    

  }
  function createDoor(){
    if(frameCount%200 === 0){
      var door = createSprite(300,-50)
      door.addImage("door",doorImg)
      var climber = createSprite(300,10)
      climber.addImage("climber",climberImg)
      door.x = Math.round(random(120,480))
      door.velocityY = 1
      climber.x = door.x
      climber.velocityY = 1
      climbersGroup.add(climber)
      //doorGroup.add(door)
      score = score + 10

    }
    
  }
