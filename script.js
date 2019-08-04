class Deck {
    constructor(){
        this.deck = [];
        this.dealtCards = [];
    }

    generateDeck(){
        let card = (suit, value) => {
            this.name = value + " of " + suit;
            this.suit
            this.value

            return {name:this.name, suit:this.suit, value: this.value}
        }

        let values = ["1","2","3","4","5","6","7","8","9","J","Q","K","A"];
        let suits = ["clubs","Diamonds","hearts","Spades"];

         for(let s = 0; s < suits.length; s++){
            for(let v = 0; v < values.length; v++){
                    this.deck.push(card(suits[s],values[v]));
            }
         }
    }

    print_deck() {
        if(this.deck.length == 0){
            console.log("The deck has been generated")
        }else{
            for(let c = 0; c < this.deck.length; c++){
                console.log(this.deck)
            }
        }
    }
}




deck = new Deck();
deck.generateDeck()
deck.print_deck();