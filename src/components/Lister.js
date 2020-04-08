import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, FlatList} from 'react-native';
import {Navbar} from '../components/Navbar';
import {EventPageCard, EventCard} from '../components/EventCard';
import {ClubCard} from '../components/ClubCard';

class Lister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: [],
    };
  }

  componentDidMount() {
    this.setState({
      items: [
        {id: '1', type: 'navbar'},
        {id: '2', type: 'title'},
        {id: '3', type: 'searchbar'},
        {id: '4', type: this.props.title},
        {id: '5', type: 'endpadding'},
      ],
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{flex: 0.8}}
          data={this.state.items}
          renderItem={({item}) => {
            switch (item.type.toLowerCase()) {
              case 'navbar':
                return (
                  <Navbar
                    leftText="Knightro"
                    rightText1="Log in"
                    rightText1OnPress={() => console.log('Log in')}
                    rightText2="Sign up"
                    rightText2OnPress={() => console.log('Sign up')}
                  />
                );
              case 'title':
                return (
                  <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.title}</Text>
                  </View>
                );
              case 'searchbar':
                return (
                  <TextInput
                    style={styles.searchbar}
                    onChangeText={text => {
                      this.setState({text: text});
                    }}
                  />
                );
              case 'events':
                console.log('In events');
                return this.props.list.map(event => (
                  <EventCard key={event.id} event={event} />
                ));
              case 'clubs':
                return this.props.list.map(club => (
                  <ClubCard key={club.id} club={club} />
                ));
              case 'eventspage':
                console.log('in eventspage');
                return this.props.list.map(event => (
                  <EventPageCard key={event.id} />
                ));
              case 'endpadding':
                return <View style={{marginTop: 30}} />;
            }
          }}
          keyExtractor={item => item.id}
        />
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
  searchbar: {
    borderColor: 'black',
    borderWidth: 1,
    width: '92%',
    marginLeft: '4%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
};

export {Lister};
