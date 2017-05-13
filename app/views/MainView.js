import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions
} from 'react-native'
import { Button } from 'react-native-elements'
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view'
import { PersonList } from 'components'
import { MockData } from 'utils'
import baseStyles from '../baseStyles'

const { GiftedForm } = require('react-native-gifted-form')

export default class MainView extends React.Component {
  state = {
    index: (this.props.lastState ? this.props.lastState.lastTabIndex : 0),
    routes: [
      { key: '1', title: 'First', tabIndex: 0 },
      { key: '2', title: 'Second', tabIndex: 1 },
      { key: '3', title: 'Third', tabIndex: 2 }
    ],
    lastTabIndex: 0
  }
  unmounting = false

  onTabChange = (index) => {
    if (!this.unmounting) {
      this.setState({ index })
    }
  }

  componentWillUnmount = () => {
    this.unmounting = true
  }

  renderTabBarTop = (props) => {
    const styleObj = {}
    if (Platform.OS === 'web') {
      styleObj.width = '102%' // fix an UI issue on web
    }
    return <TabBarTop {...props}
                      tabStyle={{ backgroundColor: baseStyles.BRAND_LIGHT, opacity: 1, marginBottom: 2 }}
                      indicatorStyle={{ backgroundColor: baseStyles.BRAND }}
                      pressColor="#fff"
                      labelStyle={{ color: '#596698' }} style={styleObj} />
  }

  onPersonPress = (route, person) => {
    this.setState({ lastTabIndex: route.tabIndex }, () => {
      this.props.nav.linkTo(this, 'personDetails', { person })
    })
  }

  renderTabScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <View style={[ styles.tabView, { backgroundColor: baseStyles.BG, paddingTop: 20 } ]}>
          <Text style={baseStyles.center}>
            Welcome to React Native for {Platform.OS}!
          </Text>
          <Text style={baseStyles.center}>
            To get started, edit App.js
          </Text>
          <Text style={baseStyles.center}>
            Press Cmd+R to reload{'\n'}
            { Platform.OS !== 'web' ? 'Cmd+D or shake for dev menu' : '' }
          </Text>

          <Button
            raised
            backgroundColor={baseStyles.BRAND}
            icon={{ name: 'paper-plane-o', type: 'font-awesome' }}
            title="Go to Contact Us"
            onPress={() => this.props.nav.linkTo(this, 'contactUs')}
            buttonStyle={baseStyles.link}
          />

          <GiftedForm style={styles.myForm}>
            <GiftedForm.TextInputWidget
              name="firstName"
              title="First name"
              placeholder="First name"
              clearButtonMode="while-editing"
            />
            <GiftedForm.TextInputWidget
              name="lastName"
              title="Last name"
              placeholder="Last name"
              clearButtonMode="while-editing"
            />
          </GiftedForm>
        </View>
      case '2':
        return (
          <View style={[ styles.tabView, { backgroundColor: baseStyles.BRAND } ]}>
            <PersonList data={MockData.PersonArray} onItemPress={(person) => this.onPersonPress(route, person)} />
          </View>
        )
      case '3':
        return <View style={[ styles.tabView, { backgroundColor: '#a4caff' } ]} />
      default:
        return null
    }
  }

  render () {
    const initialLayout = {
      height: 0,
      width: Dimensions.get('window').width,
    };
    return (
      <TabViewAnimated
        initialLayout = {initialLayout}
        style={styles.tabContainer}
        navigationState={this.state}
        renderScene={this.renderTabScene}
        renderHeader={this.renderTabBarTop}
        onRequestChangeTab={this.onTabChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1
  },
  tabView: {
    flex: 1,
    alignItems: 'stretch'
  }
})
