import { SET_DECKS, ADD_DECK, ADD_CARD } from "../actions";
import { AsyncStorage } from 'react-native';

export const DECK_STORAGE_KEY = '@Udacicards:deck';

const deckData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
};

function decks (state = { deckData }, action ) {
    const { decks, deckName, card } = action
    switch (action.type) {
        case SET_DECKS:
            if(decks){
                return JSON.parse(decks);
            } else {
                return state;
            }
        case ADD_DECK:
            let addDeckState = state;
            addDeckState.deckData[`${deckName}`] = {title: `${deckName}`, questions: []}
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(addDeckState));
            return addDeckState;
        case ADD_CARD:
            const deckID = card.deck;
            let newState = {
                ...state,
                [deckID]: {
                    ...deckID,
                    questions: {
                        ...questions,
                        card
                    }
                }
            }
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(newState));
            return newState;
        default :
            return state
    }
}

export default decks;