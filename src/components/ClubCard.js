import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import {ClubModalInfo} from './ClubModalInfo';

const ClubCard = ({club}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);
  // useEffect(() => {
  //   console.log('card', club);
  // }, []);

  return (
    <Card
      containerStyle={styles.container}
      image={{uri: club.image}}
      imageStyle={{height: 200}}>
      <TouchableOpacity onPress={toggleModal}>
        <ClubModalInfo isVisible={modalVisible} toggle={toggleModal} />
        <View style={styles.textblock}>
          <Text style={styles.title}>{club.name}</Text>
          <Text style={styles.description}>{club.description}</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = {
  container: {
    flex: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 530,
    borderColor: '#03A9F4',
  },
  textblock: {
    marginLeft: 10,
    bottom: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 25,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    marginBottom: 30,
    marginRight: 35,
    fontSize: 18,
  },
  club: {
    marginTop: 10,
    fontSize: 20,
  },
  date: {
    marginTop: 10,
    color: '#1198AB',
    fontWeight: 'bold',
  },
  buttonStyle: {
    width: '32%',
    height: '33%',
    borderColor: '#03A9F4',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    left: 225,
  },
};

export {ClubCard};
