import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import ScrollList from '../components/ScrollList';
// import {Container, Header, Content, Card, CardItem, Button} from 'native-base';
import Navbar from '../components/Navbar';
import {Card, Button} from 'react-native-elements';
import {Item} from 'native-base';

// const DATA = [{id: '1', title: 'dank'}];
const Logo = () => {
  return (
    <View style={{flex: 1, height: '100%', backgroundColor: 'grey'}}>
      <Text>Logo</Text>
    </View>
  );
};

const MainImage = () => {
  return (
    <View style={{backgroundColor: 'teal', height: 500}}>
      <Text>HALLO</Text>
    </View>
  );
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      clubs: [],
    };
  }

  componentDidMount() {
    this.setState({
      events: [
        {id: '1', title: 'Event1'},
        {id: '2', title: 'Event2'},
        {id: '3', title: 'Event3'},
      ],
      clubs: [
        {id: '1', title: 'Club1'},
        {id: '2', title: 'Club2'},
        {id: '3', title: 'Club3'},
      ],
    });
  }

  render() {
    const {history} = this.props;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 0.8}}>
          <Navbar
            leftText="Knightro"
            rightText1="Log in"
            rightText2="Register"
          />
          <MainImage />
          <ScrollList
            items={this.state.events}
            buttonTitle={'Show all events'}
            buttonStyle={{marginTop: '3%'}}
            buttonOnPress={() => history.push('/Events')}
          />
          <ScrollList
            items={this.state.clubs}
            buttonTitle={'Show all clubs'}
            buttonStyle={{marginTop: '3%'}}
            buttonOnPress={() => history.push('/Clubs')}
          />
          <View style={{marginTop: 30}} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'grey',
    height: '3.5%',
    flexDirection: 'row',
  },
  nameBtn: {
    color: 'red',
    backgroundColor: 'grey',
    width: '20%',
  },
  login: {
    color: 'red',
    backgroundColor: 'teal',
    marginLeft: '40%',
    width: '15%',
  },
  register: {
    color: 'blue',
    backgroundColor: 'red',
    marginLeft: '5%',
    width: '15%',
  },
});
