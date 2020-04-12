import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {NativeRouter, Switch, Route, BackButton} from 'react-router-native';

import Home from './src/pages/Home';
import Events from './src/pages/Events';
import Clubs from './src/pages/Clubs';
import BigBrain from './src/pages/BigBrain';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <BackButton>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Events" component={Events} />
            <Route exact path="/Clubs" component={Clubs} />
            {/* <Route exact path="/Bigbrain" component={BigBrain} /> */}
          </Switch>
        </BackButton>
      </NativeRouter>
    );
  }
}
