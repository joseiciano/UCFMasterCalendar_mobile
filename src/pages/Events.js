import React, {Component} from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import {Lister} from '../components/Lister.js';
import axios from 'axios';
import * as firebase from 'firebase/app';
import {EventListModal} from '../components/EventListModal';
import {EventModalForm} from '../components/EventModalForm';

const URL =
  'https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userClubs: [],
      clubs: [],
      showModal: false,
      showEventForm: false,
      showEventList: false,
      setFlag: false,
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
    const clubsList = [];
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

            const club = res.data[idx].data;
            const curclub = {};

            curclub['name'] = club.name;
            curclub['id'] = club.userId;
            curclub['email'] = club.email;
            if (club.facebook) curclub['facebook'] = club.facebook;
            if (club.instagram) curclub['instagram'] = club.instagram;
            if (club.twitter) curclub['twitter'] = club.twitter;
            if (club.website) curclub['website'] = club.website;
            curclub['image'] = club.coverImage;
            curclub['description'] = club.description;
            curclub['other'] = club.other;
            curclub['meetinginfo'] = club.meetingInfo;
            curclub['clubId'] = res.data[idx].id;

            clubsList.push(curclub);
          }
          this.setState(
            {userClubs: userClubs, clubs: clubsList, setFlag: true},
            () => {},
          );
        })
        .catch(e => console.log('error', e));
    });
  }

  toggleEventForm = () => {
    this.setState({showEventForm: !this.state.showEventForm});
    // console.log('Show Events Form');
  };

  toggleEventList = () => {
    this.setState({showEventList: !this.state.showEventList});
    // console.log('Show Events List');
  };

  render() {
    if (this.state.setFlag) {
      // console.log('we in here');
      // console.log('state', this.state);
      return (
        <View style={{flex: 1}}>
          <EventModalForm
            isVisible={this.state.showEventForm}
            toggle={this.toggleEventForm}
            eventList={this.state.events}
            userClubs={this.state.userClubs}
          />
          <EventListModal
            isVisible={this.state.showEventList}
            toggle={this.toggleEventList}
            eventList={this.state.events}
            userClubs={this.state.userClubs}
          />
          <Lister
            title={'Events'}
            titleType="eventstitle"
            type="events"
            buttonPress1={this.toggleEventList}
            buttonPress2={this.toggleEventForm}
            list={this.state.events}
            clubs={this.state.clubs}
          />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <EventModalForm
          isVisible={this.state.showEventForm}
          toggle={this.toggleEventForm}
          eventList={this.state.events}
          userClubs={this.state.userClubs}
        />
        <EventListModal
          isVisible={this.state.showEventList}
          toggle={this.toggleEventList}
          eventList={this.state.events}
          userClubs={this.state.userClubs}
        />
      </View>
    );
  }
}
