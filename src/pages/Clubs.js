import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, image} from 'react-native';
import {Navbar} from '../components/Navbar';
import {Lister} from '../components/Lister';
import * as firebase from 'firebase';
import axios from 'axios';
import {ClubModalForm} from '../components/ClubModalForm';
import {ClubListModal} from '../components/ClubListModal';

const URL =
  'https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1';

export default class Clubs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      showClubForm: false,
      showClubList: false,
      userClubs: [],
      uid: '',
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

    const clublist = [];
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;

        axios
          .get(`${URL}/clubs`)
          .then(res => {
            for (let data in res.data) {
              const club = res.data[data];
              const fbid = club.id;
              const clubdata = club.data;

              if (uid === clubdata.userId) {
                console.log('mix', uid);
                clublist.push(club);
              }
            }
            this.setState({userClubs: clublist, uid: uid});
          })
          .catch(e => console.log(e));
      }
    });
  }

  toggleClubForm = () =>
    this.setState({showClubForm: !this.state.showClubForm});

  toggleClubList = () =>
    this.setState({showClubList: !this.state.showClubList});

  render() {
    return (
      <View style={{flex: 1}}>
        <ClubModalForm
          isVisible={this.state.showClubForm}
          toggle={this.toggleClubForm}
        />
        <ClubListModal
          isVisible={this.state.showClubList}
          toggle={this.toggleClubList}
          clubList={this.state.userClubs}
          uid={this.state.uid}
        />
        <Lister
          title="Clubs"
          titleType="clubstitle"
          type="Clubs"
          buttonPress1={this.toggleClubList}
          buttonPress2={this.toggleClubForm}
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
