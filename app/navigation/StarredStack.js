import React from 'react'
import { StackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'
import L from '../locales'

import Icons from '../components/Icons'
import StarredHome from '../containers/StarredHome'
import StarredFilterConfigurator from '../containers/StarredFilterConfigurator'

const STACK = {}
STACK[R.NAV_STARRED_HOME] = { screen: StarredHome }
STACK[R.NAV_STARRED_FILTER_CONFIGURATOR] = { screen: StarredFilterConfigurator }

const StarredStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    ...S.navigation.header,
    title: L.headers.starred,
    tabBarLabel: L.tabs.starred,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.star({ focused, color:tintColor, ...S.navigation.tabBarIcon })
    ),
  })
})

export default StarredStack
