import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Button} from 'react-native-elements';

const ClubCard = ({club}) => {
  return (
    <Card
      containerStyle={{
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: '12.25%',
        borderColor: '#03A9F4',
      }}
      image={club.image}
      imageWrapperStyle={{
        borderRadius: 15,
        borderColor: 'pink',
      }}
      imageStyle={{
        height: 200,
      }}>
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
