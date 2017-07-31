import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import S from '../styles/styles'

import SignInHome from '../containers/SignInHome'
import SignUpWithEmail from '../containers/SignUpWithEmail'

const STACK = {}
STACK[C.NAV_USER_SIGNIN_HOME] = { screen: SignInHome }
STACK[C.NAV_USER_SIGNUP_WITH_EMAIL] = { screen: SignUpWithEmail }

const SignInStack = StackNavigator(STACK,  {
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: ({navigation}) => ({
    title: null,
    header: null
  }),
})

export default SignInStack
