import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";

class Card extends Component {
    state = {
        cardIndex: 1
    }
    render() {
        const { deckKey, cardNum } = this.props.navigation.state.params;
        const { deckData } = this.props;
        const { cardIndex } = this.state;
        const cardData = deckData[deckKey].questions[cardIndex];
        const { question, answer } = cardData;
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{question}</Text>
                <Text style={styles.answer}>{answer}</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.submitBtn, {backgroundColor: '#fff', borderColor: '#000', borderWidth: 1}]}>
                        <Text style={[styles.submitBtnText]}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.submitBtn, {backgroundColor: '#000'}]}>
                        <Text style={[styles.submitBtnText, {color: '#fff'}]}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
    },
    subtitle: {
        color: '#666',
    },
    submitBtn: {
        height: 30,
        width: 200,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
    },
    btnContainer: {
        marginTop: 80,
    }
})

function mapStateToProps (state) {
    return state
}

export default connect(mapStateToProps)(Card);