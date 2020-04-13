import React, {useEffect} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import Modal from 'react-native-modal';

const EventListModal = ({
  isVisible,
  toggle,
  title,
  location,
  clubId,
  description,
  startTime,
}) => {
  const handleRegister = () => {
    console.log('pepega submit');
  };

  useEffect(() => {
    console.log('title', title);
    // console.log('card', location);
  }, []);

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
        <View style={{...styles.subcontainer, paddingTop: '6%'}}>
          <Text
            style={{fontFamily: 'Pacifico', fontSize: 20, textAlign: 'center'}}>
            {title}
          </Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Event Name</Text>
          <TextInput value={title} editable={false} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Who</Text>
          <TextInput value={clubId} editable={false} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>What</Text>
          <TextInput
            value={description}
            multiline
            editable={false}
            style={styles.input}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>When</Text>
          <TextInput value={startTime} editable={false} style={styles.input} />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Where</Text>
          <TextInput value={location} editable={false} style={styles.input} />
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
    marginLeft: 20,
    width: '80%',
  },
};
