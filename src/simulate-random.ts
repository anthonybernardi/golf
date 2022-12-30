import { Golf } from './golf';

function playGolf(aroundCorner?: boolean, shouldLog?: boolean) {
  const golf: Golf = new Golf(!!aroundCorner);

  while (golf.gameState === 'Playing') {
    shouldLog && console.log('\n' + golf.toString());
    const moves: number[] = golf.getValidMoves();
    if (moves.length > 0) {
      golf.play(moves[Math.floor(Math.random() * moves.length)]);
    } else {
      golf.draw();
    }
  }

  shouldLog && console.log(`FINAL: ${golf.gameState}`);
  return golf.gameState;
}

export function simulateRandomGames(n: number, aroundCorner?: boolean, shouldLog?: boolean): number {
  let wins = 0;

  for (let index = 0; index < n; index++) {
    const result = playGolf(aroundCorner, shouldLog);
    if (result === 'Won') wins++;
  }

  return wins;
}
