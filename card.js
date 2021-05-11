const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const getDeck = () => {

  let deck = new Array();

  for (let suit of suits) {
    for (let value of values) {
      card = {suit: suit, value: value}
      deck = [...deck, card]
    }
  }

  return deck;
}

const shuffleDeck = () => {

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

const splitCardsIntoDecks = () => {
  let shuffledDeck = shuffleDeck()

  let playerDeck1 = [];
  let playerDeck2 = [];

  for (let i = 0; i < shuffledDeck.length; i += 2) {
    playerDeck1.push(shuffledDeck[i]);
    playerDeck2.push(shuffledDeck[i+1])
  }

  return [playerDeck1, playerDeck2]
}


const playWar = () => {
  let deck1, deck2;

  [deck1, deck2] = splitCardsIntoDecks();

  while(deck1.length > 0 && deck2.length > 0) {
    let updatedDecks = compareCards(deck1, deck2);
    [deck1, deck2] = updatedDecks;
  }

  if (deck1.length > 0) {
    console.log("Player 1 Wins!")
  } else {
    console.log("Player 2 Wins!")
  }
}


// Need to shift cards from top of stack
const compareCards = (deck1, deck2) => {
  let card1 = deck1.shift();
  let card2 = deck2.shift();
  if (card1.value > card2.value) {
    deck1.push(card1);
    deck1.push(card2);
  } else if (card1.value < card2.value) {
    deck2.push(card2);
    deck2.push(card1)
  } else if (card1.value == card2.value) {
    deck1.push(card1);
    deck2.push(card2)
  }

  return [deck1, deck2];
}

playWar();
