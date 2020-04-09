import React from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import {Card, Button, Row, Col} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-elements';
import pin from '../assets/images/pin.png';
import clock from '../assets/images/clock.png';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const EventPageCard = ({event}) => {
  // const {title, club, date, time, location} = event;
  return (
    <Card containerStyle={{borderRadius: 15, height: 300}}>
      <View style={{marginLeft: 5}}>
        <Text style={eCardStyles.title}>
          React Fundamentals: Introduction to React
        </Text>
        <View flexDirection="row">
          <Text style={eCardStyles.clubIntro}>Hosted by </Text>
          <Text style={ePageStyles.club}>Knight Hacks</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name="md-time"
            size={windowWidth * 0.08}
            onPress={() => console.log('pressed icon')}
            style={{color: 'black', top: '4%'}}
          />
          <Text style={ePageStyles.date}>Wednesday, February 20th, 2020</Text>
        </View>
        <Text style={ePageStyles.time}>5:30 PM to 8:30 PM</Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name="md-pin"
            size={windowWidth * 0.08}
            onPress={() => console.log('pressed icon')}
            style={{color: 'black'}}
          />
          <Text style={ePageStyles.location}>HEC 450</Text>
        </View>
      </View>
    </Card>
  );
};

const EventCard = ({event}) => {
  // const {title, club, date, time, location} = event;
  return (
    <Card containerStyle={{borderRadius: 15, height: 300}}>
      <View style={{marginLeft: 5}}>
        <Text style={eCardStyles.date}>WED, FEB 19, 5:30PM</Text>
        <Text style={eCardStyles.title}>
          React Fundamentals: Introduction to React
        </Text>
        <Text style={eCardStyles.club}>Knight Hacks</Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: '3%',
          }}>
          <Ionicons
            name="md-pin"
            size={windowWidth * 0.08}
            onPress={() => console.log('pressed icon')}
            style={{color: 'black'}}
          />
          <Text style={eCardStyles.locationText}>HEC 450</Text>
        </View>

        <View style={eCardStyles.buttonWrapper}>
          <Button
            buttonStyle={eCardStyles.buttonStyle}
            title={'Register'}
            titleStyle={{color: '#03A9F4'}}
          />

          <Button
            buttonStyle={eCardStyles.buttonStyle}
            title={'View'}
            titleStyle={{color: '#03A9F4'}}
          />
        </View>
      </View>
    </Card>
  );
};

export {EventPageCard, EventCard};

const ePageStyles = {
  title: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 25,
    fontWeight: 'bold',
  },
  clubWrapper: {
    flexDirection: 'row',
  },
  clubText: {
    fontSize: 14,
  },
  club: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    left: '15%',
  },
  time: {
    marginTop: '2%',
    marginBottom: 0,
    fontSize: 18,
    marginLeft: 20,
    top: -25,
    left: '5%',
  },
  location: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 18,
    left: 15,
    bottom: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: '60%',
    height: '13%',
    marginLeft: '20%',
    marginBottom: '35%',
  },
  buttonStyle: {
    borderColor: '#03A9F4',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: 20,
    width: '80%',
  },
};

const eCardStyles = {
  title: {
    marginTop: 10,
    marginBottom: 3,
    fontSize: 25,
    fontWeight: 'bold',
  },
  clubIntro: {
    marginTop: 10,
    fontSize: 20,
  },
  club: {
    marginTop: 10,
    fontSize: 20,
  },
  date: {
    marginTop: 10,
    color: '#1198AB',
    fontWeight: 'bold',
  },
  locationText: {
    marginTop: 15,
    marginBottom: 30,
    fontSize: 20,
    left: '3.2%',
    bottom: '3.5%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: '60%',
    height: '13%',
    marginLeft: '20%',
    marginBottom: '35%',
  },
  buttonStyle: {
    borderColor: '#03A9F4',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: 20,
    width: '80%',
  },
};
