document.addEventListener("DOMContentLoaded", async () => {
    let start = document.querySelector("#start");
    start.addEventListener("click", async () => {
        let startGame = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2");
        let deckId = startGame.data.deck_id;
        
    })

})