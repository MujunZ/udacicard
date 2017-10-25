import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";

class Quiz extends Component {
    state = {
        cardIndex: 0,
        showAnwser: false,
    }

    showAnwser = () => {
        this.setState({ showAnwser:true })
    }
    hideAnwser = () => {
        this.setState({ showAnwser:false })
    }
    submitCorrect = (cardIndex, cardNum) => {
        this.setState( state => {
            const nextIndex = cardIndex + 1 < cardNum ? cardIndex + 1 : cardIndex;
            return {
                ...state,
                cardIndex: nextIndex,
            }
        })
    }
    render() {
        const { deckKey, cardNum } = this.props.navigation.state.params;
        const { deckData } = this.props;
        let { cardIndex, showAnwser } = this.state;
        const cardData = deckData[deckKey].questions[cardIndex];
        const { question, answer } = cardData;
        return(
            <View style={styles.container}>
                <Text style={styles.index}>{cardIndex + 1}/{cardNum}</Text>
                {!showAnwser && (<View style={styles.quizContainer}>
                    <Text style={styles.title}>{question}</Text>
                    <TouchableOpacity onPress={this.showAnwser}><Text style={styles.answerToggler}>Answer</Text></TouchableOpacity>
                </View>)}
                {showAnwser && (<View style={styles.quizContainer}>
                    <Text style={styles.title}>{answer}</Text>
                    <TouchableOpacity onPress={this.hideAnwser}><Text style={styles.answerToggler}>Question</Text></TouchableOpacity>
                </View>)}
                <View style={styles.btnContainer}>
                    <TouchableOpacity 
                        style={[styles.submitBtn, {backgroundColor: '#fff', borderColor: '#000', borderWidth: 1}]}
                        onPress={() => this.submitCorrect(cardIndex, cardNum)}
                    >
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
    index: {
        marginBottom: 'auto',
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
    },
    quizContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerToggler: {
        color: '#f00',
        padding: 2,
        fontWeight: 'bold',
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
        marginBottom: 220,
    }
})

function mapStateToProps (state) {
    return state
}

export default connect(mapStateToProps)(Quiz);