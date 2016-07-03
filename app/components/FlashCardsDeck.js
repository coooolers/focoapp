import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from '../styles';
import FlashCard from './FlashCard';

import { flashcards } from '../data/TestData';

export default class FlashCardDeck extends React.Component {
  constructor(props) {
    super(props);
    this._renderCards = this._renderCards.bind(this);
  }

  render() {
    // TODO data contains deck info and list of cards
    const d = this.props.data;
    const mt = this.props.marginTop;

    return (
      <View style={[{marginTop:mt}, styles.listContainer]}>
        <View style={[styles.cover,{justifyContent:'flex-end'}]}>
          <Text style={styles.title}>
            {d.title}
          </Text>
          <Text>
            {d.cardsInDeck} cards
          </Text>
        </View>
        {this._renderCards(flashcards)}
      </View>
    );
  }

  _renderCards(cards) {
    return (
      Object.values(cards).map( i => {
        return (
          <FlashCard data={i} />
        )
      })
    );
  }
}