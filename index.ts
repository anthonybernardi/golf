import { bruteForceGames } from './src/brute-force';
import { simulateRandomGames } from './src/simulate-random';

const nBruteForce = 10;
const nRandom = 10000;

const wonBruteForce = bruteForceGames(nBruteForce, false);
console.log(`this simulation won ${wonBruteForce}/${nBruteForce} brute force games`);

const wonBruteForceAroundCorner = bruteForceGames(nBruteForce, true);
console.log(`this simulation won ${wonBruteForceAroundCorner}/${nBruteForce} brute force around corner games`);

const wonRandom = simulateRandomGames(nRandom);
console.log(`this simulation won ${wonRandom}/${nRandom} random games`);

const wonRandomAroundCorner = simulateRandomGames(nRandom, true);
console.log(`this simulation won ${wonRandomAroundCorner}/${nRandom} random around corner games`);
