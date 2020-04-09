import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import axios from 'axios';
import * as firebase from 'firebase/app';
import {Button} from 'react-native-elements';

import clubPic from '../assets/images/clubPic.jpg';
import eventPic from '../assets/images/eventPic.png';
import techHeart from '../assets/images/smallHeart.png';
import {Navbar} from '../components/Navbar';
import {ImageShower} from '../components/ImageShower';
import {EventCard} from '../components/EventCard';
import {ClubCard} from '../components/ClubCard';

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

const URL =
  'https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      clubs: [],
    };
  }

  componentDidMount() {
    // Get the initial list of events
    // axios
    //   .get(`${URL}/events`)
    //   .then(res => {
    //     for (event in res.data) {
    //       console.log('event ', event);
    //     }
    //   })
    //   .catch(e => console.log('error obtaining data', e));
    this.setState({
      events: [
        {id: '1', title: 'Event1', image: eventPic},
        {id: '2', title: 'Event2', image: eventPic},
        {id: '3', title: 'Event3', image: eventPic},
      ],
      clubs: [
        {id: '1', title: 'Club1', image: clubPic},
        {id: '2', title: 'Clcub2', image: clubPic},
        {id: '3', title: 'Club3', image: clubPic},
      ],
    });
  }

  render() {
    const {history} = this.props;
    return (
      <View style={{flex: 1, height: '100%'}}>
        <ScrollView style={{flex: 1}}>
          <Navbar
            leftText="Knightro"
            rightText1="Log in"
            rightText1OnPress={() => console.log('Log in')}
            rightText2="Sign up"
            rightText2OnPress={() => console.log('Sign up')}
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
              buttonOnPress={() => console.log('Join Knightro')}
            />

            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Upcoming events</Text>
              <Text style={styles.descriptionSubtitle}>
                See what's happening soon in your area.
              </Text>
            </View>

            {this.state.events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}

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

            {this.state.clubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
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
