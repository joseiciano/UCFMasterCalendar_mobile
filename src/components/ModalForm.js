import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import axios from 'axios';
import * as firebase from 'firebase/app';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ModalForm = ({isVisible, toggle}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [club, setClub] = useState('');
  const [location, setLocation] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const reset = () => {
    setName('');
    setStartTime('');
    setEndTime('');
    setDate('');
    setClub('');
    setLocation('');
  };

  const showDatePicker = () => setDatePickerVisibility(true);

  const hideDatePicker = () => setDatePickerVisibility(false);

  const showTimePicker = () => setTimePickerVisibility(true);

  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleConfirmDate = date => {
    setDate(date);
    hideDatePicker();
  };

  const handleConfirmStartTime = time => {
    setStartTime(time);
    hideDatePicker();
  };

  const handleConfirmEndTime = time => {
    setEndTime(time);
    hideDatePicker();
  };

  const handleSubmit = () => {
    console.log('pepega submit');
  };

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
        <View style={{...styles.subcontainer, paddingTop: '8%'}}>
          <Text
            style={{fontFamily: 'Pacifico', fontSize: 20, textAlign: 'center'}}>
            Creating New Event
          </Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Event Name</Text>
          <TextInput onChange={text => setName(text)} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Description</Text>
          <TextInput
            multiline
            onChange={text => setDescription(text)}
            style={styles.input}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Location</Text>
          <TextInput
            onChange={text => setLocation(text)}
            style={styles.input}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Date</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
            <TextInput
              editable={false}
              onChange={text => setDate(text)}
              style={styles.input}
            />
          </TouchableOpacity>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Start Time</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmStartTime}
              onCancel={hideTimePicker}
            />
            <TextInput editable={false} style={styles.input} />
          </TouchableOpacity>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>End Time</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmEndTime}
              onCancel={hideTimePicker}
            />
            <TextInput editable={false} style={styles.input} />
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
        <View style={{flex: 1, marginBottom: '5%'}} />
      </ScrollView>
    </Modal>
  );
};

export {ModalForm};

const styles = {
  subcontainer: {
    flex: 1,
    paddingLeft: '12%',
    paddingRight: '12%',
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
  },
  submitButton: {
    borderColor: '#03A9F4',
    marginTop: '3%',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: 20,
    width: '80%',
  },
};
