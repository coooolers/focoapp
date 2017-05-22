import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import S, { spacing } from '../styles/styles'
import Icons from '../components/Icons'
import LoadingIndicator from '../components/LoadingIndicator'
import Card from '../components/Card'

import { fetchUserProfile } from '../actions/UserProfileActions'

import api from '../data/api'

class Home extends React.Component {
  // const {state, setParams, navigate} = navigation
  // const {user} = state.params
  static navigationOptions = {
    title: `Home`,
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: (
        <TouchableOpacity
          style={{top:spacing.xsmall/2, paddingLeft: spacing.small}}
          onPress={() => navigation.navigate('DrawerOpen') }>
          {Icons.menu({tintColor: S.header.tintColor})}
        </TouchableOpacity>
      ),
      right: (
        <TouchableOpacity
          style={{top:spacing.xsmall/2, paddingRight: spacing.small}}
          onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER) }>
          {Icons.forward({tintColor: S.header.tintColor})}
        </TouchableOpacity>
      )
    })
  }

  componentDidMount() {
    this.props.fetchUserProfile()
  }

  navigate(route) {
    this.props.navigation.navigate(route)
  }

  render() {
    const navigation = this.props.navigation
    const props = this.props

    // TODO remove mock data
    const key = api.flashcardSets.getFlashcardSets()[0]
    const set = api.flashcardSets.getFlashcardSet(key)
    const user = {
      id: '12345',
      username: 'lovince',
    }

    if (props.userProfile.isFetching) {
      return (
        <LoadingIndicator />
      )
    }

    return (
      <ScrollView style={S.container}>
        <StatusBar barStyle={S.statusBarStyle} />
        { props.userProfile.data ?
          <View data={props.userProfile.data} /> : null
        }
        <Card
          title={set.title}
          onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, keys:set.flashcardsKeys})}>
          <Text>
            {set.tags}
          </Text>
        </Card>
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
    userProfile: state.userProfile
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUserProfile: () => dispatch(fetchUserProfile())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
