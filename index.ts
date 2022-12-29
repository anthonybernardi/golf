import { Card, Deck } from './src/deck';
import { Golf, validMove } from './src/golf';

let successful = false;
while (!successful) {
  try {
    const golf = new Golf(true);
    const state1 = golf.toString();

    golf.play(1);
    const state2 = golf.toString();

    console.log(state1);
    console.log('\n\n');
    console.log(state2);
    successful = true;
  } catch (e: unknown) {}
}
