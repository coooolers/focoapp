import React from 'react'
import { connect } from 'react-redux'

import T from '../T'
import C, { R } from '../constants'
import { localize } from '../locales'
import CollectionsListContainer from '../containers/CollectionsListContainer'

import CurrentUser from '../auth/CurrentUser'
import { actions as UserPrefsActions } from '../userPrefs'
import { actions as CollectionsActions } from '../collections'

class RecommendedHome extends CollectionsListContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: null,
      header: null,
    })
  }

  constructor(props) {
    super(props)
    this.setScreen({screenName:R.NAV_RECOMMENDED_HOME, className:'RecommendedHome'})
  }

  get _onSelectedRoute() {
    return R.NAV_RECOMMENDED_FLASHCARDS_VIEWER
  }

  componentWillMount() {
    this.setTitle(localize("home.title"))
  }

  _fetchData() {
    const user = this.props.user
    this.props.fetchCollections(user.level, user.uid)
  }

  _cancelFetch() {
    this.props.resetCollectionsState()
  }

  _updatePref(options) {
    const { user, collection, pref } = options
    this.props.upsertUserCollectionPrefs(
      user.uid,
      collection.id,
      pref,
    )
  }

  showReviewerIap() {
    this.props.navigation.navigate(R.NAV_RECOMMENDED_GO_PREMIUM)
  }
}

const ns = R.NAV_RECOMMENDED_HOME
function mapStateToProps (state) {
  return {
    user: CurrentUser.profile,
    ready: state.collections[ns] ? state.collections[ns].status === C.FB_FETCHED : false,
    collections: state.collections[ns] ? state.collections[ns].data : {},
    isEmpty: state.collections[ns] && state.collections[ns].data && (Object.keys(state.collections[ns].data).length == 0)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCollections: (ownerId, userId) => dispatch(CollectionsActions.fetchCollections(ns, ownerId, userId)),
    upsertUserCollectionPrefs: (userId, collectionId, prefs) => dispatch(UserPrefsActions.upsertUserCollectionPrefs(userId, collectionId, prefs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedHome)
