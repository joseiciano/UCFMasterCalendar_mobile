import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, image} from 'react-native';
import {Navbar} from '../components/Navbar';
import {Lister} from '../components/Lister';
import axios from 'axios';

import eventPic from '../assets/images/eventPic.png';
import clubPic from '../assets/images/clubPic.jpg';

const URL =
  'https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1';

export default class Clubs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
    };
  }

  componentDidMount() {
    const clubsList = [];
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
      .then(res => this.setState({clubs: clubsList}))
      .catch(e => console.log('error obtaining clubdata', e));
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
