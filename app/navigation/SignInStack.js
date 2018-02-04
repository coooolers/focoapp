import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles'

import Splash from '../containers/Splash'
import SignInHome from '../containers/SignInHome'
import SignInWithEmail from '../containers/SignInWithEmail'
import SignUpWithEmail from '../containers/SignUpWithEmail'

const STACK = {}
STACK[C.NAV_USER_SIGNIN] = { screen: Splash }
STACK[C.NAV_USER_SIGNIN_HOME] = { screen: SignInHome }
STACK[C.NAV_USER_SIGNIN_WITH_EMAIL] = { screen: SignInWithEmail }
STACK[C.NAV_USER_SIGNUP_WITH_EMAIL] = { screen: SignUpWithEmail }

const SignInStack = StackNavigator(STACK,  {
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: ({navigation}) => ({
    title: null,
    gesturesEnabled: false,
    ...S.navigation.header,
    headerLeft: null,
  }),
})

export default SignInStack
