import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, image} from 'react-native';
import {Navbar} from '../components/Navbar';
import {Lister} from '../components/Lister';
import axios from 'axios';
import {ClubModalForm} from '../components/ClubModalForm';

const URL =
  'https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1';

export default class Clubs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      showModal: false,
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
        <ClubModalForm
          isVisible={this.state.showModal}
          toggle={() => this.setState({showModal: !this.state.showModal})}
        />
        <Lister
          title="Clubs"
          titleType="clubstitle"
          type="Clubs"
          buttonPress={() => this.setState({showModal: !this.state.showModal})}
          list={this.state.clubs}
        />
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
