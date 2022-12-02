let tid = 60;
let n = 5;
let diameter = 110;
let spilslut = false;
let score = 0;

let currentExercise;

let bubbles = [];

class bubble {
  constructor(x, y, diameter, farve) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.farve = farve;
  }
  draw(number) {
    fill(this.farve);
    circle(this.x, this.y, this.diameter);
    textSize(24);
    fill("white");
    textAlign(CENTER, CENTER);
    if (number == 0) {
      text(currentExercise[1], this.x, this.y);
    } else {
      text(number, this.x, this.y);
    }
  }
}

function createAdditionExercise() {
  let tal1 = floor(random() * 10);
  let tal2 = floor(random() * 10);
  let svar = tal1 + tal2;
  let tekst = "Hvad er summen af " + tal1 + " + " + tal2 + "?";
  return [tekst, svar];
}

function drawTimer() {
  textStyle(BOLD);
  textSize(20);
  textAlign(LEFT, TOP);
  fill("black");
  text("Tid: " + tid, 30, 50);
}

function drawPoint() {
  textAlign(LEFT, TOP);
  textSize(20);
  fill("black");
  text("Point: " + score, 30, 20);
}

function drawExercise() {
  textAlign(LEFT, TOP);
  textSize(25);
  fill("black");
  text(currentExercise[0], 30, 80);
}

function nedtælling() {
  tid--;
}
setInterval(nedtælling, 1000);

function gameOver() {
  if (tid <= 0) {
    spilslut = true;
  }
}

function showGameOver() {
  console.log("Spillet er slut");
  textAlign(CENTER, CENTER);
  fill("black");
  textSize(40);
  text(
    "Spillet er slut!\n Score: " + score,
    windowWidth / 2,
    windowHeight / 2 - 30
  );
  if (score < 5) {
    text(
      "Prøv igen, øvelse gør mester!",
      windowWidth / 2,
      windowHeight / 2 + 50
    );
  } else if (score <= 10) {
    text(
      "Du er godt på vej! Bare fortsæt!",
      windowWidth / 2,
      windowHeight / 2 + 50
    );
  } else if (score <= 20) {
    text(
      "Super flot. Du kan bare det der!",
      windowWidth / 2,
      windowHeight / 2 + 50
    );
  } else {
    text(
      "Fremragende, du har mestret addition!",
      windowWidth / 2,
      windowHeight / 2 + 50
    );
  }
  noLoop();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let c;
  for (let index = 0; index < n; index++) {
    c = new bubble(
      random(diameter / 2, windowWidth - diameter / 2),
      random(diameter / 2, windowHeight - diameter / 2),
      diameter,
      color(random(255), random(255), random(255))
    );
    bubbles.push(c);
    currentExercise = createAdditionExercise();
    setupCirclesToCurrentExercise(currentExercise[1]);
  }
}

function draw() {
  background(240);
  noStroke();
  for (let index = 0; index < n; index++) {
    bubbles[index].draw(index);
  }
  drawPoint();
  drawTimer();
  drawExercise();
  gameOver();
  if (spilslut == true) {
    background(240);
    showGameOver();
  }
}

function findNumberDifferentFromSolution(solution) {
  let number = random() * 20;
  if (number == solution) {
    return number - 1;
  } else {
    return number;
  }
}

function setupCirclesToCurrentExercise() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].x = random(diameter / 2, windowWidth - diameter / 2);
    bubbles[i].y = random(diameter / 2, windowHeight - diameter / 2);
    bubbles[i].farve = color(random(255), random(255), random(255));

    if (i == 0) {
      bubbles[i].erLøsning = true;
      bubbles[i].tal = currentExercise[1];
    } else {
      bubbles[i].erLøsning = false;
      bubbles[i].tal = findNumberDifferentFromSolution(currentExercise[1]);
    }
  }
}

function mousePressed() {
  console.log("Museklik", mouseX, mouseY);
  let afstand;
  for (let index = 0; index < n; index++) {
    afstand = dist(mouseX, mouseY, bubbles[index].x, bubbles[index].y);
    if (afstand < bubbles[index].diameter) {
      if (bubbles[index].erLøsning == true) {
        score++;
      }
      currentExercise = createAdditionExercise();
      setupCirclesToCurrentExercise();
    }
  }
}
