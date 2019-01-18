/** @format */

import {AppRegistry, PermissionsAndroid} from 'react-native'
import SmsListener from 'react-native-android-sms-listener'
import App from './App'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App);

async function requestSMSPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      {
        'title': 'Flyve MDM Dashboard',
        'message': 'Flyve MDM needs access to your hardware and software'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can receive SMS")
      SmsListener.addListener(message => {
        console.info(message)
      })
    } else {
      console.log("Receive SMS permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

requestSMSPermission()
