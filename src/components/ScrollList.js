import React from 'react';
import {View} from 'react-native';
import {Card, Button} from 'react-native-elements';

const ScrollList = ({items, buttonTitle, buttonStyle, buttonOnPress}) => {
  return (
    <View>
      {items.map(item => {
        return <Card key={item.id} title={item.title} />;
      })}
      <Button
        title={buttonTitle}
        buttonStyle={buttonStyle}
        onPress={buttonOnPress}
      />
    </View>
  );
};

export default ScrollList;
