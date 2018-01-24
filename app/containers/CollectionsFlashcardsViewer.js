import React from 'react'
import { connect } from 'react-redux'

import C, { E } from '../C'
import NavHeaderBackButton from '../components/NavHeaderBackButton'
import BaseFlashcardsListContainer from './BaseFlashcardsListContainer'
import FlashcardsList from '../components/FlashcardsList'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'

import { resetFlashcardsState, fetchFlashcards } from '../actions/flashcards'
import { upsertUserFlashcardPrefs } from '../actions/userPrefs'

class HomeFlashcardsViewer extends BaseFlashcardsListContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: null,
      headerLeft: <NavHeaderBackButton left={true} onPress={navigation.goBack} />,
    })
  }

  _fetchData() {
    const navigation = this.props.navigation
    if (!navigation) {
      return null
    }

    const user = this.props.user
    this.setState({refreshing: true})
    this.props.fetchFlashcards(navigation.state.params.collection.flashcards, user.uid)
  }

  _cancelFetch() {
    this.props.resetFlashcardsState()
    this.setState({refreshing: false})
  }

  _updatePref(options) {
    const { user, flashcard, pref } = options
    this.props.upsertUserFlashcardPrefs(
      user.uid,
      flashcard.id,
      pref,
    )
    this.logEvent(E.event_update_flashcard_pref, {
      userId: user.uid,
      flashcardId: flashcard.id,
      pref
    })
  }
}

const ns = C.NAV_COLLECTIONS_FLASHCARDS_VIEWER
function mapStateToProps (state) {
  return {
    user: state.userProfile.data,
    ready: state.flashcards[ns] ? state.flashcards[ns].status === C.FB_FETCHED : null,
    flashcards: state.flashcards[ns] ? state.flashcards[ns].data : null,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetFlashcardsState: () => dispatch(resetFlashcardsState(ns)),
    fetchFlashcards: (ids, userId) => dispatch(fetchFlashcards(ns, ids, userId)),
    upsertUserFlashcardPrefs: (userId, flashcardId, prefs) => dispatch(upsertUserFlashcardPrefs(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeFlashcardsViewer)