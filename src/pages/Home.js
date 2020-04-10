import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import axios from 'axios';
import * as firebase from 'firebase/app';
import {Button} from 'react-native-elements';
import Register from '../components/Register';
import Login from '../components/Login';

import clubPic from '../assets/images/clubPic.jpg';
import eventPic from '../assets/images/eventPic.png';
import techHeart from '../assets/images/smallHeart.png';
import {Navbar} from '../components/Navbar';
import {ImageShower} from '../components/ImageShower';
import {EventCard} from '../components/EventCard';
import {ClubCard} from '../components/ClubCard';
import {EventModalInfo} from '../components/EventModalInfo';

/*
Base URL: https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1
Create a club (POST): /users/:user/clubs
Get all clubs (GET): /clubs
Update a club (PUT): /users/:user/clubs/:club
Delete a club (DELETE): /users/:user/clubs/:club
Create an event (POST): /users/:user/clubs/:club/events
Get an event (GET): /events/:event
Get all events (GET): /events
Update an event (PUT): /users/:user/clubs/:club/events/:event
Delete an event (DELETE): /users/:user/clubs/:club/events/:event
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

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      clubs: [],
      showLoginModal: false,
      showRegisterModal: false,
    };
  }

  componentDidMount() {
    // Get the initial list of events
    const eventsList = [];
    const clubsList = [];
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
      .then(res =>
        axios
          .get(`${URL}/clubs`)
          .then(res => {
            for (let idx in res.data) {
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

              clubsList.push(curclub);
            }
          })
          .then(res => this.setState({events: eventsList, clubs: clubsList}))
          .catch(e => console.log('error obtaining clubdata', e)),
      )
      .catch(e => console.log('error obtaining data', e));
  }

  toggleLogin = () =>
    this.setState({showLoginModal: !this.state.showLoginModal});

  toggleRegister = () =>
    this.setState({showRegisterModal: !this.state.showRegisterModal});

  render() {
    const {history} = this.props;
    return (
      <View style={{flex: 1, height: '100%'}}>
        <ScrollView style={{flex: 1}}>
          <Login
            isVisible={this.state.showLoginModal}
            toggle={this.toggleLogin}
          />
          <Register
            isVisible={this.state.showRegisterModal}
            toggle={this.toggleRegister}
          />

          <Navbar
            leftText="Knightro"
            rightText1="Log in"
            rightText1OnPress={this.toggleLogin}
            rightText2="Sign up"
            rightText2OnPress={this.toggleRegister}
          />

          <View style={{flex: 1}}>
            <ImageShower
              image={techHeart}
              backgroundStyle={styles.imageBackground}
              headerText="Something For Everyone"
              headerStyle={styles.imageHeader}
              upperBodyText="Just bring an open mind and an insatiable desire to learn, and we'll take care of the rest."
              upperBodyStyle={styles.imageText}
              buttonText="Join Knightro"
              buttonOnPress={this.toggleRegister}
            />

            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Upcoming events</Text>
              <Text style={styles.descriptionSubtitle}>
                See what's happening soon in your area.
              </Text>
            </View>

            {this.state.events.map((event, idx) => {
              if (idx < 3) return <EventCard key={idx} event={event} />;
            })}

            <Button
              buttonStyle={styles.listButton}
              title="View All Events"
              titleStyle={{color: '#03A9F4'}}
              onPress={() => history.push('/Events')}
            />

            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Technology Clubs</Text>
              <Text style={styles.descriptionSubtitle}>
                Learn about UCF's technology clubs
              </Text>
            </View>

            {this.state.clubs.map((club, idx) => {
              if (idx < 3) return <ClubCard key={idx} club={club} />;
            })}

            <Button
              buttonStyle={styles.listButton}
              title="View All Clubs"
              titleStyle={{color: '#03A9F4'}}
              onPress={() => history.push('/Clubs')}
            />
            <View style={{marginTop: '5%'}} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    backgroundColor: '#D0F5F7',
    borderRadius: 0,
    height: 600,
  },
  imageHeader: {
    marginTop: '12%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#178B99',
    marginBottom: '5%',
  },
  imageText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#178B99',
    fontWeight: 'bold',
    width: '62%',
    marginLeft: '17%',
  },
  listButton: {
    borderRadius: 8,
    marginTop: 20,
    left: '24%',
    width: '93%',
    backgroundColor: '#F8F8FF',
    borderColor: '#03A9F4',
    borderWidth: 1.5,
    borderRadius: 10,
  },
  description: {
    marginLeft: 25,
    marginTop: '8%',
    marginBottom: 2,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  descriptionSubtitle: {
    fontSize: 16,
  },
});
