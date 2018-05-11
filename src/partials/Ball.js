import { SVG_NS} from '../settings';

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
      this.radius = radius;
      this.boardWidth = boardWidth;
      this.boardHeight = boardHeight;
      this.direction = 1;

      this.reset();
    }

    reset() {
      this.x = this.boardWidth / 2;
      this.y = this.boardHeight / 2;
      this.vy = Math.floor(Math.random() * 10 - 5);
      this.vx = this.direction * (6 - Math.abs(this.vy));
    }
  

// args you can pass in , think 
  render (svg, player1, player2) {
    // this.x = this.x

    this.x += this.vx;
    this.y += this.vy;



    // draw all of our svg elements
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r' , this.radius);
    circle.setAttributeNS(null, 'cx' , this.x ); // x of the center point
    circle.setAttributeNS(null, 'cy' , this.y ); // y of the center point
    circle.setAttributeNS(null, 'fill', 'red');
    
    svg.appendChild(circle);

}
}