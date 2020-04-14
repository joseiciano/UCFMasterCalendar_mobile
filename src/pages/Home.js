import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import axios from 'axios';
import * as firebase from 'firebase/app';
import {Button} from 'react-native-elements';
import {Redirect} from 'react-router-native';

import techHeart from '../assets/images/smallHeart.png';
import {Navbar} from '../components/Navbar';
import {ImageShower} from '../components/ImageShower';
import {EventCard} from '../components/EventCard';
import {ClubCard} from '../components/ClubCard';

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
      redirectRegister: false,
      redirectClubs: false,
      redirectEvents: false,
    };
  }

  componentDidMount() {
    const eventsList = [];
    const clubsList = [];
    axios
      .get(`${URL}/events`)
      .then(res => {
        for (let idx in res.data) {
          const event = res.data[idx];
          eventsList.push(event);
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
              curclub['clubId'] = res.data[idx].id;

              clubsList.push(curclub);
            }
          })
          .then(res => this.setState({events: eventsList, clubs: clubsList}))
          .catch(e => console.log('error obtaining clubdata', e)),
      )
      .catch(e => console.log('error obtaining data', e));
  }

  redirectRegister = () => this.setState({redirectRegister: true});
  redirectClubs = () => this.setState({redirectClubs: true});
  redirectEvents = () => this.setState({redirectEvents: true});

  render() {
    const {history} = this.props;

    if (this.state.redirectRegister) {
      return <Redirect push to="/Register" />;
    }
    if (this.state.redirectClubs) {
      return <Redirect push to="/Clubs" />;
    }
    if (this.state.redirectEvents) {
      return <Redirect push to="/Events" />;
    }
    return (
      <View style={{flex: 1, height: '100%'}}>
        <ScrollView style={{flex: 1}}>
          <Navbar />

          <View style={{flex: 1}}>
            <ImageShower
              image={techHeart}
              backgroundStyle={styles.imageBackground}
              headerText="Something For Everyone"
              headerStyle={styles.imageHeader}
              upperBodyText="Just bring an open mind and an insatiable desire to learn, and we'll take care of the rest."
              upperBodyStyle={styles.imageText}
              buttonText="Join Knightro"
              buttonOnPress={this.redirectRegister}
            />

            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Upcoming events</Text>
              <Text style={styles.descriptionSubtitle}>
                See what's happening soon in your area.
              </Text>
            </View>

            {this.state.events.map((event, idx) => {
              if (idx < 3)
                return (
                  <EventCard key={idx} event={event} clubs={this.state.clubs} />
                );
            })}

            <Button
              buttonStyle={styles.listButton}
              title="View All Events"
              titleStyle={{color: '#03A9F4'}}
              onPress={this.redirectEvents}
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
              onPress={this.redirectClubs}
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
