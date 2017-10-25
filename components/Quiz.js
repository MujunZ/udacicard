import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";

function Result({ correctNum, incorrectNum }){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Result</Text>
            <Text>{correctNum} Correct</Text>
            <Text>{incorrectNum} Incorrect</Text>
        </View>
    )
}

class Quiz extends Component {
    state = {
        cardIndex: 0,
        showAnwser: false,
        showResult: false,
        correctNum: 0,
        incorrectNum: 0,
    }

    showAnwser = () => {
        this.setState({ showAnwser:true })
    }
    hideAnwser = () => {
        this.setState({ showAnwser:false })
    }

    submitResult = (cardIndex, cardNum, key) => {
        this.setState( state => {
            let nextIndex;
            let count = this.state[key];
            let resultShow = false;
            if (cardIndex + 1 < cardNum) {
                nextIndex = cardIndex + 1;
                count++;
            } else if (cardIndex + 1 === cardNum){
                nextIndex = cardIndex;
                count++;
                resultShow = true;
            }
            return {
                ...state,
                cardIndex: nextIndex,
                showResult: resultShow,
                [key]: count,
            }
        })
    }
    render() {
        const { deckKey, cardNum } = this.props.navigation.state.params;
        const { deckData } = this.props;
        let { cardIndex, showAnwser, showResult, correctNum, incorrectNum } = this.state;
        const cardData = deckData[deckKey].questions[cardIndex];
        const { question, answer } = cardData;
        return(
            <View style={{flex: 1}}>
                {!showResult && (<View style={styles.container}>
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
                            onPress={() => this.submitResult(cardIndex, cardNum, "correctNum")}
                        >
                            <Text style={[styles.submitBtnText]}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.submitBtn, {backgroundColor: '#000'}]}
                            onPress={() => this.submitResult(cardIndex, cardNum, "incorrectNum")}
                        >
                            <Text style={[styles.submitBtnText, {color: '#fff'}]}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>)}
                {showResult && <Result correctNum={correctNum} incorrectNum={incorrectNum}/>}
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