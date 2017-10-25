import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducers';
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import { Constants } from 'expo';
import Deck from './components/Deck';
import Card from './components/Card';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger)
    )
);

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
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: '#000',
    inactiveTintColor: '#696969',
    style: {
      backgroundColor: '#fff'
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Home',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#000",
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: 'Deck',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#000",
      }
    }
  },
  Card: {
    screen: Card,
    navigationOptions: {
      title: 'Card',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#000",
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={'#008080'} barStyle={"light-content"}/>
          <MainNavigator />
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
