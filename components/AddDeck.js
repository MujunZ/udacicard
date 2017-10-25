import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { NavigationActions } from "react-navigation";

class AddDeck extends Component {
    state = {
        title: ''
    }
    submitTitle = () => {
        const { title }= this.state;
        if(title) {
            this.props.addDeck(title);
            this.setState({ title: '' });
        }
        this.toHome();
    }
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: "AddDeck"
        }))
    }
    render() {
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput style={styles.input} placeholder='Deck Title' onChangeText={(title) => this.setState({title})} value={this.state.title}/>
                <TouchableOpacity style={styles.submitBtn} onPress={this.submitTitle}>
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
        addDeck: (data) => dispatch(addDeck(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);