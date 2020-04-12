import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {View, Text} from 'react-native';

// This is the biggest brain play here
// 230 am 5 days nonstop coding
// This is why you use redux
// Literally just here to force a refresh because history.replace() aint working
// And because windows.location.refresh() aint working here either
const BigBrain = () => {
  const history = useHistory();
  useEffect(() => {
    history.push(history.entries[-1]);
  }, []);
  return (
    <View>
      <Text>If you see this, well we fucked up somewhere</Text>
    </View>
  );
};
export default BigBrain;
