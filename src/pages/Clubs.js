import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, image} from 'react-native';
import {Navbar} from '../components/Navbar';
import {Lister} from '../components/Lister';

import eventPic from '../assets/images/eventPic.png';
import clubPic from '../assets/images/clubPic.jpg';

export default class Clubs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
    };
  }

  componentDidMount() {
    this.setState({
      clubs: [
        {id: '1', title: 'Event1', image: eventPic},
        {id: '2', title: 'Event2', image: eventPic},
        {id: '3', title: 'Event3', image: eventPic},
      ],
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Lister title="Clubs" type="Clubs" list={this.state.clubs} />
      </View>
    );
  }
}

const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginLeft: '3.5%',
    marginTop: '5%',
  },
};
