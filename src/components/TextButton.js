import React from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';

const TextButton = ({text, btnStyle, onPress}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Text style={btnStyle}>{text}</Text>
    </TouchableHighlight>
  );
};

export default TextButton;
