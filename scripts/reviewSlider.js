let cardCounter = 0;
let reviewCards = document.querySelectorAll(".review-card");
let numCards = reviewCards.length;

function updateScreenSize(){
    let screenWidth = window.innerWidth;

    return screenWidth;
}

function nextCard() {
    reviewCards.forEach(card => card.style.display = "none");
  
    const numCardsToDisplay = updateScreenSize() < 992 ? 1 : 3;
    cardCounter = (cardCounter + numCardsToDisplay) % numCards;
  
    for (let i = 0; i < numCardsToDisplay; i++) {
      reviewCards[(cardCounter + i) % numCards].style.display = "block";
    }
  }
  
  function previousCard() {
    reviewCards.forEach(card => card.style.display = "none");
  
    const numCardsToDisplay = updateScreenSize() < 992 ? 1 : 3;
    cardCounter = (cardCounter - numCardsToDisplay + numCards) % numCards;
  
    for (let i = 0; i < numCardsToDisplay; i++) {
      reviewCards[(cardCounter + i) % numCards].style.display = "block";
    }
  }