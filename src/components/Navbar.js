import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useHistory} from 'react-router-native';
import Login from './Login';
import Register from './Register';
import {Redirect} from 'react-router-native';
import * as firebase from 'firebase/app';

const Navbar = ({
  leftText,
  rightText1,
  rightText1OnPress,
  rightText2,
  rightText2OnPress,
}) => {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [signInState, setSignInState] = useState(false);
  const [etFlag, setETFlag] = useState(false);
  const history = useHistory();

  const toggleLogin = () => setLoginModal(!loginModal);
  const toggleRegister = () => setRegisterModal(!registerModal);

  const logout = () => {
    firebase.auth().signOut();

    if (history.location.pathname !== '/') setETFlag(true);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setSignInState(true);
      }
    });
    setETFlag(false);
  }, []);

  if (etFlag) {
    if (history.location.pathname !== '/') return <Redirect push to="/" />;
  }

  return (
    <View style={styles.navBar}>
      <Login isVisible={loginModal} toggle={toggleLogin} />
      <Register isVisible={registerModal} toggle={toggleRegister} />
      <TouchableOpacity
        onPress={() => {
          if (history.location.pathname !== '/') setETFlag(true);
        }}>
        <Text style={styles.nameBtn}>{leftText}</Text>
      </TouchableOpacity>

      {!signInState && (
        <TouchableOpacity
          onPress={toggleLogin}
          style={{activeOpacity: 0.4, marginLeft: '25%', width: '18%'}}>
          <Text style={styles.login}>{rightText1}</Text>
        </TouchableOpacity>
      )}

      {!signInState && (
        <TouchableOpacity
          onPress={toggleRegister}
          style={{activeOpacity: 0.4, marginLeft: '2%', width: '18%'}}>
          <Text style={styles.register}>{rightText2}</Text>
        </TouchableOpacity>
      )}

      {signInState && (
        <TouchableOpacity
          onPress={logout}
          style={{activeOpacity: 0.4, marginLeft: '38.6%', width: '18%'}}>
          <Text style={styles.register}>Log Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
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
    fontSize: 33,
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
