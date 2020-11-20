var monkey, monkey_running, monkey_died
var banana, bananaImage, obstacle, obstacleImage
var banana1, bananaImage, obstacle1, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var ground
var jump = 0
var PLAY = -1
var END = -2
var gameState = PLAY

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  monkey_died = loadAnimation("sprite_0.png")

}

function setup() {

  createCanvas(800, 400)

  monkey = createSprite(100, 200, 100, 100)
  monkey.addAnimation("running", monkey_running)
  monkey.addAnimation("died", monkey_died)

  monkey.scale = 0.2



  //ground = createSprite(400, 420, 1000, 60)
  //ground.shapeColour=("green")



  obstaclesGroup = new Group()

  bananasGroup = new Group()

}


function draw() {

  background("lightBlue")

  if (gameState === -1) {

    if (monkey.y < 331) {
      monkey.velocityY = monkey.velocityY + 0.4
    }


    if (monkey.y > 329) {
      monkey.velocityY = -1
      jump = 0
      console.log(monkey.y)
    }

    if (keyWentDown("space") && jump < 1) {
      monkey.velocityY = -13
      jump = jump + 1
    }

    if (monkey.isTouching(bananasGroup)) {
      bananasGroup.destroyEach()
   score=score+1
    }

    if (frameCount % 160 === 0) {
      spawnObstacles()
      spawnBanana()
    }

    if (monkey.isTouching(obstaclesGroup)) {
      gameState = -2

    }
  }

  if (gameState === -2) {
    monkey.changeImage("died", monkey_died)
    monkey.velocityY = 0
    obstacle.velocityX = 0
    banana.velocityX = 0
  }



text("Score: "+ score, 370,50)

  drawSprites()
}

function spawnBanana() {

  banana = createSprite(900, 355, 10, 40);
  banana.velocityX = -6;
  banana.y = obstacle.y - 200

  banana.addImage(bananaImage)

  //assign scale and lifetime to the obstacle           
  banana.scale = 0.2;

  //add each obstacle to the group
  bananasGroup.add(banana);

}

function spawnObstacles() {

  obstacle = createSprite(900, 375, 10, 40);
  obstacle.velocityX = -6;

  obstacle.addImage(obstacleImage)

  //assign scale and lifetime to the obstacle           
  obstacle.scale = 0.2;

  //add each obstacle to the group
  obstaclesGroup.add(obstacle);

  obstacle.debug = true
  obstacle.setCollider("circle", 0, 0, 200)
}