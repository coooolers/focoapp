import React from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { SocialIcon } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import FirebaseAuth from '../auth/FirebaseAuth'

import {
  resetUserProfileState,
  fetchUserProfile,
} from '../actions/UserProfileActions'

class SignInHome extends BaseContainer {
  static navigationOptions = ({navigation}) => ({
    title: null,
    headerLeft: null,
  })

  constructor(props) {
    super(props)
    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.onUserChange = this.onUserChange.bind(this)
    this.emailVerified = this.emailVerified.bind(this)
    this.onError = this.onError.bind(this)
  }

  componentDidMount() {
    FirebaseAuth.setup(this.onLogin, this.onUserChange, this.onLogout, this.emailVerified, this.onError)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profileFetched != nextProps.profileFetched) {
      if (nextProps.profileFetched) {
        console.log(this.props.profile)
        this.props.navigation.navigate(C.NAV_HOME)
      }
    }
  }

  onLogin(user) {
    this.props.fetchUserProfile(user.uid)
  }

  onLogout() {
    this.props.resetUserProfileState()
    this.props.navigation.navigate(C.NAV_USER_SIGNIN)
  }

  onUserChange(user, val) {
    console.log('onUserChange()')
    console.log(user)
    console.log(val)
  }

  emailVerified() {
    console.log('emailVerified()')
  }

  onError(e) {
    this.errorToast(e.message)
    console.log(e)
  }

  render() {
    return (
      <View style={[S.containers.screen, S.containers.centered]}>
        <StatusBar barStyle={S.statusBarStyle} />
        <SocialIcon
          title={L.signinFacebook}
          button={true}
          type='facebook'
          style={{width:'75%'}}
          fontSize={T.fonts.normalSize}
          fontWeight={T.fonts.normalWeight}
          onPress={FirebaseAuth.loginWithFacebook}
        />
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    profileFetched: state.userProfile.status === C.FB_FETCHED,
    profile: state.userProfile.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    resetUserProfileState: () => dispatch(resetUserProfileState()),
    fetchUserProfile: (uid) => dispatch(fetchUserProfile(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInHome)
