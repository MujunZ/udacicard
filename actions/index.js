export const SET_DECKS = 'SET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function setDecks (decks) {
    return {
        type: SET_DECKS,
        decks
    }
}

export function addDeck (deckName) {
    return {
        type: ADD_DECK,
        deckName
    }
}

export function addCard ({ deckKey, question, answer }) {
    return {
        type: ADD_CARD,
        deckName: deckKey, 
        question, 
        answer,
    }
}