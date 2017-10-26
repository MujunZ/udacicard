import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { NavigationActions } from "react-navigation";

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }
    submitCard = () => {
        const { question, answer }= this.state;
        const { deckKey }= this.props.navigation.state.params;
        if(question && answer) {
            this.props.addCard({ deckKey, question, answer });
            this.setState({ question, answer });
        }
        this.toHome();
    }
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: "AddCard"
        }))
    }
    render() {
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput style={styles.input} placeholder='Question' onChangeText={(question) => this.setState({question})} value={this.state.question}/>
                <TextInput style={styles.input} placeholder='Answer' onChangeText={(answer) => this.setState({answer})} value={this.state.answer}/>
                <TouchableOpacity style={styles.submitBtn} onPress={this.submitCard}>
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
        fontSize: 50,
        textAlign: 'center',
    },
    input: { 
        height: 30,
        width: 350,
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },
    submitBtn: {
        height: 30,
        width: 80,
        marginTop: 10,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
    },
    submitBtnText: {
        color: '#fff',
    }
})

function mapStateToProps (state) {
    return state
}

function mapDispatchToProps (dispatch) {
    return {
        addCard: (data) => dispatch(addCard(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);