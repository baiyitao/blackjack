
// ============================================================================
// Blackjack game.
// ============================================================================

var deck;
var dealer;
var player;

var dealRoundCounter;

// Initialize game on page load.
window.onload = initGame;

function initGame() {
  // Initialize card deck.
  deck = new Stack();
  deck.makeDeck();
  deck.shuffle();

  // Create dealer and player hand.
  dealer = new Hand("dealer");
  player= new Hand("player");
}


function getNextCard() {

  // If there are no cards left, start a new deck.

  if (deck.cardCount() == 0) {
    alert("New Deck");
    newDeck();
  }

  return deck.deal();
}
//click to continue
function startRound() {

  // Reset all hands.
  dealer.reset();
  player.reset();

  // Start dealing the cards.
  dealRoundCounter = 1;
  dealRound();
}


function dealRound()
{
  // Deal a card to the player or the dealer based on the counter.
  switch(dealRoundCounter)
  {
    case 1:
      player.addCard(getNextCard());
      break;

    case 2:
      dealer.addCard(getNextCard());
      break;

    case 3:
      player.addCard(getNextCard());
      break;

    case 4:
      dealer.addCard(getNextCard());
      break;

    default:
      // No more cards to deal, play the round.
      playRound();
      return;
      break;
  }

  // Update the player's score.
  if (player.getScore() == 21) {
    player.blackjack = true;
  }

  // Set a timer for the next call.
  dealRoundCounter++;
  setTimeout(dealRound, 1);
}


function playRound() {
  // Check for dealer blackjack.
  if (dealer.getScore() == 21) {
    dealer.blackjack = true;
  }

  // If player or dealer has blackjack, end the round.
  if (player.blackjack || dealer.blackjack) {
    endRound();
    return;
  }
}

function playerHit() {

  var p;
  player.addCard(getNextCard());
  p = player.getScore();

  console.log("hit, score is: " + p );

  // If the player has busted, go to the next hand.

  if (p > 21) {
    startDealer();
    return;
  }

  // If the player has reached 21, or is doubling down, go on to the next hand.

  if (p == 21 ) {
    startDealer();
    return;
  }

}


function startDealer() {

  if (player.getScore() > 21) {
    endRound();
    return;
  }

  // Otherwise, highlight the dealer's hand, show the down card and score and
  // play the hand.

  setTimeout(playDealer, 1);
}


function playDealer() {

  var d;
  // Get and show the dealer's score.
  d = dealer.getScore();

  // If the dealer's total is less than 17, set up to deal another card.
  if (d < 17) {
    console.log("dealer < 17");
    setTimeout(dealToDealer, 1);
    return;
  }
  // Check if the dealer busted.

  if (d > 21)
    console.log("dealer > 21");
  endRound();
}


function dealToDealer() {

  // Give the dealer another card and check the result.

  dealer.addCard(getNextCard());
  playDealer();
}

function endRound() {

  var  d, p;
  // Show the dealer's down card and score.

  d = dealer.getScore();
  console.log("dealer score: "+ d);


  // Show result of each player hand and pay it off, if appropriate.


  p = player.getScore();
  console.log("player score: "+ p);
  if ((player.blackjack && !dealer.blackjack) ||
           (p <= 21 && d > 21) || (p <= 21 && p > d)) {
    console.log("Player Wins");

  }
  else if ((dealer.blackjack && !player.blackjack) ||
           p > 21 || p < d) {
    console.log("Player Loses");
  }
  else {
      console.log("Push");
  }
}
