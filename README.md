# Golf

Golf solitaire is a solitaire variant that I play a lot and also lose at a lot. I made this project to see how often that was my fault and how often it wasn't. I used a Depth First Search algorithm to brute force solve games of Golf solitaire to see how often there is a winning solution. [Golf solitaire can be played here.](https://cardgames.io/golfsolitaire/)

Golf solitaire is a variant of solitaire with 7 'holes' that are dealt 5 cards each. The player has a 'foundation' pile which has one card face up. To move, the player can move one card from the bottom of any of the holes to their foundation as long as it is one off of their foundation card. For example, if the player has a `2` in their foundation, they could move a `3` or an `Ace` to the top of their foundation. If they chose the `3`, they could then choose a `2` or a `4`. If no moves can be made, the player must draw a new card from the remainder of the deck to place on top of their foundation. If the player empties all the holes, they win. If they run out of moves and draws before doing that, they lose.

## Results

Here is an example output of running the program:

```
this simulation won 3/10 brute force games
this simulation won 8/10 brute force around corner games
this simulation won 114/10000 random games
this simulation won 931/10000 random around corner games
```

This is pretty consistent with even larger `n` values. Allowing "around corner" moves (Ace to King and vice versa) seems to greatly enhance the odds of winning Golf solitaire. I definitely don't win 8/10 of my around corner games, which means I am probably not very good at Golf solitaire. Darn.

## How to Run

To run this program, clone the repo, run `yarn install`, then run `yarn go`.

Modify `index.ts` with different parameters to simulate whatever you want.
