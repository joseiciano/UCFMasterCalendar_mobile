import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Redirect} from 'react-router-native';
import * as firebase from 'firebase/app';

const Navbar = ({hideButtons}) => {
  const [gotoLogin, setgotoLogin] = useState(false);
  const [gotoRegister, setgotoRegister] = useState(false);
  const [gotoHome, setgotoHome] = useState(false);
  const [gotoLogout, setgotoLogout] = useState(false);
  const [loggedin, setLoggedin] = useState(false);

  const redirectLogin = () => setgotoLogin(true);
  const redirectRegister = () => setgotoRegister(true);
  const redirectHome = () => setgotoHome(true);
  const redirectLogout = () => setgotoLogout(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) setLoggedin(true);
    });
  }, []);

  if (gotoHome) {
    return <Redirect to="/Biggerbrain" />;
  }
  if (gotoLogin) {
    return <Redirect to="/Login" />;
  }
  if (gotoRegister) {
    return <Redirect to="/Register" />;
  }
  if (gotoLogout) {
    setgotoLogout(false);
    return <Redirect to="/Logout" />;
  }

  if (hideButtons) {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity onPress={redirectHome}>
          <Text style={styles.nameBtn}>Knightro</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity onPress={redirectHome}>
          <Text style={styles.nameBtn}>Knightro</Text>
        </TouchableOpacity>

        {!loggedin && (
          <TouchableOpacity
            onPress={redirectLogin}
            style={{
              activeOpacity: 0.4,
              marginLeft: '3%',
              width: '30%',
            }}>
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>
        )}
        {!loggedin && (
          <TouchableOpacity
            onPress={redirectRegister}
            style={{
              activeOpacity: 0.4,
              right: '10%',
              width: '30%',
            }}>
            <Text style={styles.register}>Sign Up</Text>
          </TouchableOpacity>
        )}

        {loggedin && (
          <TouchableOpacity
            onPress={redirectLogout}
            style={{activeOpacity: 0.4, marginLeft: '30%', width: '30%'}}>
            <Text style={styles.register}>Log Out</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#F5F5F5',
    height: '2%',
    flexDirection: 'row',
    flex: 1,
  },
  nameWrapper: {
    width: '40%',
    backgroundColor: 'grey',
  },
  nameBtn: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Pacifico',
    fontSize: 25,
    bottom: '1%',
    marginLeft: '2%',
  },
  login: {
    color: '#C0C0C0',
    textAlign: 'center',
    top: '25%',
    fontSize: 20,
    marginTop: '4.5%',
  },
  register: {
    color: '#C0C0C0',
    fontSize: 20,
    top: '25%',
    textAlign: 'center',
    marginTop: '4.5%',
  },
});

export {Navbar};
