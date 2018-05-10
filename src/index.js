import './styles/game.css';
import  Board from './partials/Board'
import Game from './partials/Game'

// create a game instance
const game = new Game('game', 512, 256);

(function gameLoop() {
    game.render();
    //recursion
    requestAnimationFrame(gameLoop);
    // setInterval();//
})();
