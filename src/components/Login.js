import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import Modal from 'react-native-modal';
import * as firebase from 'firebase/app';
import {useHistory} from 'react-router-native';

const Login = ({isVisible, toggle}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = e => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        toggle();
        history.push('/');
      })
      .catch(error => {
        console.log('error logging in user', error);
      });
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
        <View style={{...styles.subcontainer, paddingTop: '6%'}}>
          <Text
            style={{fontFamily: 'Pacifico', fontSize: 20, textAlign: 'center'}}>
            Login to an Existing Account
          </Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={text => setPassword(text)}
          />
          <Divider style={styles.divider} />
        </View>
        <View style={styles.subcontainer}>
          <Button
            title="Log In"
            buttonStyle={styles.submitButton}
            titleStyle={{color: '#03A9F4'}}
            onPress={handleLogin}
          />
        </View>
        <View style={{flex: 1, marginBottom: '5%'}} />
      </ScrollView>
    </Modal>
  );
};

export default Login;

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
    marginLeft: '10.5%',
    width: '80%',
  },
};
