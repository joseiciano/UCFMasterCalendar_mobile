import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import axios from 'axios';
import * as firebase from 'firebase/app';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ModalTextBox = () => {};
const ModalForm = ({isVisible, toggle}) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [club, setClub] = useState('');
  const [location, setLocation] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const reset = () => {
    setName('');
    setTime('');
    setDate('');
    setClub('');
    setLocation('');
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <Modal
      isVisible={isVisible}
      animationType="slide"
      onModalWillShow={reset}
      transparent={true}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackButtonPress={() => exit}
      onBackdropPress={toggle}>
      <ScrollView
        style={{
          flex: 1,
          padding: 50,
          height: '100%',
          backgroundColor: 'white',
        }}>
        <View>
          <Text
            style={{fontFamily: 'Pacifico', fontSize: 20, textAlign: 'center'}}>
            Creating New Event
          </Text>
          <Divider style={styles.divider} />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.subheader}>Name</Text>
          <TextInput style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.subheader}>Description</Text>
          <TextInput multiline style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.subheader}>Location</Text>
          <TextInput style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.subheader}>Start Time</Text>
          <TextInput style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.subheader}>End Time</Text>
          <TextInput style={styles.input} />
          <Divider style={styles.divider} />
        </View>
        <View style={{flex: 1}}>
          <Button title="Submit" />
        </View>
      </ScrollView>
    </Modal>
  );
};

export {ModalForm};

const styles = {
  subheader: {
    fontSize: 17,
    textAlign: 'center',
  },
  divider: {
    height: '2%',
    marginTop: '2%',
    backgroundColor: 'black',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
};
