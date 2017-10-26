import { SET_DECKS, ADD_DECK, ADD_CARD } from "../actions";
import { AsyncStorage } from 'react-native';

export const DECK_STORAGE_KEY = '@Udacicards:deck';

let deckData = {
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
    const { decks, deckName, question, answer } = action
    let deckData = {
        ...state.deckData
    };
    switch (action.type) {
        case SET_DECKS:
            if(decks){
                return JSON.parse(decks);
            } else {
                return state;
            }
        case ADD_DECK:
            deckData[deckName] = {title: `${deckName}`, questions: []}
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({deckData}));
            return {deckData};
        case ADD_CARD:
            const questions = [
                ...deckData[deckName].questions
            ]
            questions.push({ question, answer })
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({deckData: {...deckData, [deckName]: {...deckData[deckName], questions}}}));
            return {deckData: {...deckData, [deckName]: {...deckData[deckName], questions}}};
        default :
            return state
    }
}

export default decks;