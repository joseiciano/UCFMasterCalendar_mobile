/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBUTkhZBvUiA9lIM00LbFaMijNMI7Vzk1o',
  authDomain: 'ucf-master-calendar.firebaseapp.com',
  databaseURL: 'https://ucf-master-calendar.firebaseio.com',
  projectId: 'ucf-master-calendar',
  storageBucket: 'ucf-master-calendar.appspot.com',
  messagingSenderId: '641833784596',
  appId: '1:641833784596:web:2b32efb77a94a470be5e01',
  measurementId: 'G-486GH9KB3W',
};

firebase.initializeApp(firebaseConfig);
AppRegistry.registerComponent(appName, () => App);
