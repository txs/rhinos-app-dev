/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Easing, Text, Dimensions } from 'react-native'
import { SideMenu } from 'react-native-elements'
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/FontAwesome'

import { SimpleNavigator, PersonDetails } from 'components'
import AppMenu from './AppMenu'
import MainView from './MainView'
import ContactUs from './ContactUs'
import AboutUs from './AboutUs'
import baseStyles from '../baseStyles'
import AppInit from 'utils/init' // Webpack alias for Web mode: 'init.web.js'
import Meteor, { createContainer } from 'react-native-meteor';
import Measure from 'react-measure';

// console.log(ReactDOM);


const SERVER_URL = 'ws://localhost:2000/websocket';


class App extends Component {


  componentWillMount() {
    Meteor.connect(SERVER_URL);
  }

  handleAddItem() {
  //  console.log('TODO: Handle Add Item');
    const name = Math.floor(Math.random() * 10); // just generate some random number
    Meteor.call('Items.addOne', { name }, (err, res) => {
      // Do whatever you want with the response
      console.log('Items.addOne', err, res);
    });
    // console.log(Meteor.collection('items').findOne()
    // );

  }

  state = {
    toggled: false
  }

  toggleSideMenu = (showFlag) => {
    this.setState({
      toggled: (typeof showFlag !== 'undefined' ? showFlag : !this.state.toggled)
    })
  }

  appMenuItemClick = (menuItem) => {
    this.toggleSideMenu(false)
    this.refs.nav.linkTo(this, menuItem.link)
  }
  _onLayout = (event) => {
    let {width, height} = Dimensions.get('window')
    // console.log(height);

  //  console.log('------------------------------------------------' + JSON.stringify(event.nativeEvent.layout));
   //
   this.setState({
     layout:{
       height:height,
       width:width,
     }
    })
   }

  render () {
    // let {width, height} = Dimensions.get('window')
    // console.log(width);

    const leftButtonConfig = (
      <TouchableOpacity onPress={() => this.toggleSideMenu()} style={{ margin: 5 }}>
        <Icon name="bars" size={30} color={baseStyles.BRAND} />
      </TouchableOpacity>
    )
    const titleConfig = { title: 'Rhinos-app' }
    const cStylesview = StyleSheet.flatten([styles.view, this.state.layout]);

    return (
      // <View onLayout={this._onLayout}>
      <Measure
        onMeasure={(dimensions) => {
          // this._onLayout(dimensions)
          // Dimensions.get('window')
          this.setState({
            layout:{
              width:dimensions.width,
              height:dimensions.height,
            }
           })

          // console.log(dimensions);

          // this.setState({dimensions})
        }}
      >
        {/*// <View onLayout={this._onLayout}>*/}
        {/*<View>*/}
        <SideMenu MenuComponent={<AppMenu onItemPress={this.appMenuItemClick} style={{ backgroundColor: baseStyles.BRAND_DARK, width: "100%" }} />}
                  toggled={this.state.toggled} >
          <View style={cStylesview} >
            <NavigationBar style={{ backgroundColor: baseStyles.BRAND_LIGHT }} title={titleConfig} leftButton={leftButtonConfig} />

            <View style={styles.container}>
              <Text style={styles.welcome}>
                Welcome to React Native + Meteor!
              </Text>
              <Text style={styles.instructions}>
                Item Count: {this.props.count}
              </Text>

              <TouchableOpacity style={styles.button} onPress={this.handleAddItem}>
                <Text>Add Item</Text>
              </TouchableOpacity>
            </View>

            <SimpleNavigator style={cStylesview}  ref="nav"
                             views={{
                               initialView: MainView,
                               contactUs: ContactUs,
                               aboutUs: AboutUs,
                               personDetails: {
                                 component: PersonDetails, fx: { prop: 'top', fromValue: 500, toValue: 0, duration: 200, easing: Easing.ease }
                               }
                             }}
            />
          </View>
        </SideMenu>
        {/*// </View>*/}
      </Measure>
    )
  }
}

export default createContainer(() => {
  const itemss = Meteor.subscribe('items');
  // console.log(Meteor.collection('items').findOne());

  return {
    count: Meteor.collection('items').find().length,
  };
}, App);

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  view: {
    flex: 1,
    backgroundColor: '#fff'
  },
  button: {
    padding: 10,
    backgroundColor: '#c5c5c5',
  },
  welcome: {
   fontSize: 20,
   textAlign: 'center',
   margin: 10,
 },
 instructions: {
   textAlign: 'center',
   color: '#333333',
   marginBottom: 5,
 },
})
