let deck = {};
let player1Score = 0;
let player2Score = 0;

// function getStartingCards(){
//     getAnotherCard($(".player1"));
//     getAnotherCard($(".player1"));
//     getAnotherCard($(".player2"));
//     getAnotherCard($(".player2"));
// }

httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        let response = JSON.parse(httpRequest.response);
        if (response.success) {
            deck.id = response.deck_id;
        }
    }
};

httpRequest.open(
    'GET',
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
);
httpRequest.send();

function getAnotherCard(element) {
    let cardHttpRequest = new XMLHttpRequest();
    cardHttpRequest.onreadystatechange = () => {
        if (cardHttpRequest.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(cardHttpRequest.response);
            if (response.success) {
                // add a card
                let location = $(element).parent();
                $(location, ".playerCards").append("<img src='" + response.cards[0].image + "'>");

                //get the value of the card
                let score = response.cards[0].value;
                if(score === "KING" || score === "JACK" || score === "QUEEN"){
                    score = 10;
                }
                if(score === "ACE"){
                    score = 11;
                }
                score = Number(score);

                //add the value to the right player's score
                let whichPlayer = location[0].className;
                console.log(whichPlayer);
                if(whichPlayer === "player1"){
                    player1Score += score;
                    document.getElementById("p1Score").innerText = `Score: ${player1Score}`;
                }
                else{
                    player2Score += score;
                    document.getElementById("p2Score").innerText = `Score: ${player2Score}`;
                }
            }
        }
    };

    cardHttpRequest.open(
        'GET',
        `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=1`
    );

    cardHttpRequest.send();
}