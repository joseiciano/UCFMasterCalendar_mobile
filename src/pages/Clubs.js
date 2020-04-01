import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class Clubs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {history} = this.props;
    return (
      <View>
        <Text>Clubs</Text>
        <Button title="change page" onPress={() => history.push('/')} />
      </View>
    );
  }
}
