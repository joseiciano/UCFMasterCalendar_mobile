import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Navbar = ({
  leftText,
  rightText1,
  rightText1OnPress,
  rightText2,
  rightText2OnPress,
}) => {
  return (
    <View style={styles.navBar}>
      <Text style={styles.nameBtn}>{leftText}</Text>
      <Text onPress={rightText1OnPress} style={styles.login}>
        {rightText1}
      </Text>
      <Text onPress={rightText2OnPress} style={styles.register}>
        {rightText2}
      </Text>
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
    marginLeft: '25%',
    textAlign: 'center',
    fontSize: 20,
    marginTop: '4.5%',
    height: '60%',
  },
  register: {
    color: '#C0C0C0',
    marginLeft: '5%',
    width: '18%',
    fontSize: 20,
    textAlign: 'center',
    marginTop: '4.5%',
    height: '60%',
  },
});

export {Navbar};
