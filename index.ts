import { Card, Deck } from './src/deck';
import { Golf, validMove } from './src/golf';

// const deck = new Deck();

// const golf = new Golf(true, deck);

// console.log(golf.toString());

// golf.play(1);

// console.log(golf.toString());

// let successful = false;
// while (!successful) {
//   try {
//     const golf = new Golf(true);
//     const state1 = golf.toString();
//     console.log(state1);

//     golf.play(1);
//     const state2 = golf.toString();
//     console.log('\n\n');

//     console.log(state2);
//     successful = true;
//   } catch (e: unknown) {
//     console.log('failed!!!');
//     console.log('\n\n');
//   }
// }

console.log(validMove(new Card(2, 'Hearts'), new Card(3, 'Clubs'), false));
