import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Navbar from '../components/Navbar';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {history} = this.props;
    return (
      <View>
        <Navbar />
        <Text style={{color: 'red'}}>HomePage</Text>
        <Button title="change page" onPress={() => history.push('/Events')} />
      </View>
    );
  }
}
