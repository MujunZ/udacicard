import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { setDecks } from '../actions';
import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY } from '../reducers';

class DeckList extends Component {
    state = {
        ready: false
    }

    componentDidMount() {
        AsyncStorage.getItem(DECK_STORAGE_KEY)
            .then(results => {
                this.props.setDecks(results)
            })
            .then(() => this.setState({ ready: true }))
    }

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

function mapStateToProps ({ deckData }) {
    return { deckData }
}

function mapDispatchToProps (dispatch) {
    return {
        setDecks: (data) => dispatch(setDecks(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);