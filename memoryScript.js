// Declare all variable for page
const cardCount = document.querySelector(".cards_count");
const resetButton = document.querySelector(".reset");
const grid = document.querySelector(".grid")
// const playingCard = document.querySelectorAll('.playing-card')
const playingCardBack = document.querySelectorAll('.playing-card-back')
const cardsLinks = ["cards/boots.jpg", "cards/money.jpg", "cards/pistol.jpg", "cards/snake.jpg", "cards/villan.jpg", "cards/boots.jpg", "cards/money.jpg", "cards/pistol.jpg", "cards/snake.jpg", "cards/villan.jpg" ]
const displayBanner = document.querySelector('.display-banner')
let cardsArray = []

// Game Constants
const selectedCards = []
const correctGuessIds = []

const currentGuesses = document.querySelector('.current_guesses')
// currentGuesses.innerHTML = selectedCards.length || 0

const updateScore = () => {
  cardCount.innerHTML = parseInt(cardCount.textContent) - 2
}

const displayWinBanner = () => {
  displayBanner.classList.remove('hidden');
}

const hideWinBanner = () => {
  displayBanner.classList.add("hidden");
}

const addCardToSelected = (event) => {
  // Add logic to check if card is already in
  if (selectedCards.length < 1) {
    const selectedCard = event.target
    selectedCards.push({name: selectedCard.dataset.name, id: selectedCard.dataset.id})
    console.log(selectedCards)
  } else {
    selectedCards.push()

  }
}

// Need to refactor flipCard to flipCard(id) and flipCardAction(event)

const compareCards = (selectedCard1, selectedCard2) => {
  const card1 = selectedCard1.dataset;
  const card2 = selectedCard2.dataset;
  if (card1.name === card2.name) {
    removeCardFromPlay(card1.id);
    removeCardFromPlay(card2.id);
    updateScore();
  } else {
    flipCard(card1.id);
    flipCard(card2.id);
  }
}

// Target card object by id or data-name or data-id

const removeCardFromPlay = (id) => {
  const playingCard = document.querySelector(`[data-id="${id}"]`)
  playingCard.removeEventListener('click', flipCard);
  playingCard.classList.add("playing-card-disabled")
}

// Card, Deck and Grid Setup
const incrementCount = () => {
  let previousCount = parseInt(cardCount.textContent);
  let newCount = previousCount + 1;
  cardCount.innerHTML = newCount;
}

const flipCard = (id) => {
  let selectedCard = document.querySelector(`[data-id="${id}"]`)
  let imgPathValue = selectedCard.getAttribute("src")
  const cardBackPathValue = "cards/card-back.jpg"

  if (imgPathValue === cardBackPathValue) {
    selectedCard.setAttribute("src", `cards/${selectedCard.getAttribute("data-name")}`)
  } else if (imgPathValue !== cardBackPathValue) {
    selectedCard.setAttribute("src", cardBackPathValue);
  }
}

const eventFlipCard = (event) => {
  const id = event.target.dataset.id
  flipCard(id)
}

const getCardName = (imgSrc) => {
  return imgSrc.split("/")[1]
}

const createCard = (i) => {
  let card = document.createElement("img")
  // card.setAttribute("src", `${cardsLinks[i]}`);
  card.setAttribute("src", "cards/card-back.jpg")
  card.setAttribute("class", `playing-card`);
  card.setAttribute('data-name', getCardName(cardsLinks[i]));
  card.setAttribute('data-id', i)
  card.addEventListener('click', eventFlipCard);
  card.addEventListener('click', addCardToSelected)
  return card;
}

const populateDeck = () => {
  for (let i = 0; i < 10; i++) {
    let card = createCard(i);
    cardsArray.push(card)
  }

  // for (let i = 0; i < cardsArray.length; i++) {
  //   grid.appendChild(cardsArray[i])
  //   grid.appendChild(cardsArray[i])
  // }
}

const shuffleDeck = (deck) => {
  let shuffledDeck = []
  let deckLength = deck.length;

  while(deck.length > 0) {
    let randomIndex = Math.floor(Math.random() * deckLength);
    shuffledDeck.push(deck[randomIndex])
    deck.splice(randomIndex, 1)
    deckLength -= 1;
  }

  return shuffledDeck;
}

const populateGameGrid = (deck) => {
  for (let i = 0; i < deck.length; i++) {
    grid.appendChild(deck[i])
    grid.appendChild(deck[i])
  }
}

const resetGrid = () => {
  while(grid.firstChild) {
    grid.removeChild(grid.lastChild)
  }
}

const resetGame = () => {
  resetGrid();
  populateDeck();
  const finalDeck = shuffleDeck(cardsArray);
  populateGameGrid(finalDeck);
  // Reset Cards Remaining Counter to 10
  // Reset Guesses Counter to 0
  hideWinBanner();
}

// Game Logic
/*
1) When card is selected check if array is empty
2) If array is empty then push node in
3) If array is not empty, check if the data-names are the same
4) If so change the border style on both cards to orange-red, move the data-ids to the found cards array and empty out check queue
5) If not flip both cards back over and empty out the queue
6) The game is over when the guessed card length is equal to 10
*/

/* Game Logic
1) New fresh game and board is displayed
2) Player clicks on a single card
3) selectedCard Array checks it's length to determine what to do
  3A) If array is empty we push this card to the array
  3B) If array has a lenght of one then we need to compare the cards
    3a) If cards have the same data-name:
      1) change the style of both cards to have a red border
      2) remove the hover effect and increase size of card to 1.07
      3) remove eventListener
      4) empty out array of selected cards
      5) increment guesses made by 1
      6) subtract 2 from the cards remaining count
        1) If cards remaining count is 0, set alert for game won
    3b) If cards do not have teh same data-name:
      1) increment guesses made by 1
      2) flip over both cards
      3) empty out the array of selected cards

*/


const selectCard = () => {

}

const compareSelectedCards= () => {

}



// Setup Events
resetButton.addEventListener("click", resetGame)

// Create Playing Grid
populateDeck();
const finalDeck = shuffleDeck(cardsArray)
populateGameGrid(finalDeck)
