document.addEventListener("DOMContentLoaded", async () => {
    try {
        let start = document.querySelector("#start");
    let deckId;
    let playerScore;
    let computerScore;
    const score = (cards) => {
        let score = 0;
        cards.forEach(card => {
            if (card.value === "QUEEN" || card.value === "KING" || card.value === "JACK") {
                card.value = 10;
                score += Number(card.value);
            } else if (card.value === "ACE") {
                if (score > 11) {
                    card.value = 1;
                } else {
                    card.value = 11;
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
        let cards = drawCards.data.cards;
        let player1 = document.querySelector("#player1");
        cards.forEach(card => {
            // debugger
            let image = document.createElement("img");
            image.src = card.image;
            player1.appendChild(image);
        })
        playerScore = score(cards);
        let p = document.querySelector("#pscore")
        p.innerText = `Your score is: ${score(cards)}`;
        player1.appendChild(playerScore);
    })
    let hit = document.querySelector("#hit");
    hit.addEventListener("click", async () => {
        let drawnCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        drawnCard.data.cards.forEach(card => {
            let player1 = document.querySelector("#player1");
            let image = document.createElement("img");
            image.src = card.image;
            player1.appendChild(image);
        })
        // let newScore = score(cards);
        += Number(card.value);
    })
    let stay = document.querySelector("#stay");
    stay.addEventListener("click", async () => {
        let computer = document.querySelector("#computer");
        let drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`);
        let cards = drawCards.data.cards;
        cards.forEach(card => {
            let image = document.createElement("img");
            image.src = card.image;
            computer.appendChild(image);
        })
        computerScore = score(cards);
        let p = document.querySelector("#cscore");
        p.innerText = `Computer score is: ${score(cards)}`
        computer.appendChild(computerScore);
    })
    } catch (error) {
        console.log(error)
    }

})