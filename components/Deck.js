import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";

class Deck extends Component {
    toAddCard = deckKey => this.props.navigation.navigate('AddCard',{ deckKey });
    toQuiz = (deckKey, cardNum) => this.props.navigation.navigate('Quiz', { deckKey, cardNum });
    render() {
        const { deckKey } = this.props.navigation.state.params;
        const cardNum = this.props.deckData[deckKey].questions.length;
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{deckKey}</Text>
                <Text style={styles.subtitle}>{cardNum} Cards</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[styles.submitBtn, {backgroundColor: '#fff', borderColor: '#000', borderWidth: 1}]}
                        onPress={() => this.toAddCard(deckKey)}
                    >
                        <Text style={[styles.submitBtnText]}>Add A Card</Text>
                    </TouchableOpacity>
                    {cardNum > 0 && (<TouchableOpacity 
                        style={[styles.submitBtn, {backgroundColor: '#000'}]}
                        onPress={() => this.toQuiz(deckKey, cardNum)}
                    >
                        <Text style={[styles.submitBtnText, {color: '#fff'}]}>Start Quiz</Text>
                    </TouchableOpacity>)}
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

export default connect(mapStateToProps)(Deck);