//1.card
function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
}

//2.deck
function Stack() {

  // Create an empty array of cards.
  this.cards = new Array();

  this.makeDeck  = stackMakeDeck;
  this.shuffle   = stackShuffle;
  this.deal      = stackDeal;
  this.cardCount = stackCardCount;
}

function stackMakeDeck() {

  var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "J", "Q", "K");
  var suits = new Array("C", "D", "H", "S");
  var j, k;
  var m;

  m = ranks.length * suits.length;

  // Set array of cards.
  this.cards = new Array(m);

  for (j = 0; j < suits.length; j++)
    for (k = 0; k < ranks.length; k++)
      this.cards[j * ranks.length + k] = new Card(ranks[k], suits[j]);
}

function stackShuffle() {

  var j, k;
  var temp;

  for (j = 0; j < this.cards.length; j++) {
    k = Math.floor(Math.random() * this.cards.length);
    temp = this.cards[j];
    this.cards[j] = this.cards[k];
    this.cards[k] = temp;
  }
}

function stackDeal() {

  if (this.cards.length > 0)
    return this.cards.shift();
  else
    return null;
}

function stackCardCount() {

  return this.cards.length;
}


//3.player
function Hand(id) {

  this.cards = new Array();

  this.reset      = handReset;
  this.addCard    = handAddCard;
  this.getScore   = handGetScore;

  // Initialize as an empty hand.
  this.reset();
}

function handReset() {
  this.cards = new Array();
  this.blackjack = false;
}

function handAddCard(card) {

  var n;
  // Add the given card to the hand.
  n = this.cards.length;
  this.cards[n] = card;

}

function handGetScore() {

  var i, total;
  total = 0;

  // Total card values counting Aces as one.

  for (i = 0; i < this.cards.length; i++)
    if (this.cards[i].rank == "A")
      total++;
    else {
      if (this.cards[i].rank == "J" || this.cards[i].rank == "Q" ||
          this.cards[i].rank == "K")
        total += 10;
      else
        total += parseInt(this.cards[i].rank, 10);
    }

  // Change as many ace values to 11 as possible.

  for (i = 0; i < this.cards.length; i++)
    if (this.cards[i].rank == "A" && total <= 11)
      total += 10;

  return total;
}
