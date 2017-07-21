import React from 'react'
import { View, StyleSheet } from 'react-native'

import Pill from '../lib/Pill'

export default class PillsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.toggleItem = this.toggleItem.bind(this)
  }

  componentDidMount() {
    this.props.items.map((item, i) => {
      this.state[item.key] = false
    })
  }

  toggleItem(key) {
    const newState = {}
    newState[key] = !this.state[key]
    this.setState(newState)

    if (this.props.onToggle) {
      this.props.onToggle({tag:key, val:newState[key]})
    }
  }

  render() {
    const props = this.props
    const items = props.items
    const max = props.max ? props.max : 9999
    const textColor = props.textColor
    const pillColor = props.pillColor
    const pillBorderColor = props.pillBorderColor
    const disabledPillColor = props.disabledPillColor
    const disabledTextColor = props.disabledTextColor
    const onPress = props.onToggle ? this.toggleItem : null

    return (
      <View style={[styles.container, props.styles]}>
        { items.map((item, i) => {
          if (i < max) {
            return (
              <Pill
                key={item.key}
                id={item.key}
                label={item.label}
                large={props.largePills}
                style={[{marginBottom: 8, marginRight: 8}]}
                onPress={onPress}
                inversed={!this.state[item.key]}
                color={textColor}
                backgroundColor={pillColor}
                borderColor={pillBorderColor}
                disabledColor={disabledTextColor}
                disabledBackgroundColor={disabledPillColor}
              />
            )
          }
        }) }

        { (items.length > max) &&
          <Pill
            key='ITEMS_LIST_MORE'
            label={`+${items.length-max}`}
            inactive={true}
            color={textColor}
            backgroundColor={pillColor}
            borderColor={pillBorderColor}
            disabledColor={disabledTextColor}
            disabledBackgroundColor={disabledPillColor}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
})
