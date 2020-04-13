import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, image} from 'react-native';
import {Navbar} from '../components/Navbar';
import {Lister} from '../components/Lister';
import * as firebase from 'firebase';
import axios from 'axios';
import {ClubModalForm} from '../components/ClubModalForm';
import {ClubListModal} from '../components/ClubListModal';

export default class Clubs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      showClubForm: false,
      showClubList: false,
      userClubs: [],
      unique: 0,
      uid: '',
    };
  }

  remount = () => this.setState({unique: this.state.unique + 1});

  componentDidMount() {
    const clubsList = [];
    const userClubs = [];
    firebase.auth().onAuthStateChanged(user => {
      let uid;
      if (user) {
        uid = user.uid;
      }

      axios
        .get(
          `https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs`,
        )
        .then(res => {
          for (let idx in res.data) {
            const club = res.data[idx].data;
            const curclub = {};

            curclub['name'] = club.name ? club.name : '';
            curclub['id'] = club.userId ? club.userId : '';
            curclub['email'] = club.email ? club.email : '';
            if (club.facebook)
              curclub['facebook'] = club.facebook ? club.facebook : '';
            if (club.instagram)
              curclub['instagram'] = club.instagram ? club.instagram : '';
            if (club.twitter)
              curclub['twitter'] = club.twitter ? club.twitter : '';
            if (club.website)
              curclub['website'] = club.website ? club.website : '';
            curclub['image'] = club.coverImage
              ? club.coverImage
              : 'https://i.redd.it/2l2av8at5sn31.jpg';
            curclub['description'] = club.description ? club.description : '';
            curclub['other'] = club.other ? club.other : '';
            curclub['meetinginfo'] = club.meetingInfo ? club.meetingInfo : '';

            clubsList.push(curclub);

            if (uid === club.userId) userClubs.push(res.data[idx]);
          }
          this.setState(
            {userClubs: userClubs, clubs: clubsList, uid: uid},
            () => {
              console.log('userclubs', this.state.userClubs);
              console.log('clubs', this.state.clubs);
            },
          );
        })
        .catch(e => console.log('error', e));
    });
  }

  changeClubList = list => {
    this.setState({clubs: list});
    this.remount();
  };

  toggleClubForm = () => {
    this.setState({showClubForm: !this.state.showClubForm});
  };

  toggleClubList = () => {
    this.setState({showClubList: !this.state.showClubList});
  };

  render() {
    return (
      <View key={this.state.unique} style={{flex: 1}}>
        <ClubListModal
          isVisible={this.state.showClubList}
          toggle={this.toggleClubList}
          clubList={this.state.clubs}
          userClubList={this.state.userClubs}
          uid={this.state.uid}
        />
        <ClubModalForm
          isVisible={this.state.showClubForm}
          toggle={this.toggleClubForm}
          clubList={this.state.clubs}
          changeClubList={list => this.setState({clubs: list})}
          remount={this.remount}
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
