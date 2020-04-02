import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {Navbar} from '../components/Navbar';
import {EventCard} from '../components/EventCard';
import {ClubCard} from '../components/ClubCard';

class Lister extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    const {title, type, list} = this.props;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 0.8}}>
          <Navbar
            leftText="Knightro"
            rightText1="Log in"
            rightText1OnPress={() => console.log('Log in')}
            rightText2="Sign up"
            rightText2OnPress={() => console.log('Sign up')}
          />

          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <TextInput
            style={{
              borderColor: 'black',
              borderWidth: 1,
              width: '92%',
              marginLeft: '4%',
              borderRadius: 10,
              backgroundColor: 'white',
            }}
            onChangeText={text => {
              this.setState({text: text});
            }}
          />

          {type.toLowerCase() === 'events' &&
            list.map(event => <EventCard key={event.id} event={event} />)}
          {type.toLowerCase() === 'clubs' &&
            list.map(club => <ClubCard key={club.id} club={club} />)}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  titleWrapper: {
    flexDirection: 'row',
    marginLeft: '3.5%',
    marginTop: '5%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
  },
};

export {Lister};
