import React from 'react';
import {View, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ImageShower = ({
  image,
  backgroundStyle,
  headerText,
  headerStyle,
  upperBodyText,
  upperBodyStyle,
  buttonText,
  buttonOnPress,
}) => {
  return (
    <View style={backgroundStyle}>
      <View style={styles.viewStyle}>
        {headerText && <Text style={headerStyle}>{headerText}</Text>}
        {upperBodyText && <Text style={upperBodyStyle}>{upperBodyText}</Text>}
      </View>

      <Image source={image} style={styles.imageStyle} />

      <Button
        buttonStyle={styles.buttonStyle}
        title={buttonText}
        titleStyle={styles.titleStyle}
        onPress={buttonOnPress}
      />
    </View>
  );
};

export {ImageShower};

const styles = {
  viewStyle: {
    marginLeft: '5%',
    width: '90%',
  },
  imageStyle: {
    width: windowWidth,
    height: '45%',
  },
  buttonStyle: {
    width: '95%',
    height: '25%',
    borderRadius: 10,
    backgroundColor: '#87CEEB',
    left: '7%',
    marginTop: '10%',
  },
  titleStyle: {
    color: '#1E90FF',
  },
};
