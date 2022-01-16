import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import React from 'react';
import { StatusBar } from 'react-native';
import PushNotification from 'react-native-push-notification';
import urls from './src/api/urls';
import Add from './src/screens/Add';
import Home from './src/screens/Home';
import AddItem from './src/screens/navigation/add-item';
import notification from './src/screens/notification';
import SplashScreen from './src/screens/Splash';
import todaymeal from './src/screens/todaymeal';
import newdish from './src/screens/use/newdish';
import useView from './src/screens/use/useView';
import Vegatableview from './src/screens/view/Vegatableview';
import viewitem from './src/screens/viewitem';

//Axios Configuration
client = axios.create({
  baseURL: urls.base_url,
});

//Axios Interceptors
client.interceptors.request.use(
  async config => {

    config.headers = {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data, application/json',
    };
    config.params = config.params || {};

    return config;
  },
  error => {
    console.log('I am here');
    Promise.reject(error);
  },
);

client.interceptors.response.use(
  response => {
    console.log('RESPONSE INTERCPTOR : ', response?.status);
    return response;
  },
  async function (error) {
    console.log('INTERCEPTOR ERROR RESPONSE : ', error?.response?.status);
    console.log('INTERCEPTOR ERROR RESPONSE CONFIG: ', error?.config);

    console.log('I am here');
    return Promise.reject(error);
  },
);
const Stack = createStackNavigator();
function App() {
  const manageNotification=()=>{
    console.log('heloo');
    // PushNotification.localNotification({
    //     channelId: "channel-id", 
    //     title:'title',
    //     message:'i am message',
    // });
    // PushNotification.localNotificationSchedule({
    //     channelId: "channel-id", 
    //     title:'title is here',
    //     message:'i am message after 20 sec',
    //     date:new Date(Date.now()+20*1000),
    //     allowWhileIdle:true,
    // });
}
  const createChannel=()=>{
    PushNotification.createChannel(
        {
          channelId: "channel-id", // (required)
          channelName: "Khan channel", // (required)
        //   channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        //   playSound: false, // (optional) default: true
        //   soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        //   importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
}

  React.useEffect(()=>{
    createChannel();
    manageNotification();
  },[])
  return (

    <NavigationContainer>

      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        networkActivityIndicatorVisible={false}>
      </StatusBar>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}options={{ headerShown: false }}
        />
        <Stack.Screen name="Home"component={Home}
        />
        <Stack.Screen
          name="addItem"component={AddItem}
        />
        <Stack.Screen
          name="useView"component={useView}
        />
        <Stack.Screen
          name="Add" component={Add}
        />
        <Stack.Screen
          name="Vegatableview"component={Vegatableview}
        />
        <Stack.Screen
          name="viewitem"component={viewitem}
        />
        <Stack.Screen
          name="notification"component={notification}
        />
        <Stack.Screen
          name="todaymeal"component={todaymeal}
        />
        <Stack.Screen
          name="newdish"component={newdish}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
