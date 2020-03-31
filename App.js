import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {NativeRouter, Switch, Route} from 'react-router-native';
import Home from './src/pages/Home';
import Events from './src/pages/Events';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <SafeAreaView>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Events" component={Events} />
          </Switch>
        </SafeAreaView>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
