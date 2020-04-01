import React from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';

const TextButton = ({text, highlightStyle, textStyle, onPress}) => {
  return (
    <TouchableHighlight onPress={onPress} style={highlightStyle}>
      <Text style={textStyle}>{text}</Text>
    </TouchableHighlight>
  );
};

export default TextButton;
