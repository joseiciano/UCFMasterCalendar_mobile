import React, {Component} from 'react';
import {Navbar} from '../components/Navbar';
import {View, Text, Image, TextInput} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {Redirect} from 'react-router-native';
import {Dimensions} from 'react-native';
import * as firebase from 'firebase';

import techHeart from '../assets/images/techHeart.png';
const windowWidth = Dimensions.get('window').width;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectHome: false,
      redirectLogin: false,
      errorMessage: '',
    };
  }

  redirectHome = () => this.setState({redirectHome: true});
  redirectLogin = () => this.setState({redirectLogin: true});
  handleRegister = () => {
    if (this.state.password.length < 6) {
      this.setState({errorMessage: 'Password should be at least 6 characters'});
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          const user = firebase.auth().currentUser;

          user.sendEmailVerification();
        })
        .then(res => {
          firebase.auth().signOut();
          this.redirectHome();
        })
        .catch(e => this.setState({errorMessage: e.message}));
    }
  };

  render() {
    if (this.state.redirectLogin) {
      return <Redirect push to="/Login" />;
    }
    if (this.state.redirectHome) {
      return <Redirect to="/Biggerbrain" />;
    }
    return (
      <View style={{flex: 1, height: '100%'}}>
        <View style={{backgroundColor: 'blue', height: '10%'}}>
          <Navbar />
        </View>

        <View style={{backgroundColor: 'pink', height: '100%'}}>
          <View style={styles.backgroundStyle}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 40,
                color: '#178B99',
              }}>
              Register
            </Text>

            <Card title="Register a New Account">
              <Text style={{fontSize: 17, marginTop: '2%', color: 'red'}}>
                {this.state.errorMessage}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 17, marginTop: '2%'}}>Email: </Text>
                <TextInput
                  editable={true}
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    width: '69%',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    marginLeft: '14%',
                  }}
                  onChangeText={text => this.setState({email: text})}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: '5%'}}>
                <Text style={{fontSize: 17, marginTop: '2%'}}>Password:</Text>
                <TextInput
                  editable={true}
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    width: '69%',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    marginLeft: '1.6%',
                  }}
                  onChangeText={text => this.setState({password: text})}
                  secureTextEntry={true}
                />
              </View>
              <Button
                buttonStyle={styles.buttonStyle}
                title={'Register'}
                titleStyle={styles.titleStyle}
                onPress={this.handleRegister}
              />
              <Button
                buttonStyle={styles.buttonStyle}
                title={'Need an account?'}
                titleStyle={styles.titleStyle}
                onPress={this.redirectLogin}
              />
              <Button
                buttonStyle={styles.buttonStyle}
                title={'Need an account?'}
                titleStyle={styles.titleStyle}
                onPress={this.redirectLogin}
              />
            </Card>
            {/* <Image source={techHeart} style={styles.imageStyle} /> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  backgroundStyle: {
    backgroundColor: '#D0F5F7',
    borderRadius: 0,
    height: '100%',
  },
  viewStyle: {
    marginLeft: '5%',
    width: '90%',
  },
  imageStyle: {
    width: windowWidth,
    height: '30%',
  },
  buttonStyle: {
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#87CEEB',
    left: '7%',
    marginTop: '7%',
  },
  titleStyle: {
    color: '#1E90FF',
  },
};
