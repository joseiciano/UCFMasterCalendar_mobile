import React from 'react';
import {View, Text} from 'react-native';
import TextButton from './TextButton';

const Navbar = () => {
  return (
    <View style={{backgroundColor: 'teal', flexDirection: 'row'}}>
      <Text style={{color: 'red', width: '50%'}}>Knightro</Text>

      <TextButton
        text={'Log in'}
        btnStyle={{color: 'red'}}
        onPress={() => console.log('dank')}
      />
      <TextButton
        text={'Sign Up'}
        btnStyle={{color: 'red', marginLeft: '10px'}}
        onPress={() => console.log('dank')}
      />
    </View>
  );
};

export default Navbar;
