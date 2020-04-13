import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as firebase from 'firebase';
import {Redirect} from 'react-router-native';
import moment from 'moment';
import axios from 'axios';

const url =
  'https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1';

const EventListModal = ({isVisible, toggle, eventList, userClubs}) => {
  const [editEvent, setEditEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTimestamp, setStartTimestamp] = useState('');
  const [endTimestamp, setEndTimestamp] = useState('');
  const [eventId, setEventId] = useState('');
  const [clubId, setClubId] = useState('');
  const [clubName, setClubName] = useState('');
  const [location, setLocation] = useState('');
  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);
  const [redirectFlag, setRedirectFlag] = useState(false);
  const [userId, setUserId] = useState('');

  const handleRegister = () => {
    console.log('pepega submit');
  };

  useEffect(() => {
    console.log('eents', eventList);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('uid', user.uid);
        setUserId(user.uid);
        // const club = userClubs.filter(club => c)
      }
    });

    // console.log('clubs', userClubs);
    // console.log('events', eventList);
    // console.log('card', location);
  }, []);

  const toggleEdit = event => {
    // .clubName;
    // console.log('club', userClubs);
    if (!editEvent) {
      // console.log('event', event);
      const club = userClubs.filter(
        club => club.clubId === event.data.clubId,
      )[0];
      const startts = new Date(event.data.startTime);
      const endts = new Date(event.data.endTime);

      const starti = moment(startts).format('MMMM Do YYYY, h:mm:ss a');
      const endi = moment(endts).format('MMMM Do YYYY, h:mm:ss a');

      setSelectedEvent(event);
      setTitle(event.data.title);
      setDescription(event.data.description);
      setStartTime(starti);
      setEndTime(endi);
      setClubId(club.clubId);
      setClubName(club.clubName);
      setLocation(event.data.location);
      setStartTimeVisible(false);
      setEndTimeVisible(false);
      setRedirectFlag(false);
      setStartTimestamp(event.data.startTime);
      setEndTimestamp(event.data.endTimestamp);
      setEventId(event.id);
    }
    setEditEvent(!editEvent);
  };

  const handleSubmitEdit = () => {
    const newinfo = {
      title: title,
      description: description,
      clubId: clubId,
      location: location,
      startTime,
      startTime,
      endTime: endTime,
      userId: userId,
    };

    axios
      .put(`${url}/events/${eventId}`, newinfo)
      .then(res => setRedirectFlag(true))
      .catch(e => console.log('error in handleSubmitEdit', e));
  };

  const handleSubmitDelete = () => {
    axios
      .delete(`${url}/events/${eventId}`)
      .then(res => setRedirectFlag(true))
      .catch(e => console.log('error in handleSubmitDelete', e));
  };

  if (redirectFlag) {
    return <Redirect push to="/Bigbrain" />;
  }
  return (
    <Modal
      isVisible={isVisible}
      animationType="slide"
      transparent={true}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackButtonPress={!editEvent ? toggle : toggleEdit}
      onBackdropPress={!editEvent ? toggle : toggleEdit}>
      <ScrollView
        style={{
          flex: 1,
          height: '100%',
          backgroundColor: 'white',
        }}>
        <View style={{...styles.subcontainer, paddingTop: '6%'}}>
          <Text
            style={{fontFamily: 'Pacifico', fontSize: 20, textAlign: 'center'}}>
            Edit an Event
          </Text>
          <Divider style={styles.divider} />
        </View>

        {!editEvent &&
          eventList.map((event, idx) => {
            if (event.data.userId === userId)
              return (
                <View key={idx} style={styles.subcontainer}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleEdit(event);
                    }}>
                    <Text style={styles.subheader}>{event.data.title}</Text>
                  </TouchableOpacity>
                  <Divider style={styles.divider} />
                </View>
              );
          })}
        {editEvent && (
          <View>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Event Name</Text>
              <TextInput
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Club Name</Text>
              <TextInput
                value={clubName}
                editable={false}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Description</Text>
              <TextInput
                multiline
                value={description}
                onChangeText={text => setDescription(text)}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Start Time</Text>
              <TouchableOpacity onPress={() => setStartTimeVisible(true)}>
                <DateTimePickerModal
                  isVisible={startTimeVisible}
                  mode="datetime"
                  onConfirm={time => {
                    const newtime = moment(time).format(
                      'MMMM Do YYYY, h:mm:ss a',
                    );
                    const uploadtime = time.toUTCString();

                    setStartTimeVisible(false);
                    setStartTimestamp(uploadtime);
                    setStartTime(newtime);
                  }}
                  onCancel={() => setStartTimeVisible(false)}
                />
                <TextInput
                  value={startTime}
                  editable={false}
                  style={styles.input}
                />
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>End Time</Text>
              <TouchableOpacity onPress={() => console.log('pepega')}>
                <DateTimePickerModal
                  isVisible={endTimeVisible}
                  mode="datetime"
                  onConfirm={time => {
                    const newtime = moment(time).format(
                      'MMMM Do YYYY, h:mm:ss a',
                    );
                    const uploadtime = time.toUTCString();

                    setEndTimeVisible(false);
                    setEndTimestamp(uploadtime);
                    setEndTime(newtime);
                  }}
                  onCancel={() => setEndTimeVisible(false)}
                />
                <TextInput
                  value={endTime}
                  editable={false}
                  style={styles.input}
                />
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Location</Text>

              <TextInput
                value={location}
                onChangeText={text => setLocation(text)}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={styles.subcontainer}>
                <Button
                  title="Submit"
                  buttonStyle={styles.submitButton}
                  titleStyle={{color: '#03A9F4'}}
                  onPress={handleSubmitEdit}
                />
              </View>
              <View style={styles.subcontainer}>
                <Button
                  title="Delete"
                  buttonStyle={styles.submitButton}
                  titleStyle={{color: '#03A9F4'}}
                  onPress={handleSubmitDelete}
                />
              </View>
            </View>
          </View>
        )}
        <View style={{flex: 1, marginBottom: '5%'}} />
      </ScrollView>
    </Modal>
  );
};

export {EventListModal};

const styles = {
  subcontainer: {
    flex: 1,
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  subheader: {
    fontSize: 17,
    marginTop: '2%',
    textAlign: 'center',
  },
  divider: {
    height: '2%',
    marginTop: '5%',
    backgroundColor: 'black',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
  },
  submitButton: {
    borderColor: '#03A9F4',
    marginTop: '3%',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: '10%',
    width: '80%',
  },
};
