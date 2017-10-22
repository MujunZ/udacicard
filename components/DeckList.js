import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";

class DeckList extends Component {
    render() {
        const { deckData } = this.props;

        return(
            <View>
                {Object.keys(deckData).map((deckKey) => {
                    const cardNum = deckData[deckKey].questions.length;
                    return (
                    <View key={deckKey} style={styles.deckCtn}>
                        <Text style={{ fontSize: 30 }}>{deckKey}</Text>
                        <Text style={{ fontSize: 15 }}>{cardNum} Cards</Text>
                    </View>
                )})}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckCtn: {
        height: 150,
        width: 400,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
    }
})

function mapStateToProps (state) {
    return state
}

function mapDispatchToProps (dispatch) {
    return {
        addDeck: () => dispatch(addDeck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);