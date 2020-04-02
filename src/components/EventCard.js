import React from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import {Card, Button} from 'react-native-elements';
import pin from '../assets/images/pin.png';

const EventCard = ({event}) => {
  return (
    <Card containerStyle={{borderRadius: 15, height: 300}}>
      <View style={{marginLeft: 5}}>
        <Text style={styles.date}>WED, FEB 19, 5:30PM</Text>
        <Text style={styles.title}>
          React Fundamentals: Introduction to React
        </Text>
        <Text style={styles.club}>Knight Hacks</Text>

        <Text style={{marginTop: 15, marginBottom: 30, fontSize: 16}}>
          HEC 450
        </Text>

        <View style={styles.buttonWrapper}>
          <Button
            buttonStyle={styles.buttonStyle}
            title={'Register'}
            titleStyle={{color: '#03A9F4'}}
          />

          <Button
            buttonStyle={styles.buttonStyle}
            title={'View'}
            titleStyle={{color: '#03A9F4'}}
          />
        </View>
      </View>
    </Card>
  );
};

export {EventCard};

const styles = {
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
