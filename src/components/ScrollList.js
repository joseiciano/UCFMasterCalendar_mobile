import React from 'react';
import {View, Text} from 'react-native';
import {Card, Button} from 'react-native-elements';

const ScrollList = ({items, buttonTitle, buttonStyle, buttonOnPress}) => {
  return (
    <View>
      {items.map(item => (
        <Card
          key={item.id}
          image={item.image}
          containerStyle={{marginTop: 30, borderRadius: 15}}>
          <Text>{item.title}</Text>
          {item.summary ? (
            <Text style={{marginBottom: 10}}>{item.summary}</Text>
          ) : (
            <Text style={{marginBottom: 10}}>
              {' '}
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
          )}
          <Button
            buttonStyle={buttonStyle}
            onPress={buttonOnPress}
            // buttonStyle={{
            //   borderRadius: 0,
            //   marginLeft: 0,
            //   marginRight: 0,
            //   marginBottom: 0,
            // }}
            title={buttonTitle}
          />
        </Card>
      ))}
    </View>
  );
};

export {ScrollList};
