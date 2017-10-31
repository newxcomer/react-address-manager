import * as firebase from 'firebase';
import getConfig from './config';

const database = firebase.initializeApp(getConfig()).database();

export default database;
