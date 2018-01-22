import React from 'react'

import T from '../T'
import S from '../styles/styles'
import Icons from '../components/Icons'

export default class NavHeaderBackButton extends React.Component {
  render() {
    const props = this.props
    const paddingLeft = props.left ? S.spacing.xsmall : 0
    const paddingRight = props.right ? S.spacing.xsmall : 0
    return Icons.back({
      size: T.icons.normalIcon,
      color: S.navigation.headerTintColor,
      style: {top:S.spacing.navIconSpacer, paddingLeft, paddingRight},
      onPress: () => this.props.onPress()
    })
  }
}
