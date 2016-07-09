import C from '../constants';
import StudyTabNavigationReducer from './StudyTabNavigationReducer';

export default StudyTabNavigationReducer;

const initialState = {
  key: C.S_STUDYTAB,
  selectedSection: "",
  selectedCarddeck: "",

  sections: {
    isFetching: false,
    didInvalidate: true,
    lastUpdated: 0,
    items: []
  },

  carddecksForSection: [],
  flashcardsForDeck: [],

  entities: {
    sections: {},
    carddecks: {},
    flashcards: {},
  }
};
export function decksReducer(state, action) {
  switch (action.type) {
    case C.INVALIDATE_SECTION_DECKS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case C.REQUEST_SECTION_DECKS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case C.RECEIVE_SECTION_DECKS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.carddecks,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
export function StudyTabReducer(state = initialState, action) {
  switch (action.type) {
    case C.INVALIDATE_SECTION_DECKS:
    case C.RECEIVE_SECTION_DECKS:
    case C.REQUEST_SECTION_DECKS:
      const sectionId = action.section.id;
      return Object.assign({}, state, {
        carddecksForSection: {
          [sectionId]: decksReducer(state.carddecksForSection[sectionId], action)
        }
      })
    default:
      return state
  }
}
