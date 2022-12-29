import { Card, Deck } from './deck';

export function validMove(card1: Card, card2: Card, aroundCorner: boolean): boolean {
  const diff = Math.abs(card1.value - card2.value);
  if (diff === 1 || (aroundCorner && diff === 12)) return true;
  return false;
}

export class Golf {
  deck: Deck;
  aroundCorner: boolean;
  holes: Card[][];
  foundation: Card[];

  constructor(aroundCorner?: boolean, deck?: Deck) {
    this.aroundCorner = !!aroundCorner;
    this.deck = deck || new Deck();

    // deal the 7 holes 5 cards each
    const holes = [];
    for (let i = 0; i < 7; i++) {
      const hole: Card[] = [];
      for (let j = 0; j < 5; j++) {
        hole.push(this.deck.next());
      }
      holes.push(hole);
    }
    this.holes = holes;

    this.foundation = [this.deck.next()];
  }

  public getTopFoundation(): Card {
    if (this.foundation.length <= 0) throw new Error('The foundation is empty!');
    return this.foundation[this.foundation.length - 1];
  }

  /**
   * Play the card using the NON ZERO BASED INDEXED given row number.
   * Throws an error if the move is not possible
   * @param hole the index of the hole to play the card of
   */
  public play(hole: number) {
    if (hole < 1 || hole > 7) throw new Error('Hole must be between 1 and 7!');

    const foundationCard: Card = this.getTopFoundation();
    const targetHole: Card[] = this.holes[hole - 1];
    const targetCard: Card = targetHole[targetHole.length - 1];

    if (!validMove(foundationCard, targetCard, this.aroundCorner)) {
      throw new Error('The chosen card must be one away from the current foundation card!');
    }

    targetHole.pop();
    this.foundation.push(targetCard);
  }

  public toString() {
    let output = '';

    output += '[1]\t[2]\t[3]\t[4]\t[5]\t[6]\t[7]\n';
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        output += this.holes[j][i].toString() + '\t';
      }
      output += '\n';
    }
    output += '\n';
    output += `Cards Left: ${this.deck.cards.length}\n`;
    output += `Foundation: ${this.getTopFoundation().toString()}`;

    return output;
  }

  public gameState() {
    return true;
  }
}
