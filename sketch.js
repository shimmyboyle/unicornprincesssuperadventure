
// Global variables to track if sounds are loaded
let introMusicLoaded = false;
let titleSpeechLoaded = false;
let hasPlayedYouWonMusic = false;
let hasPlayedNewHighScore = false
let winSprite;
// Intro Sketch Variables
let unicornHead;
let unicornText;
let princessText;
let superText;
let adventureText;
let pressToPlay;
// let titleBG;
let youWonMusic;
let newHighScore;
let youWon;
let gameState = "playing"; // Can be "playing", "won", or "restarting"
let winFrame = 0; // Frame when the player won


// Game Sketch Variables
let unicorn;
let ground1;
let ground2Sprites = []; // Initialize this array
let stars = [];
let sensors = [];
let isButtonPressed;
let potValue;
let bgImg;
let flower;
let heart;
let pizza;
let rainbow;
let starImage;
let cassette;
let watermelon;
let pineapple;
let jewel;
let objects = [];
let unicornAni;
let unicornImage;
let collectedCount = 0; // Variable to count collected objects
let hasWon = false; // Flag to indicate winning state
let winTime; // Variable to track the time when the player wins
let mainMusic;
let collect1;
let collect2;
let collect3;
let collect4;
let bitchin;
let bodacious;
let crushingIt;
let epic;
let niceOneDudette;
let radical;
let totallyRad;
let yeah;
let powerUp;
let rainbowMeter;
let collectSinceLastSpeech;
let nextSpeechTrigger;
let collectSinceLastIncrease = 0;
let nextIncreaseTrigger;
let isLoading = true;
let assetsLoaded = 0;
let totalAssets = 0; // This will be calculated in preload


function preload() {
  // Preload assets for both sketches
  
  totalAssets = 1; // Start with 1 for unicorn frames array
  
  unicornFrames = [];
  for (let i = 0; i <= 9; i++) {
    totalAssets++; // Count each unicorn frame
    unicornFrames.push(loadImage(`w00${i}.png`, assetLoaded));
  }
  
  unicornImage = loadImage("w000.png", assetLoaded);
  unicornHead = loadImage("Unicorn-V1.png", assetLoaded);
  unicornText = loadImage("unicorn-text.png", assetLoaded);
  princessText = loadImage("princess.png", assetLoaded);
  superText = loadImage("super.png", assetLoaded);
  adventureText = loadImage("adventure.png", assetLoaded);
  pressToPlay = loadImage("press-to-play.png", assetLoaded);
  youWonMusic = loadSound("you-won-music.wav", assetLoaded);
  newHighScore = loadSound("new-high-score.mp3", assetLoaded);
  youWon = loadImage("you-won.png", assetLoaded);

  // Load sound files with callbacks to set loading flags
  soundFormats("mp3", "ogg");
  mainMusic = loadSound("main-music_v1.mp3", assetLoaded);
  coin = loadSound("Coin.wav", assetLoaded);
  collect1 = loadSound("collect-1.wav", assetLoaded);
  collect2 = loadSound("collect-2.wav", assetLoaded);
  collect3 = loadSound("collect-3.wav", assetLoaded);
  collect4 = loadSound("collect-4.wav", assetLoaded);
  bitchin = loadSound("bitchin.mp3", assetLoaded);
  bodacious = loadSound("bodacious.mp3", assetLoaded);
  crushingIt = loadSound("crushing-it.mp3", assetLoaded);
  epic = loadSound("epic.mp3", assetLoaded);
  niceOneDudette = loadSound("nice-one-dudette.mp3", assetLoaded);
  radical = loadSound("radical.mp3", assetLoaded);
  totallyRad = loadSound("totally-rad.mp3", assetLoaded);
  yeah = loadSound("Yeah.mp3", assetLoaded);
  powerUp = loadSound("power-up.wav", assetLoaded);
  rainbowMeter = loadImage("Rainbow-meter_v1.png", assetLoaded);
  starImage = loadImage("STAR_01.png", assetLoaded);
  bgImg = loadImage("BG_V3.png", assetLoaded);
  flower = loadImage("flower.png", assetLoaded);
  heart = loadImage("heart.png", assetLoaded);
  pizza = loadImage("pizza.png", assetLoaded);
  rainbow = loadImage("rainbow.png", assetLoaded);
  cassette = loadImage("cassette-tape.png", assetLoaded);
  jewel = loadImage("jewel.png", assetLoaded);
  pineapple = loadImage("pineapple.png", assetLoaded);
  watermelon = loadImage("watermelon.png", assetLoaded);
  unicornImage = loadImage("w000.png", assetLoaded);
  // unicornAni = loadAni(
  //   "w000.png",
  //   "w001.png",
  //   "w002.png",
  //   "w003.png",
  //   "w004.png",
  //   "w005.png",
  //   "w006.png",
  //   "w007.png",
  //   "w008.png",
  //   "w009.png"
  // );

  objects = [
    starImage,
    flower,
    heart,
    pizza,
    rainbow,
    cassette,
    watermelon,
    pineapple,
    jewel,
  ];
  totalAssets = 30; // Approximate count based on your code - adjust as needed
}

function assetLoaded() {
  assetsLoaded++;
  
  // If all assets are loaded, set isLoading to false
  if (assetsLoaded >= totalAssets) {
    isLoading = false;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let splashElements = document.querySelectorAll('div:not(main)');
  splashElements.forEach(el => {
    if (el.innerText && el.innerText.includes('MADE WITH P5 PLAY')) {
      el.style.display = 'none';
    }
  });
    // setupSerial();

  // Initialize the game sketch elements here
  //setupGameSketch();
}

function draw() {
  // Check for splash screen again (in case it reappears)
  let splashElements = document.querySelectorAll('div:not(main)');
  splashElements.forEach(el => {
    if (el.innerText && el.innerText.includes('MADE WITH P5 PLAY')) {
      el.style.display = 'none';
    }
  });
  if (isLoading) {
    drawLoadingScreen();
  } else {
    // Only initialize the game once when loading is complete
    if (!unicorn) {
      setupGameSketch();
      
      // Add a small delay to ensure title assets are fully created before showing game
      setTimeout(function() {
        // If you want to do anything after title assets are created
      }, 100);
    }
    
    // Draw game as normal
    drawGameSketch();
  }
}


function drawLoadingScreen() {
  background("#03A9F4"); // Same blue as your game background
  
  // Calculate loading percentage
  let loadingPercentage = floor((assetsLoaded / totalAssets) * 100);
  
  // Draw loading bar
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("LOADING SUPER UNICORN PRINCESS ADVENTURE", width/2, height/2 - 50);
  
  // Loading bar background
  fill(100);
  rect(width/4, height/2, width/2, 30);
  
  // Loading bar progress
  fill(255, 105, 180); // Pink color
  rect(width/4, height/2, (width/2) * (loadingPercentage/100), 30);
  
  // Loading percentage text
  fill(255);
  text(loadingPercentage + "%", width/2, height/2 + 60);
}

function mousePressed() {
  if (mainMusic.isLoaded() && !mainMusic.isPlaying()) {
    mainMusic.setVolume(0.1);
    mainMusic.loop();
    //console.log("Main music started playing");
  }
}




function setupGameSketch() {
  world.gravity.y = 10;
  // bgImg = new Sprite(0, 685, 13000, 528);
  // bgImg.collider = "none";
  // bgImg.image = "BG_V3.png";
  // bgImg.scale = 2.2;

  ground1 = new Sprite(250, (height / 4) * 3, 20000, 50, "static");
  ground1.color = "pink";

  // Create 10 ground2 sprites with random properties and no overlap
  for (let i = 0; i < 5; i++) {
    let ground;
    let overlapping;

    do {
      let randomX = random(-7000, 7000);
      let randomY = random(150, (height / 4) * 2);
      let randomWidth = random(500, 1000);

      overlapping = false;
      ground = { x: randomX, y: randomY, w: randomWidth, h: 40 };

      // Check if the new ground sprite overlaps with any existing ones
      for (let j = 0; j < ground2Sprites.length; j++) {
        let existingGround = ground2Sprites[j];
        if (
          abs(existingGround.x - ground.x) <
          existingGround.w / 2 + ground.w / 2 + 200
        ) {
          overlapping = true;
          break;
        }
      }
    } while (overlapping);

    let newGround = new Sprite(
      ground.x,
      ground.y,
      ground.w,
      ground.h,
      "static"
    );
    newGround.color = "pink";
    ground2Sprites.push(newGround);
  }

  // turns off arrow cursor
  // mouse.visible = false;

  // establishes a new p5-play group for the stars
  stars = new Group();

  // Create 100 stars with random images, positions, and sizes
  for (let i = 0; i < 100; i++) {
    createNewStar();
  }

  // Create a new sprite for the unicorn
// Create a new sprite for the unicorn
  // Create a new sprite for the unicorn
  unicorn = new Sprite(width / 2, (height / 4) * 3 -180, 50, 150);
  unicorn.img = unicornImage;
  unicorn.frameIndex = 0;
  unicorn.isMoving = false;
  unicorn.scale = 0.5;
  unicorn.friction = 3;
  unicorn.rotationLock = true;

  // Initialize the vel property for the unicorn
  unicorn.vel = { x: 0, y: 0 };

  // Make it so that the stars disappear when the unicorn hovers over them
  unicorn.overlapping(stars, collect);

  // Initialize the speech sound tracking variables
  collectSinceLastSpeech = 0;
  nextSpeechTrigger = Math.floor(random(5, 8)); // Set the first trigger between 5 and 7 collections

  // Initialize the size/speed increase tracking variables
  collectSinceLastIncrease = 0;
  nextIncreaseTrigger = Math.floor(random(3, 6)); // Set the first trigger between 3 and 5 collections

  // let titleBG = new Sprite(width / 2, height / 2);
  // titleBG.collider = "none";
  // titleBG.image = "title-bg.png";
  // titleBG.scale = 2;
  // titleBG.life = 250;

  unicornHead = new Sprite(width / 2, height / 2);
  unicornHead.collider = "none";
  unicornHead.image = "Unicorn-V1.png";
  unicornHead.scale = 1;
  unicornHead.life = 250;

  unicornText = new Sprite(width / 2, height / 2);
  unicornText.collider = "none";
  unicornText.image = "unicorn-text.png";
  unicornText.scale = 1;
  unicornText.life = 250;

  princessText = new Sprite(width / 2, height / 2);
  princessText.collider = "none";
  princessText.image = "princess.png";
  princessText.scale = 1;
  princessText.life = 250;

  let superText = new Sprite(width / 2, height / 2);
  superText.collider = "none";
  superText.image = "super.png";
  superText.scale = 1;
  superText.life = 250;

  let adventureText = new Sprite(width / 2, height / 2);
  adventureText.collider = "none";
  adventureText.image = "adventure.png";
  adventureText.scale = 1;
  adventureText.life = 250;
}
function drawGameSketch() {
  clear();
  background("#03A9F4");
  
  let isPressingMovementKey = kb.pressing("left") || kb.pressing("right");
  
  // Add this near the top of your drawGameSketch function
  //console.log("isMoving:", unicorn.isMoving, "velX:", unicorn.vel.x);

  // First handle animation based on movement state
// First handle animation based on movement state
// Direct key check for animation
  if (kb.pressing("left") || kb.pressing("right")) {
  // Manually handle animation
  if (frameCount % 5 === 0) {
    unicorn.frameIndex = (unicorn.frameIndex + 1) % 10;
    unicorn.img = unicornFrames[unicorn.frameIndex];
  }
} else {
  // Reset to static image when no movement keys are pressed
    unicorn.frameIndex = 0;
    unicorn.img = unicornImage;
}

 if (hasWon) {
  // Stop the main music
  if (mainMusic.isPlaying()) {
    mainMusic.stop();
  }
  
  // Play winning music only once
  if (!hasPlayedYouWonMusic) {
    youWonMusic.play();
    youWonMusic.setVolume(0.3);
    hasPlayedYouWonMusic = true;
    winFrame = frameCount; // Record the frame when the player won
  }
  
  // Create a "You Won" sprite if it doesn't exist
  if (!winSprite) {
    winSprite = new Sprite(camera.x, height/2); // Position at center of current view
    winSprite.collider = "none";
    winSprite.img = youWon; // Use your existing youWon image
    winSprite.scale = 1.5;
  }
  
  // After 5 seconds, restart the game
  if (frameCount > winFrame + 300) { // 300 frames = about 5 seconds at 60fps
    restartGame();
  }
  
  return; // Exit the function early
}

  // Normal gameplay code...
  let velX = 0;
  let velY = unicorn.vel.y;

  // Keyboard inputs
  if (kb.pressing(" ")) {
    velY = -9;
  }

  // Horizontal movement
  if (kb.pressing("left")) {
    unicorn.mirror.x = true;
    velX = -10;
} else if (kb.pressing("right")) {
    unicorn.mirror.x = false;
    velX = 10;
} else {
    velX = 0;
}
  

  // Apply velocity
  unicorn.vel.x = velX;

  // Handle gravity
  if (unicorn.vel.y === velY) {
    unicorn.vel.y = velY + (world.gravity.y * deltaTime) / 1000;
  } else {
    unicorn.vel.y = velY;
  }

  // Position constraints
  unicorn.x = constrain(unicorn.x, -8400, 8400);

  // Camera handling
  let cameraLeftBound = -8500;
  let cameraRightBound = 8500;
  camera.x = constrain(
    unicorn.x,
    cameraLeftBound + width / 2,
    cameraRightBound - width / 2
  );

  // Draw rainbow meter
  drawRainbowMeter();
}
function restartGame() {
  collectedCount = 0;  // Reset the collected count
  hasWon = false;  // Reset the winning flag
  unicorn.position.x = width / 2;
  unicorn.position.y = (height / 4) * 3 - 180;  // Reset to the initial y-position from setupGameSketch
  unicorn.scale = 0.5;  // Reset the unicorn's scale to the starting value
  unicorn.vel.x = 0;  // Ensure velocity is reset
  unicorn.vel.y = 0;
  stars.removeAll();  // Remove all existing stars
  hasPlayedYouWonMusic = false;  // Reset the flag for playing the winning music
  hasPlayedNewHighScore = false;  // Reset the flag for playing the new high score sound

  // Remove the winSprite to ensure it doesn’t persist
  if (winSprite) {
    winSprite.remove();
    winSprite = null;
  }

  // Create new stars
  for (let i = 0; i < 100; i++) {
    createNewStar();
  }

  if (mainMusic.isLoaded() && !mainMusic.isPlaying()) {
    mainMusic.setVolume(0.1);
    mainMusic.loop();
    //console.log("Main music started playing");
  }

  // Recreate the title and text sprites
  // let titleBG = new Sprite(width / 2, height / 2);
  // titleBG.collider = "none";
  // titleBG.image = "title-bg.png";
  // titleBG.scale = 2;
  // titleBG.life = 250;

  unicornHead = new Sprite(width / 2, height / 2);
  unicornHead.collider = "none";
  unicornHead.image = "Unicorn-V1.png";
  unicornHead.scale = 1;
  unicornHead.life = 250;

  unicornText = new Sprite(width / 2, height / 2);
  unicornText.collider = "none";
  unicornText.image = "unicorn-text.png";
  unicornText.scale = 1;
  unicornText.life = 250;

  princessText = new Sprite(width / 2, height / 2);
  princessText.collider = "none";
  princessText.image = "princess.png";
  princessText.scale = 1;
  princessText.life = 250;

  let superText = new Sprite(width / 2, height / 2);
  superText.collider = "none";
  superText.image = "super.png";
  superText.scale = 1;
  superText.life = 250;

  let adventureText = new Sprite(width / 2, height / 2);
  adventureText.collider = "none";
  adventureText.image = "adventure.png";
  adventureText.scale = 1;
  adventureText.life = 250;
}




  
// Function to create a new star and add it to the stars group
function createNewStar() {
  let randomImage = random(objects);
  let star = new Sprite(
    random(-7000, 18000), 
    random(-3000, (height/3)) // Adjust this range to position stars higher
  );
  star.img = randomImage; // Changed from star.addImage(randomImage)
  star.scale = random(0.3, 1.2); // Random scale between 0.3 and 1.0
  stars.add(star);
}

function drawRainbowMeter() {
  // Calculate the width of the rainbow meter based on the collected objects
  let meterWidth = map(collectedCount, 0, 400, 0, width);

  // Draw the rainbow meter at the bottom of the screen, starting from the left edge
  image(rainbowMeter, 0, height * 0.75, meterWidth, height * 0.24);
}

function collect(unicorn, star) {
  star.remove();

  // Create an array of the available sounds
  let sounds = [coin, collect1, collect2, collect3, collect4];

  // Randomly select a sound from the array
  let randomSound = random(sounds);

  // Play the selected sound
  randomSound.play();
  randomSound.setVolume(0.1);

  // Increase the collected count with a small random increment
  collectedCount += random(1, 5); // Random increment between 1 and 5

  collectSinceLastSpeech++; // Increment the counter for speech sounds
  collectSinceLastIncrease++; // Increment the counter for size/speed increases

  // Check if it's time to play a speech sound
  if (collectSinceLastSpeech >= nextSpeechTrigger) {
    // Reset the counter and set a new random trigger point
    collectSinceLastSpeech = 0;
    nextSpeechTrigger = Math.floor(random(5, 8)); // New trigger between 5 and 7 collections

    // Create an array of the speech sounds
    let speechSounds = [
      bitchin,
      bodacious,
      crushingIt,
      epic,
      niceOneDudette,
      radical,
      totallyRad,
      yeah,
    ];

    // Randomly select and play a speech sound
    let randomSpeechSound = random(speechSounds);
    randomSpeechSound.play();
    randomSpeechSound.setVolume(0.4);
  }

  // Check if it's time to increase size and speed
  if (collectSinceLastIncrease >= nextIncreaseTrigger) {
    // Reset the counter and set a new random trigger point
    collectSinceLastIncrease = 0;
    nextIncreaseTrigger = Math.floor(random(4, 7)); // New trigger between 4 and 7 collections

    // Increase the unicorn's size and speed
    unicorn.scale += 0.1; // Increase the scale
    unicorn.vel.x += 1; // Increase the speed

    // Play the power-up sound
    powerUp.play();
    powerUp.setVolume(.1); // Set the volume for the power-up sound
  }

  if (collectedCount >= 400) {
    // Changed from 200 to 400
    hasWon = true; // Set the winning flag when 400 objects are collected
    winTime = millis(); // Record the time when the player wins
  } else {
    for (let i = 0; i < 5; i++) {
      createNewStar();
    }
  }
}
// THIS IS ALL THE ARDUINO TO p5 STUFF
// function serialEvent() {
//   // read a string from the serial port
//   // until you get carriage return and newline:
//   let inString = serial.readStringUntil("\r\n");
//   //check to see that there's actually a string there:
//   if (inString) {
//     sensors = inString.split(",");
//     //console.log(inString);
//     // locH = map(int(sensors[0]), 0, 1023, 0, width);
//     potValue = sensors[0];
//     isButtonPressed = sensors[1];
//     serial.write("x");
//     // console.log(sensors);
//   }
// }