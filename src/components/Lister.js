import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, FlatList} from 'react-native';
import {Navbar} from '../components/Navbar';
import {EventCard} from '../components/EventCard';
import {Button} from 'react-native-elements';
import {ClubCard} from '../components/ClubCard';

class Lister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: [],
      showLoginModal: false,
      showRegisterModal: false,
    };
  }

  componentDidMount() {
    this.setState({
      items: [
        {id: '1', type: 'navbar'},
        {
          id: '2',
          type: 'title',
          button: this.props.buttonPress ? this.props.buttonPress : null,
        },
        {id: '3', type: 'searchbar'},
        {id: '4', type: this.props.type},
        {id: '5', type: 'endpadding'},
      ],
    });
  }

  toggleLogin = () => {
    this.setState({showLoginModal: !this.state.showLoginModal}, () => {
      console.log('state', this.state.showLoginModal);
    });
  };

  toggleRegister = () =>
    this.setState({showRegisterModal: !this.state.showRegisterModal});

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
                    rightText1OnPress={() => {
                      console.log('we in');
                      this.toggleLogin();
                    }}
                    rightText2="Sign up"
                    rightText2OnPress={this.toggleRegister}
                  />
                );
              case 'title':
                return (
                  <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    {item.button && (
                      <Button
                        buttonStyle={styles.addButton}
                        title={'Create'}
                        titleStyle={{color: '#03A9F4'}}
                        onPress={item.button}
                      />
                    )}
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
                return this.props.list.map((event, idx) => (
                  <EventCard key={idx} event={event} />
                ));
              case 'clubs':
                return this.props.list.map((club, idx) => (
                  <ClubCard key={idx} club={club} />
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
    bottom: '2%',
  },
  searchbar: {
    borderColor: 'black',
    borderWidth: 1,
    width: '92%',
    marginLeft: '4%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  addButton: {
    borderColor: '#03A9F4',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: '47%',
    width: '40%',
  },
};

export {Lister};
