import React from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import {Card, Button} from 'react-native-elements';

import {Divider} from 'react-native-elements';
import pin from '../assets/images/pin.png';

const EventPageCard = ({event}) => {
  return (
    <Card containerStyle={{borderRadius: 15, height: 300}}>
      <View style={{marginLeft: 5}}>
        <Text style={ePageStyles.title}>
          React Fundamentals: Introduction to React
        </Text>

        <View style={ePageStyles.clubWrapper}>
          <Text style={ePageStyles.clubText}>Hosted by: </Text>
          <Text style={{...ePageStyles.clubText, fontWeight: 'bold'}}>
            Knight Hacks
          </Text>
        </View>
        <Text style={ePageStyles.date}>WED, FEB 19, 5:30PM</Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={{marginTop: 15, marginBottom: 30, fontSize: 16}}>
            HEC 450
          </Text>
        </View>

        <View style={ePageStyles.buttonWrapper}>
          <Button
            buttonStyle={ePageStyles.buttonStyle}
            title={'Register'}
            titleStyle={{color: '#03A9F4'}}
          />

          <Button
            buttonStyle={ePageStyles.buttonStyle}
            title={'View'}
            titleStyle={{color: '#03A9F4'}}
          />
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

        <Text style={{marginTop: 15, marginBottom: 30, fontSize: 16}}>
          HEC 450
        </Text>

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
    marginTop: 20,
    marginBottom: 8,
    fontSize: 25,
    fontWeight: 'bold',
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
