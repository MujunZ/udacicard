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
import Quiz from './components/Quiz';
import AddCard from './components/AddCard';
import { setLocalNotification } from './notification'

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
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='list-alt' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
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
      title: 'Udacicards',
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
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#000",
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#000",
      }
    }
  },
})

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification();
  }
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
