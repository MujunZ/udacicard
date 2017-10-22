import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import { Constants } from 'expo';

function UdaciStatusBar ({ backgroundColor, ...props}){
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Cards',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='list-alt' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Card',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={30} color={tintColor} />
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#000',
    inactiveTintColor: '#696969',
    style: {
      backgroundColor: '#fff'
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={'#008080'} barStyle={"light-content"}/>
          <Tabs />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
