import { bruteForceGames } from './src/brute-force';
import { simulateRandomGames } from './src/simulate-random';

const nBruteForce = 10;
const nRandom = 10000;

const wonBruteForce = bruteForceGames(nBruteForce);
console.log(`this simulation won ${wonBruteForce}/${nBruteForce} brute force games`);

const wonRandom = simulateRandomGames(nRandom);
console.log(`this simulation won ${wonRandom}/${nRandom} random games`);
