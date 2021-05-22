///////////////////////////////////////////////////////
//////////////////   VARIABLES   //////////////////////
///////////////////////////////////////////////////////


// Game Components
const grid = document.querySelector(".grid")
const displayBannerWin = document.querySelector('.display-banner-win');
const displayBannerLose = document.querySelector('.display-banner-lose');
const resetButton = document.querySelector(".reset");

// Card Components
const playingCardBack = document.querySelectorAll('.playing-card-back');
const cardsLinks = ["cards/boots.jpg", "cards/money.jpg", "cards/pistol.jpg", "cards/snake.jpg", "cards/villan.jpg", "cards/boots.jpg", "cards/money.jpg", "cards/pistol.jpg", "cards/snake.jpg", "cards/villan.jpg" ];

// Game Constants
const cardCount = document.querySelector(".cards_count");
const guessCount = document.querySelector('.guess_count');
let selectedCards = [];
let cardsArray = [];



///////////////////////////////////////////////////////
//////////////////   FUNCTIONS   //////////////////////
///////////////////////////////////////////////////////


// Game Setup
const displayWinBanner = () => {
  displayBannerWin.classList.remove('hidden');
}

const hideWinBanner = () => {
  displayBannerWin.classList.add("hidden");
}

const displayLoseBanner = () => {
  displayBannerLose.classList.remove("hidden")
}

const hideLoseBanner = () => {
  displayBannerLose.classList.add("hidden")
}

// Card Setup
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

const removeCardFromPlay = (id) => {
  const playingCard = document.querySelector(`[data-id="${id}"]`);
  playingCard.removeEventListener('click', eventFlipCard);
  playingCard.removeEventListener('click', addCardToSelected);
  playingCard.classList.add("playing-card-disabled")
}

const createCard = (i) => {
  let card = document.createElement("img")
  // card.setAttribute("src", `${cardsLinks[i]}`);
  card.setAttribute("src", "cards/card-back.jpg")
  card.setAttribute("class", `playing-card`);
  card.setAttribute('data-name', getCardName(cardsLinks[i]));
  card.setAttribute('data-id', i)
  card.addEventListener('click', eventFlipCard);
  card.addEventListener('click', addCardToSelected);
  return card;
}

const getCardName = (imgSrc) => {
  return imgSrc.split("/")[1]
}

// Grid Setup

const populateDeck = () => {
  for (let i = 0; i < 10; i++) {
    let card = createCard(i);
    cardsArray.push(card)
  }
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

// Game Rules

const updateScore = () => {
  cardCount.innerHTML = parseInt(cardCount.textContent) - 2;
}

const resetScore = () => {
  cardCount.innerHTML = 10;
}

const updateGuesses = () => {
  let guesses = parseInt(guessCount.innerHTML)
  guesses += 1;
  guessCount.innerHTML = guesses;
}

const resetGuesses = () => {
  guessCount.innerHTML = 0;
}


const addCardToSelected = (event) => {
  const selectedCard = event.target
  if (selectedCards.length < 1) {
    selectedCards.push(selectedCard)
  } else {
    compareCards(selectedCards[0], selectedCard)
  }
}

const emptySelectedCards =  () => {
  selectedCards = []
}

const compareCards = (selectedCard1, selectedCard2) => {
  const card1 = selectedCard1.dataset;
  const card2 = selectedCard2.dataset;
  if (card1.name === card2.name && card1.id !== card2.id) {
    removeCardFromPlay(card1.id);
    removeCardFromPlay(card2.id);
    updateScore();
    updateGuesses();
    emptySelectedCards();
    if(cardCount.innerHTML === "0") {
      displayWinBanner();
    }
  } else if (parseInt(guessCount.innerHTML) >= 10) {
    displayLoseBanner();
  } else {
    setTimeout(() => {
      flipCard(card1.id);
      flipCard(card2.id);
      emptySelectedCards();
      updateGuesses();
    }, 1000)
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
  hideLoseBanner();
  selectedCards = [];
  resetScore();
  resetGuesses();
}

// Setup Events
resetButton.addEventListener("click", resetGame)

// Create Playing Grid
// populateDeck();
// const finalDeck = shuffleDeck(cardsArray)
// populateGameGrid(finalDeck)
