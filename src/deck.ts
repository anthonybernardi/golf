const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'] as const;
export type Suit = typeof suits[number];

const colors = ['Black', 'Red'] as const;
export type Color = typeof colors[number];

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
export type Value = typeof values[number];

const suitToColor = (suit: Suit): Color => {
  if (suit === 'Hearts' || suit === 'Diamonds') return 'Red';
  else return 'Black';
};

const valueToString = (value: Value): string => {
  switch (value) {
    case 1:
      return 'A';
    case 11:
      return 'J';
    case 12:
      return 'Q';
    case 13:
      return 'K';
    default:
      return `${value}`;
  }
};

const suitToSymbol = (suit: Suit): string => {
  switch (suit) {
    case 'Hearts':
      return '♥';
    case 'Diamonds':
      return '♦';
    case 'Spades':
      return '♠';
    case 'Clubs':
      return '♣';
  }
};

const shuffleDeck = (deck: Card[]): void => {
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};

export class Card {
  value: Value;
  suit: Suit;
  color: Color;

  constructor(value: Value, suit: Suit) {
    this.value = value;
    this.suit = suit;
    this.color = suitToColor(suit);
  }

  public toString() {
    return `${valueToString(this.value)}${suitToSymbol(this.suit)}`;
  }
}

export class Deck {
  cards: Card[];

  constructor(cards?: Card[]) {
    if (cards) {
      this.cards = cards;
      return;
    }

    const defaultDeck: Card[] = [];

    suits.forEach((suit: Suit) => {
      values.forEach((value: Value) => {
        const card = new Card(value, suit);
        defaultDeck.push(card);
      });
    });

    shuffleDeck(defaultDeck);
    this.cards = defaultDeck;
  }

  public next(): Card {
    const card = this.cards.shift();
    if (!card) throw new Error('This deck is empty!');
    return card;
  }

  public peek(): Card | null {
    if (this.cards.length > 0) {
      return this.cards[0];
    }
    return null;
  }

  public toString() {
    return this.cards.map((card) => card.toString()).join('\t');
  }
}
