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
import {Redirect} from 'react-router-native';
import axios from 'axios';
import firebase from 'firebase';
import 'firebase/auth';

const EventModalForm = ({
  isVisible,
  toggle,
  eventList,
  changeEventList,
  userClubs,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startTimestamp, setStartTimestamp] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endTimestamp, setEndTimestamp] = useState('');
  const [clubId, setClubId] = useState('');
  const [clubName, setClubName] = useState('');
  const [location, setLocation] = useState('');
  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);
  const [redirectFlag, setRedirectFlag] = useState(false);
  const [userId, setUserId] = useState('');
  const [clubFlag, setClubFlag] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  const reset = () => {
    setTitle('');
    setStartTime('');
    setEndTime('');
    setClubId('');
    setClubName('');
    setLocation('');
  };

  const handleSubmit = () => {
    const newinfo = {
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      clubId: clubId,
      userId: userId,
      location: location,
    };
    // console.log('SUBMIT', newinfo);
    // console.log('CLUBS', userClubs);
    // console.log('STARTTIME', startTime);
    // let dates = new Date(1605618000 * 1000);
    // console.log(dates.toTimeString());
    axios
      .post(
        `https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/events`,
        newinfo,
      )
      .then(res => {
        setRedirectFlag(true);
      })
      .catch(e => console.log('Error posting to server', e));
  };

  const toggleClubFlag = () => setClubFlag(!clubFlag);

  if (redirectFlag) {
    return <Redirect push to="/Bigbrain" />;
  }
  return (
    <Modal
      isVisible={isVisible}
      animationType="slide"
      onModalWillShow={reset}
      transparent={true}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}>
      <ScrollView
        style={{
          flex: 1,
          height: '100%',
          backgroundColor: 'white',
        }}>
        {clubFlag && (
          <View>
            <View style={{...styles.subcontainer, paddingTop: '8%'}}>
              <Text
                style={{
                  fontFamily: 'Pacifico',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                Choose a Club
              </Text>
              <Divider style={styles.divider} />
            </View>
            {userClubs.map((club, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    flex: 1,
                    paddingLeft: '8%',
                    paddingRight: '8%',
                    marginTop: '2%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setClubId(club.clubId);
                      setClubName(club.clubName);
                      toggleClubFlag();
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        marginTop: '2%',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      {club.clubName}
                    </Text>
                  </TouchableOpacity>
                  <Divider
                    style={{
                      height: '2%',
                      marginTop: '5%',
                      backgroundColor: 'black',
                    }}
                  />
                </View>
              );
            })}
          </View>
        )}
        {!clubFlag && (
          <View>
            <View style={{...styles.subcontainer, paddingTop: '8%'}}>
              <Text
                style={{
                  fontFamily: 'Pacifico',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                Creating New Event
              </Text>
              <Divider style={styles.divider} />
            </View>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Event Name</Text>
              <TextInput
                onChangeText={text => setTitle(text)}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Associated Club</Text>
              <TouchableOpacity onPress={toggleClubFlag}>
                <TextInput
                  value={clubName}
                  editable={false}
                  style={styles.input}
                />
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Description</Text>
              <TextInput
                multiline
                onChangeText={text => setDescription(text)}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Location</Text>
              <TextInput
                onChangeText={text => setLocation(text)}
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
                    setStartTimeVisible(false);
                    setStartTimestamp(time.toUTCString());
                    setStartTime(time.getTime());
                  }}
                  onCancel={() => setStartTimeVisible(false)}
                />
                <TextInput
                  value={startTimestamp}
                  editable={false}
                  style={styles.input}
                />
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>End Time</Text>
              <TouchableOpacity onPress={() => setEndTimeVisible(true)}>
                <DateTimePickerModal
                  isVisible={endTimeVisible}
                  mode="datetime"
                  onConfirm={time => {
                    setEndTimeVisible(false);
                    setEndTimestamp(time.toUTCString());
                    setEndTime(time.getTime());
                  }}
                  onCancel={() => setEndTimeVisible(false)}
                />
                <TextInput
                  value={endTimestamp}
                  editable={false}
                  style={styles.input}
                />
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Button
                title="Submit"
                buttonStyle={styles.submitButton}
                titleStyle={{color: '#03A9F4'}}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
        <View style={{flex: 1, marginBottom: '5%'}} />
      </ScrollView>
    </Modal>
  );
};

export {EventModalForm};

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
    color: 'black',
    textAlign: 'center',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
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
