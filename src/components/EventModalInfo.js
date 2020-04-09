import React from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import Modal from 'react-native-modal';

const EventModalInfo = ({isVisible, toggle}) => {
  const handleRegister = () => {
    console.log('pepega submit');
  };

  return (
    <Modal
      isVisible={isVisible}
      animationType="slide"
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
            (Insert Event Title Here)
          </Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Event Name</Text>
          <TextInput editable={false} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Host Name</Text>
          <TextInput editable={false} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Description</Text>
          <TextInput multiline editable={false} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Location</Text>
          <TextInput editable={false} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Date</Text>
          <TextInput editable={false} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Start Time</Text>
          <TextInput editable={false} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>End Time</Text>
          <TextInput editable={false} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Button
            title="Submit"
            buttonStyle={styles.submitButton}
            titleStyle={{color: '#03A9F4'}}
            onPress={handleRegister}
          />
        </View>
        <View style={{flex: 1, marginBottom: '5%'}} />
      </ScrollView>
    </Modal>
  );
};

export {EventModalInfo};

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
