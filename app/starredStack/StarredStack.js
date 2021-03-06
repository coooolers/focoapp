import React from 'react'
import { StackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'
import Icons from '../components/Icons'

import StarredHome from './StarredHome'
import StarredFilterConfigurator from './StarredFilterConfigurator'

const STACK = {}
STACK[R.NAV_STARRED_HOME] = { screen: StarredHome }
STACK[R.NAV_STARRED_FILTER_CONFIGURATOR] = { screen: StarredFilterConfigurator }

const StarredStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.star({ focused, color:tintColor, ...S.navigation.tabBarIcon })
    ),
  })
})

export default StarredStack
