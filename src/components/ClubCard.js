import React from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import {Card, Button} from 'react-native-elements';
import pin from '../assets/images/pin.png';

const ClubCard = ({club}) => {
  return (
    <Card
      containerStyle={{borderRadius: 15, height: 400}}
      image={club.image}
      imageStyle={{height: 200}}>
      <View style={styles.textblock}>
        <Text style={styles.title}>Club</Text>

        <Text
          style={{
            marginTop: 10,
            marginBottom: 30,
            marginRight: 35,
            fontSize: 18,
            width: 260,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempo incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </Card>
  );
};

const styles = {
  textblock: {
    marginLeft: 10,
    bottom: 10,
  },
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
  buttonStyle: {
    width: '32%',
    height: '33%',
    borderColor: '#03A9F4',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    left: 225,
  },
};

export {ClubCard};
