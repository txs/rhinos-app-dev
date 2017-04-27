/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native'
import  App  from './app/views/App'
// import minimongo from 'minimongo-cache';
// var ReactDOM = require('react-dom');
// // import ReactWithAddons from 'react/addons';
// // var addons = require('react-addons');
// process.nextTick = setImmediate;
//
// const db = new minimongo();
// db.debug = false;
// db.batchedUpdates = ReactDOM.unstable_batchedUpdates;

AppRegistry.registerComponent('rhinosapp', () => App)

AppRegistry.runApplication('rhinosapp', {
  rootTag: document.getElementById('react-root')
})
