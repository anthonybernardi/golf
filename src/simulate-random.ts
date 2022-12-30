import { Golf } from './golf';

function playGolf(shouldLog: boolean) {
  const golf: Golf = new Golf(true);

  while (golf.gameState === 'Playing') {
    try {
      shouldLog && console.log('\n' + golf.toString());
      const moves: number[] = golf.getValidMoves();
      if (moves.length > 0) {
        golf.play(moves[Math.floor(Math.random() * moves.length)]);
      } else {
        golf.draw();
      }
    } catch (e: unknown) {}
  }

  shouldLog && console.log(`FINAL: ${golf.gameState}`);
  return golf.gameState;
}

export function simulateRandomGames(n: number, shouldLog?: boolean) {
  let wins = 0;
  for (let index = 0; index < n; index++) {
    const result = playGolf(!!shouldLog);
    if (result === 'Won') wins++;
  }

  return wins;
}
