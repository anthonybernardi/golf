import { Card, Deck } from './deck';

export type GameState = 'Playing' | 'Lost' | 'Won';

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
  gameState: GameState;

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
    this.gameState = 'Playing';
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

    const valid = validMove(foundationCard, targetCard, this.aroundCorner);
    if (!valid) throw new Error('The chosen card must be one away from the current foundation card!');

    targetHole.pop();
    this.foundation.push(targetCard);

    this.updateGameStatus();
  }

  public draw() {
    if (this.deck.cards.length === 0) throw new Error('The deck is empty!');
    this.foundation.push(this.deck.next());
    this.updateGameStatus();
  }

  /**
   * Get the current valid moves.
   * @returns a list of the hole numbers (1-7) that are valid moves
   */
  public getValidMoves(): number[] {
    const moves: number[] = [];
    this.holes.forEach((hole: Card[], index: number) => {
      const targetCard: Card = hole[hole.length - 1];
      if (targetCard && validMove(this.getTopFoundation(), targetCard, this.aroundCorner)) moves.push(index + 1);
    });

    return moves;
  }

  public getCardsLeftInHoles(): number {
    return this.holes.reduce((partialSum: number, currentHole: Card[]) => partialSum + currentHole.length, 0);
  }

  public updateGameStatus() {
    const cardsLeftInHoles = this.getCardsLeftInHoles();
    if (cardsLeftInHoles === 0 || (this.getValidMoves().length === 0 && this.deck.cards.length === 0)) {
      this.gameState = cardsLeftInHoles > 0 ? 'Lost' : 'Won';
    }
  }

  public toString() {
    let output = '';

    output += '[1]\t[2]\t[3]\t[4]\t[5]\t[6]\t[7]\n';
    for (let i = 0; i < 5; i++) {
      let line = '';
      for (let j = 0; j < 7; j++) {
        const card = this.holes[j][i];
        line += (card ? card.toString() : '') + '\t';
      }

      if (line.trim() !== '') output += line + '\n';
    }
    output += '\n';
    output += `Cards Left: ${this.deck.cards.length}\n`;
    output += `Foundation: ${this.getTopFoundation().toString()}`;

    return output;
  }

  public clone(): Golf {
    const clone: Golf = new Golf();
    const clonedCards: Card[] = [...this.deck.cards];

    const clonedDeck: Deck = new Deck();
    clonedDeck.cards = clonedCards;
    clone.deck = clonedDeck;

    clone.aroundCorner = this.aroundCorner;
    clone.gameState = this.gameState;

    const clonedFoundation: Card[] = [...this.foundation];
    clone.foundation = clonedFoundation;

    const clonedHoles: Card[][] = [];

    for (let i = 0; i < this.holes.length; i++) {
      const clonedHole: Card[] = [...this.holes[i]];
      clonedHoles.push(clonedHole);
    }

    clone.holes = clonedHoles;

    return clone;
  }
}
