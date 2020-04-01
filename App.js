import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';
import {createBrowserHistory} from 'history';

import Home from './src/pages/Home';
import Events from './src/pages/Events';
import Clubs from './src/pages/Clubs';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NativeRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Events" component={Events} />
            <Route exact path="/Clubs" component={Clubs} />
          </Switch>
        </NativeRouter>
      </View>
    );
  }
}
