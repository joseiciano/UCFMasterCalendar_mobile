import React from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import {Card, Button, Row, Col} from 'react-native-elements';

import {Divider} from 'react-native-elements';
import pin from '../assets/images/pin.png';
import clock from '../assets/images/clock.png';

const EventPageCard = ({event}) => {
  return (
    <Card containerStyle={{borderRadius: 15, height: 300}}>
      <View style={{marginLeft: 5}}>
        <Text style={eCardStyles.title}>
          React Fundamentals: Introduction to React
        </Text>
        <View flexDirection="row">
          <Text style={eCardStyles.clubIntro}>Hosted by </Text>
          <Text style={eCardStyles.club}>Knight Hacks</Text>
        </View>

        <View flexDirection="row">
          <Image
            source={clock}
            style={{
              marginTop: 15,
              marginBottom: 20,
              width: '15%',
              height: '80%',
              left: -10,
            }}
          />
          <Text
            style={{marginTop: 20, marginBottom: 20, fontSize: 16, left: 0}}>
            Wednesday, February 20th, 2020
          </Text>
        </View>
        <Text
          style={{
            marginTop: 0,
            marginBottom: 0,
            fontSize: 16,
            left: 55,
            top: -25,
            left: 52,
          }}>
          5:30 PM to 8:30 PM
        </Text>
        <View flexDirection="row">
          <Image
            source={pin}
            style={{
              marginTop: 10,
              marginBottom: 30,
              width: '11%',
              height: '80%',
              left: 5,
            }}
          />
          <Text
            style={{marginTop: 20, marginBottom: 30, fontSize: 16, left: 15}}>
            HEC 450
          </Text>
        </View>
      </View>
    </Card>
  );
};

const EventCard = ({event}) => {
  return (
    <Card containerStyle={{borderRadius: 15, height: 300}}>
      <View style={{marginLeft: 5}}>
        <Text style={eCardStyles.date}>WED, FEB 19, 5:30PM</Text>
        <Text style={eCardStyles.title}>
          React Fundamentals: Introduction to React
        </Text>
        <Text style={eCardStyles.club}>Knight Hacks</Text>

        <View flexDirection="row">
          <Image
            source={pin}
            style={{
              marginTop: 10,
              marginBottom: 30,
              width: '10%',
              height: '80%',
            }}
          />
          <Text
            style={{marginTop: 15, marginBottom: 30, fontSize: 16, left: -10}}>
            HEC 450
          </Text>
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
    backgroundColor: 'pink',
    flexDirection: 'row',
    backgroundColor: 'pink',
  },
  clubText: {
    fontSize: 14,
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
    fontWeight: 'bold',
  },
  date: {
    marginTop: 10,
    color: '#1198AB',
    fontWeight: 'bold',
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
