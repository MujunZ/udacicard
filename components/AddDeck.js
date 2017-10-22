import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";

class AddDeck extends Component {
    render() {

        return(
            <View style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput style={styles.input} placeholder='Deck Title'/>
                <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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
        addDeck: () => dispatch(addDeck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);