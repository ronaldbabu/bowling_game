import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  key: any;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
  }

  canvas: any;
  context: any;
  ctx: any;

  pinimage = new Image();
  ballimage = new Image();

  x: number = 295;
  y: number = 520;
  Ball: any = [];
  afftectedPins: any = [];

  moveLeft: boolean = false;
  moveRight: boolean = false;
  gameStarted: boolean = false;
  ballReloaded: boolean = true;
  ballThrown: boolean = true;
  gameFinished: boolean = false;
  gameWonStatus: boolean = false;
  gameLostStatus: boolean = false;
  isStrike: boolean = false;
  isSpare: boolean = false;
  allClear: boolean = false;
  showStrikeOrSpare: boolean = false;

  currentPos: number = 125;

  overallScore: number = 0;

  throwNumber: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.canvas = document.getElementById('myCanvas');

    this.ctx = (this.canvas as HTMLCanvasElement).getContext('2d');

    this.pinimage.src = 'https://static.thenounproject.com/png/12375-200.png';

    this.ballimage.src = 'http://cdn.onlinewebfonts.com/svg/img_51455.png';

    this.loadPins();
  }

  // To load all the pins
  loadPins() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.Ball = [
      { id: 1, leftPos: 220, topPos: 0, pinimage: this.pinimage },
      { id: 2, leftPos: 270, topPos: 0, pinimage: this.pinimage },
      { id: 3, leftPos: 320, topPos: 0, pinimage: this.pinimage },
      { id: 4, leftPos: 370, topPos: 0, pinimage: this.pinimage },
      { id: 5, leftPos: 250, topPos: 30, pinimage: this.pinimage },
      { id: 6, leftPos: 300, topPos: 30, pinimage: this.pinimage },
      { id: 7, leftPos: 350, topPos: 30, pinimage: this.pinimage },
      { id: 8, leftPos: 270, topPos: 50, pinimage: this.pinimage },
      { id: 9, leftPos: 320, topPos: 50, pinimage: this.pinimage },
      { id: 10, leftPos: 295, topPos: 70, pinimage: this.pinimage },
    ];

    for (var i = 0; i < this.Ball.length; i++) {
      this.ctx?.drawImage(
        this.Ball[i].pinimage,
        this.Ball[i].leftPos,
        this.Ball[i].topPos,
        70,
        70
      );
    }
  }

  // To load the ball in the lane
  loadBall() {
    this.ballThrown = false;
    this.gameStarted = true;
    this.ctx?.drawImage(this.ballimage, 295, 520, 70, 70);
  }

  // To start bowling
  startBowling() {
    this.ballThrown = true;
    this.ballReloaded = false;
    this.throwNumber += 1;
    this.animate();
  }

  // To reload the ball
  reloadBall() {
    this.ballThrown = false;
    this.ballReloaded = true;
    this.showStrikeOrSpare = false;
    this.currentPos = 125;
    this.x = 295;
    this.y = 520;

    if (this.allClear == true) {
      this.loadPins();
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (var i = 0; i < this.Ball.length; i++) {
        this.ctx?.drawImage(
          this.Ball[i].pinimage,
          this.Ball[i].leftPos,
          this.Ball[i].topPos,
          70,
          70
        );
      }
    }

    this.ctx?.drawImage(this.ballimage, 295, 520, 70, 70);
  }

  // To animate the movement of pins and ball
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.Ball.length; i++) {
      this.ctx?.drawImage(
        this.Ball[i].pinimage,
        this.Ball[i].leftPos,
        this.Ball[i].topPos,
        70,
        70
      );
    }

    this.ctx.drawImage(this.ballimage, this.x, this.y, 70, 70);

    this.y -= 5;

    if (this.y > this.currentPos) {
      requestAnimationFrame(() => this.animate());
    } else {
      requestAnimationFrame(() => this.checkBallYPostion());
    }
  }

  // To rearrange the pins
  reArrangePins() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.Ball.length; i++) {
      this.ctx?.drawImage(
        this.Ball[i].pinimage,
        this.Ball[i].leftPos,
        this.Ball[i].topPos,
        70,
        70
      );
    }
    this.ctx?.drawImage(this.ballimage, this.x, this.y, 70, 70);
  }

  clearPins() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.ballimage, this.x, this.y, 70, 70);
  }

  // Move ball to the left direction

  moveBallLeft() {
    if (this.x > 205) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.x -= 15;
      for (var i = 0; i < this.Ball.length; i++) {
        this.ctx?.drawImage(
          this.Ball[i].pinimage,
          this.Ball[i].leftPos,
          this.Ball[i].topPos,
          70,
          70
        );
      }
      this.ctx.drawImage(this.ballimage, this.x, this.y, 70, 70);
      this.checkBallXPosition();
      console.log(this.x);
    }
  }

  // Move ball to the right direction
  moveBallRight() {
    if (this.x < 380) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.x += 15;
      for (var i = 0; i < this.Ball.length; i++) {
        this.ctx?.drawImage(
          this.Ball[i].pinimage,
          this.Ball[i].leftPos,
          this.Ball[i].topPos,
          70,
          70
        );
      }
      this.ctx.drawImage(this.ballimage, this.x, this.y, 70, 70);
      this.checkBallXPosition();
      console.log(this.x);
    }
  }

  //Check X-axis position of ball
  checkBallXPosition() {
    if (this.x == 295) {
      this.currentPos = 125;
    }

    if ((this.x <= 280 && this.x > 250) || (this.x >= 310 && this.x < 340)) {
      this.currentPos = 100;
    }

    if ((this.x <= 250 && this.x > 220) || (this.x >= 340 && this.x < 370)) {
      this.currentPos = 75;
    }

    if ((this.x <= 220 && this.x >= 205) || (this.x >= 370 && this.x < 390)) {
      this.currentPos = 40;
    }
  }

  // To check y axis postion of the ball
  checkBallYPostion() {
    // For ball 1

    if (this.y == 125 && this.x == 295) {
      this.afftectedPins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      this.allClear = true;
    } else {
      this.allClear = false;
    }

    // For ball 2

    if (this.y == 100 && this.x <= 280 && this.x > 250) {
      this.afftectedPins = [1, 2, 3, 5, 6, 8];
    }

    // For ball 3

    if (this.y == 100 && this.x >= 310 && this.x < 340) {
      this.afftectedPins = [2, 3, 4, 6, 7, 9];
    }

    // For ball 4

    if (this.y == 75 && this.x <= 250 && this.x > 220) {
      this.afftectedPins = [1, 2, 5];
    }

    // For ball 6
    if (this.y == 75 && this.x >= 340 && this.x < 370) {
      this.afftectedPins = [3, 4, 7];
    }

    // For ball 7

    if (this.y == 40 && this.x <= 220 && this.x >= 205) {
      this.afftectedPins = [1];
    }

    // For ball 10
    if (this.y == 40 && this.x >= 370 && this.x < 390) {
      this.afftectedPins = [4];
    }

    this.checkIndex();
  }

  //Check whether strike or spare
  checkScore() {
    if (this.throwNumber == 1 && this.afftectedPins.length == 10) {
      this.isStrike = true;
      this.isSpare = false;
      this.overallScore += 10;
      this.showStrikeOrSpare = true;
    }

    if (
      this.isStrike == true &&
      (this.throwNumber == 2 || this.throwNumber == 3)
    ) {
      this.overallScore += this.afftectedPins.length;
    }

    if (this.isStrike == false) {
      this.overallScore += this.afftectedPins.length;
    }
  }

  // If game is won
  gameWon() {
    this.throwNumber = 0;
    this.gameWonStatus = true;
    this.gameLostStatus = false;
    this.gameFinished = true;
    this.gameStarted = true;
    this.ballThrown = true;
    this.ballReloaded = true;
    this.reArrangePins();
  }

  // If game is lost
  gameLost() {
    this.gameWonStatus = false;
    this.gameLostStatus = true;
    this.gameFinished = true;
    this.gameStarted = true;
    this.ballThrown = true;
    this.ballReloaded = true;
    this.reArrangePins();
  }

  // To reset the game
  resetGame() {
    this.x = 295;
    this.y = 520;
    this.throwNumber = 0;
    this.overallScore = 0;
    this.currentPos = 125;
    this.loadPins();
    this.gameStarted = false;
    this.ballThrown = true;
    this.ballReloaded = true;
    this.gameFinished = false;
    this.gameWonStatus = false;
    this.gameLostStatus = false;
  }

  // Check item index and splice
  checkIndex() {
    this.afftectedPins.forEach((element: any) => {
      var index = this.Ball.map((x: { id: any }) => {
        return x.id;
      }).indexOf(element);
      this.Ball[index].pinimage = new Image();
    });

    this.checkScore();
    this.reArrangePins();
  }
}
