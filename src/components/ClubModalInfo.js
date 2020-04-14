import React from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import Modal from 'react-native-modal';

const ClubModalInfo = ({
  isVisible,
  toggle,
  name,
  email,
  website,
  instagram,
  twitter,
  facebook,
  meetinginfo,
}) => {
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
            {name ? name : ''}
          </Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subheader}>Email: {email ? email : ''}</Text>
          </View>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subheader}>
              Meeting Info: {meetinginfo ? meetinginfo : ''}
            </Text>
          </View>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subheader}>
              Website: {website ? website : ''}
            </Text>
          </View>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subheader}>
              Instagram: {instagram ? instagram : ''}
            </Text>
          </View>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subheader}>
              Facebook: {facebook ? facebook : ''}
            </Text>
          </View>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subheader}>
              Twitter: {twitter ? twitter : ''}
            </Text>
          </View>
          <Divider style={styles.divider} />
        </View>
        <View style={{flex: 1, marginBottom: '5%'}} />
      </ScrollView>
    </Modal>
  );
};

export {ClubModalInfo};

const styles = {
  subcontainer: {
    flex: 1,
    paddingLeft: '8%',
    paddingRight: '8%',
    marginTop: '2%',
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
