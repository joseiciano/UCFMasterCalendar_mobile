import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import TextButton from './TextButton';

const Navbar = ({leftText, rightText1, rightText2}) => {
  return (
    <View style={styles.navBar}>
      <Text style={styles.nameBtn}>{leftText}</Text>
      <Text onPress={() => console.log('login')} style={styles.login}>
        {rightText1}
      </Text>
      <Text onPress={() => console.log('login')} style={styles.register}>
        {rightText2}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'grey',
    height: 50,
    flexDirection: 'row',
  },
  nameBtn: {
    color: 'red',
    backgroundColor: 'grey',
    width: '20%',
  },
  login: {
    color: 'red',
    backgroundColor: 'teal',
    marginLeft: '40%',
    width: '15%',
  },
  register: {
    color: 'blue',
    backgroundColor: 'red',
    marginLeft: '5%',
    width: '15%',
  },
});

export default Navbar;
