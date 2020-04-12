import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Button, Row, Col} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
import {EventModalInfo} from './EventModalInfo';

const windowWidth = Dimensions.get('window').width;

const EventCard = ({event}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // useEffect(() => {
  //   console.log('event', event);
  // }, []);

  return (
    <Card
      containerStyle={{
        borderRadius: 15,
        height: 300,
        borderColor: '#03A9F4',
      }}>
      <TouchableOpacity onPress={toggleModal} style={{marginLeft: 5}}>
        <EventModalInfo
          isVisible={modalVisible}
          toggle={toggleModal}
          title={event.title}
          location={event.location}
          clubId={event.clubId}
          description={event.description}
          startTime={event.startTime}
          startDate={event.startDate}
          endDate={event.endDate}
          endTime={event.endTime}
        />
        <Text style={styles.title}>{event.title}</Text>
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
          <Text style={styles.date}>{event.startDate}</Text>
        </View>
        <Text style={styles.time}>
          {event.startTime} to {event.endTime}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name="md-pin"
            size={windowWidth * 0.08}
            onPress={() => console.log('pressed icon')}
            style={{color: 'black'}}
          />
          <Text style={styles.location}>
            {event.location && event.location.toUpperCase()}
          </Text>
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
