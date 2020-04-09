import React, {Component} from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import {Lister} from '../components/Lister.js';
import eventPic from '../assets/images/eventPic.png';
import axios from 'axios';
import * as firebase from 'firebase/app';
import {ModalForm} from '../components/ModalForm';

/*
GET all clubs: https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs
POST create club: https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs
GET an event: https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs/:club/events/:id
GET all events: https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs/:club/events
*/

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showModal: false,
    };
  }

  componentDidMount() {
    this.setState({
      events: [
        {id: '1', title: 'Event1', image: eventPic},
        {id: '2', title: 'Event2', image: eventPic},
        {id: '3', title: 'Event3', image: eventPic},
      ],
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ModalForm
          isVisible={this.state.showModal}
          toggle={() => this.setState({showModal: !this.state.showModal})}
        />
        <Lister
          title={'Events'}
          type="events"
          buttonPress={() => this.setState({showModal: !this.state.showModal})}
          list={this.state.events}
        />
      </View>
    );
  }
}
