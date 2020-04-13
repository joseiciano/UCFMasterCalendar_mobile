import React, {Component} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import {Navbar} from '../components/Navbar';
import {EventCard} from '../components/EventCard';
import {Button} from 'react-native-elements';
import {ClubCard} from '../components/ClubCard';
import * as firebase from 'firebase';

class Lister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: [],
      showLoginModal: false,
      showRegisterModal: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    this.setState({
      items: [
        {id: '1', type: 'navbar'},
        {
          id: '2',
          type: this.props.titleType ? this.props.titleType : '',
          button1: this.props.buttonPress1 ? this.props.buttonPress1 : null,
          button2: this.props.buttonPress2 ? this.props.buttonPress2 : null,
        },
        {id: '3', type: 'searchbar'},
        {id: '4', type: this.props.type},
        {id: '5', type: 'endpadding'},
      ],
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) this.setState({loggedIn: true});
    });
  }

  toggleLogin = () =>
    this.setState({showLoginModal: !this.state.showLoginModal});

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
                    rightText1OnPress={this.toggleLogin}
                    rightText2="Sign up"
                    rightText2OnPress={this.toggleRegister}
                  />
                );
              case 'eventstitle':
                // console.log('ITEM', item);
                return (
                  <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        marginLeft: '8.5%',
                      }}>
                      {this.state.loggedIn && (
                        <View>
                          <Button
                            buttonStyle={styles.addButton}
                            title={'View'}
                            titleStyle={{color: '#03A9F4'}}
                            onPress={item.button1}
                          />
                          <Button
                            buttonStyle={styles.addButton}
                            title={'Create'}
                            titleStyle={{color: '#03A9F4'}}
                            onPress={item.button2}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                );
              case 'clubstitle':
                return (
                  <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        marginLeft: '12.5%',
                      }}>
                      {this.state.loggedIn && (
                        <View>
                          <Button
                            buttonStyle={styles.addButton}
                            title={'View'}
                            titleStyle={{color: '#03A9F4'}}
                            onPress={item.button1}
                          />
                          <Button
                            buttonStyle={styles.addButton}
                            title={'Create'}
                            titleStyle={{color: '#03A9F4'}}
                            onPress={item.button2}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                );
              case 'searchbar':
                return (
                  <TextInput
                    style={styles.searchbar}
                    onChangeText={text => this.setState({text: text})}
                  />
                );
              case 'events':
                // console.log(this.props);
                return this.props.list.map((event, idx) => {
                  return (
                    <EventCard
                      key={idx}
                      event={event}
                      clubs={this.props.clubs}
                    />
                    // <Text>{this.props.clubs[0].name}</Text>
                  );
                });
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
    width: '90%',
  },
};

export {Lister};
