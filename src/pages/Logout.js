import React, {Component} from 'react';
import {Navbar} from '../components/Navbar';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {Redirect} from 'react-router-native';
import {Dimensions} from 'react-native';
import * as firebase from 'firebase';

import techHeart from '../assets/images/techHeart.png';
const windowWidth = Dimensions.get('window').width;

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectHome: false,
    };
  }

  redirectHome = () => this.setState({redirectHome: true});

  logout = () => {
    firebase.auth().signOut();
    this.setState({redirectHome: true});
  };

  render() {
    if (this.state.redirectHome) {
      return <Redirect push to="/Biggerbrain" />;
    }
    return (
      <View style={{flex: 1, height: '100%'}}>
        <View style={{backgroundColor: 'blue', height: '10%'}}>
          <Navbar hideButtons={true} />
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
              Logged Out
            </Text>

            <TouchableOpacity
              onPress={this.redirectHome}
              style={{height: '40%'}}>
              <Card title="Successfully Logged Out">
                <View style={{flexDirection: 'row', height: '100%'}}>
                  <Text style={{fontSize: 17, marginTop: '2%'}}>
                    Successfully logged out. Thank you for using our service.
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
            <Image source={techHeart} style={styles.imageStyle} />
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
    height: '41%',
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
