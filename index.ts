import { Card, Deck } from './src/deck';
import { Golf, validMove } from './src/golf';

const golf: Golf = new Golf(true);

while (golf.gameState === 'Playing') {
  try {
    console.log(golf.toString());
    console.log('\n\n');
    const moves: number[] = golf.getValidMoves();
    if (moves.length > 0) {
      golf.play(moves[Math.floor(Math.random() * moves.length)]);
    } else {
      golf.draw();
    }
  } catch (e: unknown) {}
}
