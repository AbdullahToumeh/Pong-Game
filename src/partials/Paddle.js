import { SVG_NS} from '../settings';


export default class Paddle {
    constructor(boardHeight, boardWidth, width, height, x, y, up, down, leftplayer1, rightplayer1, player) {
      this.boardHeight = boardHeight;
      this.boardWidth = boardWidth;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speed = 10;
      this.score = 0;

      this.player = player;
      this.keyState = {};

      document.addEventListener('keydown', event => {
        this.keyState[event.key || event.which] = true;
      }, true);
  
      document.addEventListener('keyup', event => {
        this.keyState[event.key || event.which] = false;
      }, true);

      document.addEventListener('keyleft', event => {
        this.keyState[event.key || event.which] = true;
      }, true);
  
      document.addEventListener('keyright', event => {
        this.keyState[event.key || event.which] = false;
      }, true);


              
    }// constructor

    up() {
        this.y = Math.max(0, this.y - this.speed);
    }

    down() {
        this.y = Math.min(this.boardHeight - this.height, this.y + this.speed );
    }

    leftplayer1() {
        this.x = Math.max(10, this.x - this.speed);
    }

    rightplayer1() {
        this.x = Math.min((this.boardWidth) / 5, this.x + this.speed);
    }

    leftplayer2() {
        this.x = Math.max((this.boardWidth) - (this.boardWidth) / 5, this.x - this.speed);
    }

    rightplayer2() {
        this.x = Math.min(this.boardWidth - this.width - 10 , this.x + this.speed);
    }
    
    // helper method
    coordinates(x, y, width, height) {
        let leftX = x;
        let rightX = x + width;
        let topY = y;
        let bottomY = y + height;
        return [leftX, rightX, topY, bottomY];
    }


    
    //...
    render (svg) {
        // Player movement
        if (this.keyState['w'] && this.player === 'player1') {
            this.up();
        }
        if (this.keyState['s'] && this.player === 'player1') {
            this.down();
        }
        if (this.keyState['a'] && this.player === 'player1') {
            this.leftplayer1();
        }
        if (this.keyState['d'] && this.player === 'player1') {
            this.rightplayer1();
        }
//////////////////////
        if (this.keyState['ArrowUp'] && this.player === 'player2') {
            this.up();
        }
        if (this.keyState['ArrowDown'] && this.player === 'player2') {
            this.down();
        }
        if (this.keyState['ArrowLeft'] && this.player === 'player2') {
            this.leftplayer2();
        }
        if (this.keyState['ArrowRight'] && this.player === 'player2') {
            this.rightplayer2();
        }
        // draw all of our svg elements
        let rect = document.createElementNS(SVG_NS, 'rect');
		rect.setAttributeNS(null, 'fill' , 'white');
        rect.setAttributeNS(null, 'width' , this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'x', this.x);  //x of the top left corner
        rect.setAttributeNS(null, 'y', this.y);  //y of the top left corner

        svg.appendChild(rect);

    }
}