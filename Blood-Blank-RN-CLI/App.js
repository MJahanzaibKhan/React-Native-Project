


import React, {Component} from 'react';
import { View, Text,Alert,PermissionsAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage'
import { Root } from 'native-base'
//Components
import Navigation from './navigation/navigation'

export default class App extends Component {


  //1
async checkPermission() {
  console.log('aijaz')
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
   console.log('<<<token>>>',fcmToken)
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          console.log('token>>>',fcmToken)
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}




async componentDidMount() {
  this.checkPermission();
  this.createNotificationListeners(); //add this line
}

////////////////////// Add these methods //////////////////////
  
  //Remove listeners allocated in createNotificationListeners()
componentWillUnmount() {
  this.notificationListener();
  this.notificationOpenedListener();
}

async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title , body);
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }
  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message));
  });
}

showAlert(title, body) {
  Alert.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}

  render() {
    
    return (
      <View style={{flex: 1}}>
        <Root>

        <Navigation/>
        </Root>
      </View>
    );
  }
}

/*
Oppo token
 eLsouC5p9zA:APA91bEhRa6yyWWIlrt_tfi0gra3iI2QBum7bfAF0GNBEiJuHJA3kOI1n8AP4DYNU66gGX9T1-ynplLdWoVapmufMeVqu-pzFfi1P8uRzLg2VmJv2qkaWOqYE6LfLo1AnrSKCg3d54kz
one m9 token
eco0UoUIa7s:APA91bEJtJi861T_aehbbJKcnoni4QQHAnRqiaiPqcg6IFU3iM63cvH2TekBpADALLi3yOf3eVO-WmNE9yocOwv1nrDk9l9GY2qHhJVbgde1HAd1H1RdymcNvOiavdNkktEu3gz-OpO8
 fetch('http://172.20.10.2:3001/posts/addPost', {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${this.props.user.token}`
            },
            body:JSON.stringify({name,units,country,hospital,city,state,detail,urgency,relation,userId})
        })
        .then((res)=>res.json())
        .then((data)=>console.log(data,"data"))
        .catch((e)=>{
            cons
*/