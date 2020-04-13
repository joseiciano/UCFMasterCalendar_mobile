import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Button, Row, Col} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
import moment from 'moment';
import {EventModalInfo} from './EventModalInfo';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const windowWidth = Dimensions.get('window').width;

const EventCard = ({event, clubs}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [clubName, setClubName] = useState('');

  const toggleModal = () => {
    // console.log('pepega');

    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const curstart = new Date(event.data.startTime);
    const curend = new Date(event.data.endTime);

    const starti = moment(curstart).format('MMMM Do YYYY, h:mm:ss a');
    const endi = moment(curend).format('MMMM Do YYYY, h:mm:ss a');

    // console.log('PEPEGA', clubs);
    const club = clubs.filter(club => club.clubId === event.data.clubId)[0];
    setClubName(club);
    setStart(starti);
    setEnd(endi);
  }, []);

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
          title={event.data.title}
          location={event.data.location}
          clubId={event.data.clubId}
          clubName={clubName}
          description={event.data.description}
          startTime={start}
          endTime={end}
        />
        <Text style={styles.title}>{event.data.title}</Text>
        <View flexDirection="row">
          <Text style={styles.clubIntro}>Hosted by </Text>
          <Text style={styles.club}>{clubName.name}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name="md-time"
            size={windowWidth * 0.08}
            onPress={() => console.log('pressed icon')}
            style={{color: 'black', top: '7.5%'}}
          />
          <Text style={styles.date}>{start}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name="md-pin"
            size={windowWidth * 0.08}
            onPress={() => console.log('pressed icon')}
            style={{color: 'black'}}
          />
          <Text style={styles.location}>
            {event.data.location && event.data.location.toUpperCase()}
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
