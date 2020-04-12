import React, {Component} from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import {Lister} from '../components/Lister.js';
import eventPic from '../assets/images/eventPic.png';
import axios from 'axios';
import * as firebase from 'firebase/app';
import {EventModalForm} from '../components/EventModalForm';

/*
GET all clubs: https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs
POST create club: https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs
GET an event: https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs/:club/events/:id
GET all events: https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs/:club/events
*/
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
      userEvents: [],
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
          const event = res.data[idx];
          const curevent = {};

          curevent['id'] = event.id;
          event = event.data;
          curevent['title'] = event.title;
          curevent['clubId'] = event.clubId;
          curevent['location'] = event.location;
          curevent['description'] = event.description;

          const start = new Date(event.startTime._seconds * 1000);
          let day = days[start.getDay() - 1];
          let month = months[start.getMonth() - 1];
          let year = start.getFullYear();
          let date = start.getDate();
          let dateending =
            date === '11' || date === '12' ? 'th' : dateendings[date % 10];

          const startTime = start
            .toTimeString()
            .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');

          const fullStartDate = `${day}, ${month} ${date}${dateending}, ${year}`;

          const end = new Date(event.endTime._seconds * 1000);
          day = days[end.getDay() - 1];
          month = months[end.getMonth() - 1];
          year = end.getFullYear();
          date = end.getDate();
          dateending =
            date === '11' || date === '12' ? 'th' : dateendings[date % 10];

          const endTime = end
            .toTimeString()
            .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');

          const fullEndDate = `${day}, ${month} ${date}${dateending}, ${year}`;

          curevent['startDate'] = fullStartDate;
          curevent['startTime'] = startTime;
          curevent['endDate'] = fullEndDate;
          curevent['endTime'] = endTime;
          eventsList.push(curevent);
        }
      })
      .then(res => this.setState({events: eventsList}))
      .catch(e => console.log('error getting list of events', e));
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
