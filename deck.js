class Deck {
  suits = ["spades", "diamonds", "clubs", "hearts"];
  values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  getDeck = () => {

    let deck = new Array();

    for (let suit of suits) {
      for (let value of values) {
        card = {suit: suit, value: value}
        deck = [...deck, card]
      }
    }

    return deck;
  }

  shuffleDeck = () => {

    let deck = getDeck();

    for (let i = 0; i < 1000; i++) {
      let cardPosition1 = Math.floor(Math.random()*51);
      let cardPosition2 = Math.floor(Math.random()*51);

      while (cardPosition1 == cardPosition2) {
        cardPosition2 = Math.floor(Math.random()*51);
      }

      let placeholder = deck[cardPosition1];
      deck[cardPosition1] = deck[cardPosition2];
      deck[cardPosition2] = placeholder;
    }

    return deck;
  }

  splitCardsIntoDecks = () => {
    let shuffledDeck = shuffleDeck()

    let playerDeck1 = [];
    let playerDeck2 = [];

    for (let i = 0; i < shuffledDeck.length; i += 2) {
      playerDeck1.push(shuffledDeck[i]);
      playerDeck2.push(shuffledDeck[i+1])
    }

    return [playerDeck1, playerDeck2]
  }
}

const deck1 = new Deck();
deck1 = deck1.shuffleDeck();

console.log(deck1)
