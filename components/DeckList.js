import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";

class DeckList extends Component {
    render() {
        return(
            <View>
                <Text>{JSON.stringify(this.props.deckData)}</Text>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return state
}

function mapDispatchToProps (dispatch) {
    return {
        addDeck: () => dispatch(addDeck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);