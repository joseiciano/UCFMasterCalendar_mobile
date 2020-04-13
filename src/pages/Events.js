import React, {Component} from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import {Lister} from '../components/Lister.js';
import eventPic from '../assets/images/eventPic.png';
import axios from 'axios';
import * as firebase from 'firebase/app';
import {EventModalForm} from '../components/EventModalForm';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const dateendings = [
  'th',
  'st',
  'nd',
  'rd',
  'th',
  'th',
  'th',
  'th',
  'th',
  'th',
];

const URL =
  'https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userClubs: [],
      showModal: false,
      showEventForm: false,
      showEventList: false,
      uid: '',
    };
  }

  componentDidMount() {
    const eventsList = [];
    axios
      .get(`${URL}/events`)
      .then(res => {
        for (let idx in res.data) {
          // console.log('ERRRRR', res.data[idx]);
          if (typeof res.data[idx].startTime !== 'number') {
            // console.log(res.data[idx]);
            eventsList.push(res.data[idx]);
          }
        }
      })
      .then(res => this.setState({events: eventsList}))
      .catch(e => console.log('error getting list of events', e));

    const userClubs = [];
    firebase.auth().onAuthStateChanged(user => {
      let uid;
      if (user) {
        uid = user.uid;
      }

      axios
        .get(`${URL}/clubs`)
        .then(res => {
          for (let idx in res.data) {
            const clubId = res.data[idx].id;
            const clubUid = res.data[idx].data.userId;
            const clubName = res.data[idx].data.name;

            if (uid === clubUid) {
              userClubs.push({
                clubId: clubId,
                userId: clubUid,
                clubName: clubName,
              });
            }
          }
          this.setState({userClubs: userClubs}, () => {});
        })
        .catch(e => console.log('error', e));
    });
  }

  toggleEventForm = () => {
    this.setState({showEventForm: !this.state.showEventForm});
    console.log('Show Events Form');
  };

  toggleEventList = () => {
    this.setState({showEventList: !this.state.showEventList});
    console.log('Show Events List');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <EventModalForm
          isVisible={this.state.showEventForm}
          toggle={this.toggleEventForm}
          eventList={this.state.events}
          userClubs={this.state.userClubs}
          changeEventList={list => this.setState({events: list})}
        />
        <Lister
          title={'Events'}
          titleType="eventstitle"
          type="events"
          buttonPress1={this.toggleEventList}
          buttonPress2={this.toggleEventForm}
          list={this.state.events}
        />
      </View>
    );
  }
}
