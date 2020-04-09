import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Button, Row, Col} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
import {ModalInfo} from './ModalInfo';

const windowWidth = Dimensions.get('window').width;

const EventCard = ({event}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Card
      containerStyle={{borderRadius: 15, height: 300, borderColor: '#03A9F4'}}>
      <TouchableOpacity onPress={toggleModal} style={{marginLeft: 5}}>
        <ModalInfo isVisible={modalVisible} toggle={toggleModal} />
        <Text style={styles.title}>
          React Fundamentals: Introduction to React
        </Text>
        <View flexDirection="row">
          <Text style={styles.clubIntro}>Hosted by </Text>
          <Text style={styles.club}>Knight Hacks</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name="md-time"
            size={windowWidth * 0.08}
            onPress={() => console.log('pressed icon')}
            style={{color: 'black', top: '7.5%'}}
          />
          <Text style={styles.date}>Wednesday, February 20th, 2020</Text>
        </View>
        <Text style={styles.time}>5:30 PM to 8:30 PM</Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name="md-pin"
            size={windowWidth * 0.08}
            onPress={() => console.log('pressed icon')}
            style={{color: 'black'}}
          />
          <Text style={styles.location}>HEC 450</Text>
        </View>
      </TouchableOpacity>
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
};
