document.addEventListener("DOMContentLoaded", async () => {
    try {
    let start = document.querySelector("#start");
    let deckId;
    let playerScore;
    let dealerScore;
    let cards;
    const scores = (cards) => {
        let score = 0;
        cards.forEach(card => {
            if (card.value === "QUEEN" || card.value === "KING" || card.value === "JACK") {
                card.value = 10;
                score += Number(card.value);
            } else if (card.value === "ACE") {
                if (score > 11) {
                    card.value = 1;
                    score += Number(card.value);
                } else {
                    card.value = 11;
                    score += Number(card.value);
                }
            } else {
                score += Number(card.value);
            }
        })
        return score;
    }
    start.addEventListener("click", async () => {
        let startGame = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2");
        deckId = startGame.data.deck_id;
        let drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
        cards = drawCards.data.cards;
        let player1 = document.querySelector("#player1");
        cards.forEach(card => {
            let image = document.createElement("img");
            image.src = card.image;
            player1.appendChild(image);
        })
        let p = document.querySelector("#pscore");
        playerScore = scores(cards);
        winner();
        p.innerText = `Your score is: ${scores(cards)}`;
        start.hidden = true;
    })
    let hit = document.querySelector("#hit");
    hit.addEventListener("click", async () => {
        let drawnCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        drawnCard.data.cards.forEach(card => {
            let player1 = document.querySelector("#player1");
            let image = document.createElement("img");
            image.src = card.image;
            player1.appendChild(image);
            cards.push(card);
        })
        let p = document.querySelector("#pscore");
        playerScore = scores(cards);
        winner();
        p.innerText = `Your score is: ${scores(cards)}`;
    })
    let stay = document.querySelector("#stay");
    stay.addEventListener("click", async () => {
        let computer = document.querySelector("#computer");
        let drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`);
        cards = drawCards.data.cards;
        cards.forEach(card => {
            let image = document.createElement("img");
            image.src = card.image;
            computer.appendChild(image);
        })
        let p = document.querySelector("#cscore");
        dealerScore = scores(cards);
        winner();
        p.innerText = `Dealer score is: ${scores(cards)}`;
    })
    let win = document.querySelector("#winner");
    const winner =()=>{
        if (playerScore === 21) {
            win.innerText = "BlackJack! You win!";
            
        } else if (playerScore > 21) {
            win.innerText = "You Busted!";
        } else if (dealerScore === 21) {
            win.innerText = "Dealer wins 21! You lose!";
        } else if (dealerScore > 21) {
            win.innerText = "Dealer busted! You win!";
        } else if (playerScore > dealerScore && playerScore < 21) {
            win.innerText = "Your score is higher! You win!";
        } else if (playerScore < dealerScore && playerScore < 21) {
            win.innerText = "Dealer wins by higher score!";
        }

    }

    } catch (error) {
        console.log(error)
    }


})