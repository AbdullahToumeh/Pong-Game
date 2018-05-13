import Winner from './Winner';
import Score from './Score';
import Ball from './Ball';
import Paddle from './Paddle';
import Board from './Board';
import { SVG_NS, KEYS } from '../settings';
 
export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(this.element);

		//pause
		document.addEventListener('keydown', event => {
			if ( event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		});

		this.board = new Board(this.width, this.height);
		this.ball1 = new Ball(8, this.width,this.height);
		this.ball2 = new Ball(8, this.width,this.height);
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;	

		this.player1 = new Paddle(
		this.height,
		this.width,
		this.paddleWidth,
		this.paddleHeight,
		this.boardGap,
		((this.height - this.paddleHeight) / 2),
		KEYS.w,
		KEYS.s,
		KEYS.a,
		KEYS.d,
		'player1'
		);
		
		this.player2 = new Paddle(
		this.height,
		this.width,
		this.paddleWidth,
		this.paddleHeight,
		(this.width - this.boardGap - this.paddleWidth),
		((this.height - this.paddleHeight) / 2),
		KEYS.up,
		KEYS.down,
		KEYS.left,
		KEYS.right,
		'player2'
		);

		this.score1 = new Score(this.width / 2 - 50 , 30, 30);
		this.score2 = new Score(this.width / 2 + 25, 30, 30);

		this.winner = new Winner(this.width / 2 - 125 , 150, 40);

	}// constructor

	render() {
		//return pause
		if (this.pause) {
			return;
		}

		//be sure to empty out the last frame before re-rendering
		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);
		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball1.render(svg, this.player1, this.player2);
		this.ball2.render(svg, this.player1, this.player2);
		// render and update the score component based on player score
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);

		if(this.player1.score === 3 || this.player2.score === 3) {
			this.winner.render(svg);
			this.ball.reset();

		}
	}
}