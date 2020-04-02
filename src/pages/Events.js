import React, {Component} from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import {Lister} from '../components/Lister.js';
import eventPic from '../assets/images/eventPic.png';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    console.log('pepega');
    this.setState(
      {
        events: [
          {id: '1', title: 'Event1', image: eventPic},
          {id: '2', title: 'Event2', image: eventPic},
          {id: '3', title: 'Event3', image: eventPic},
        ],
      },
      () => console.log('red', this.state.events),
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Lister title={'Events'} type="eventspage" list={this.state.events} />
      </View>
    );
  }
}
