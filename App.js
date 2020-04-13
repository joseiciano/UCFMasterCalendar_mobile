import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {NativeRouter, Switch, Route, BackButton} from 'react-router-native';

import Home from './src/pages/Home';
import Events from './src/pages/Events';
import BigBrain from './src/pages/BigBrain';
import Clubs from './src/pages/Clubs';
import BiggerBrain from './src/pages/BiggerBrain';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <BackButton>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Biggerbrain" component={BiggerBrain} />
            <Route exact path="/Events" component={Events} />
            <Route exact path="/Clubs" component={Clubs} />
            <Route exact path="/Bigbrain" component={BigBrain} />
          </Switch>
        </BackButton>
      </NativeRouter>
    );
  }
}
