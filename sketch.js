var PLAY;
var END;
var gameState;
var ghost;
var window;
var restart;
var gameover;
var tower;
var towerImg;
var ghostImg;
var windowImg;
var restartImg;
var gameoverImg;
var towerImg;
var restartImg;
var score;

function preload(){
    ghostImg = loadImage("ghost1.jpg");
    windowImg = loadImage("window.png");
    restartImg = loadImage("rest.png");
    gameoverImg = loadImage("game.png");
    towerImg = loadImage("tower.jpg");
}

function setup() {
    createCanvas(600,500);
    ghost = createSprite(300,420,600,10);
    ghost.addImage(ghostImg);
    ghost.debug = false;
    ghost.scale = 0.5;
    ghost.setCollider("rectangle",0,0,ghost.width,ghost.height);

    gameover = createSprite(300,100);
    gameover.addImage(gameoverImg);
    gameover.scale = 0.1;

    restart = createSprite(300,180);
    restart.addImage(restartImg);
    restart.scale = 0.1;

    tower = createSprite(600,500);
    tower.addImage(towerImg);

    windowsGroup = createGroup();

    score = 0;

    edges = createEdgeSprites();
}

function draw() {
    background(180);
   // image(tower,0,0,600,500);
    ghost.velocityY = ghost.velocityY + 0.08;
    ghost.collide(edges);

    if (gameState == PLAY) {
        gameover.visible = false;
        restart.visible = false;

        score = score + Math.round(getFrameRate()/60);

        spawnWindows();

        if (ghost.isTouching(windowsGroup)) {
            windowsGroup.destroyEach();
            ghost.destroy();
            gameState == END;
        }

        tower.velocityY = -(4 + 3 * score/100);

        if (tower.y < 0) {
            tower.y = tower.width/2;
        }

        if (keyDown("right_arrow")) {
            ghost.x = ghost.x + 2;
        }

        if (keyDown("left_arrow")) {
            ghost.x = ghost.x - 2;
        }

        
    }

    if (gameState==END) {
        gameover.visible = true;
        restart.visible = true;

        tower.velocityY = 0;

        ghost.velocityY = 0;
        ghost.velocityX = 0;

        windowsGroup.setLifetimeEach(-1);

        // windowsGroup.velocityYEach(0);
        // windowsGroup.velocityXEach(0);
        
        if (mousePressedOver(restart)) {
            reset();
        }
        
    }

    drawSprites();
    
    fill("black");
    textSize(20);
    text("Score: " + score,500,50);
}

function reset() {
    gameState == PLAY;

    gameover.visible = false;
    restart.visible = false;

    windowsGroup.destroyEach();

    score = 0;
}

function spawnWindows() {
    if (frameCount % 60 == 0) {
        var window = createSprite(600,450,10,40);
        window.velocityY = -6;
        window.addImage(windowImg);
        window.scale = 0.1;
        windowsGroup.add(window);
        window.debug = false;       
    }
}