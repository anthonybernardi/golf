import { GameState, Golf } from './golf';

export function bruteForce(aroundCorner?: boolean): GameState {
  const golfStack: Golf[] = [new Golf(!!aroundCorner)];

  while (golfStack.length > 0) {
    const last: Golf = golfStack.pop()!;
    const moves: number[] = last.getValidMoves();

    if (last.gameState === 'Won') return 'Won';
    if (last.gameState === 'Lost') continue;

    if (moves.length > 0) {
      moves.forEach((move) => {
        const clone = last.clone();
        clone.play(move);
        golfStack.push(clone);
      });
    } else {
      last.draw();
      golfStack.push(last);
    }
  }

  return 'Lost';
}

export function bruteForceGames(n: number, aroundCorner?: boolean): number {
  let won = 0;
  for (let i = 0; i < n; i++) {
    const state = bruteForce(aroundCorner);
    if (state === 'Won') won++;
  }
  return won;
}
