import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ActionBarImage from './headerbar/Actionbar';
import Home from './Screens/Home';
import Add from './Screens/Add';
import viewitem from './Screens/viewitem';
import notification from './Screens/notification';
import todaymeal from './Screens/todaymeal';
import vegatable from './Screens/navigation/vegatable';
import fruits from './Screens/navigation/fruits';
import juices from './Screens/navigation/juices';
import meat from './Screens/navigation/meat';
import other from './Screens/navigation/other';
import Vegatableview from './Screens/view/Vegatableview';
import useView from './Screens/use/useView';
import newdish from './Screens/use/newdish';
import axios from 'axios';
import urls from './src/api/urls';

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
    // AsyncStorage.clear();
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
function HomeScreen() {
  return (
    <View>
      <Home />
    </View>
  );
}
function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate('Home');
  }, 3000);
  return (
    <View style={styles.logo}>
      <ImageBackground
        source={require('./images/background.jpg')}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 250,
          }}>
          <Image
            style={{
              width: 120,
              height: 120,
            }}
            source={require('./images/fridgeicon.png')}
          />
          <Text style={styles.logotext}>
            <Text style={{ color: '#ff0', fontSize: 35, fontWeight: 'bold' }}>
              MY FRIDGE
            </Text>
            <Text style={{ color: '#3e3f8f' }}> FOOD</Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
const Stack = createStackNavigator();

function App() {
  return (

    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        networkActivityIndicatorVisible={false}>
      </StatusBar>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home"
          component={Home}
          options={{
            title: 'My Smart Fridge',
            headerLeft: () => null,
            headerRight: () => <ActionBarImage />,
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#006aff',
            }
          }}
        />
        <Stack.Screen
          name="vegatable"
          component={vegatable}
          options={{
            title: 'Add Vegatable',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
        <Stack.Screen
          name="useView"
          component={useView}
          options={{
            title: 'Use',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
        <Stack.Screen
          name="fruits"
          component={fruits}
          options={{
            title: 'Add Fruit',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
        <Stack.Screen
          name="juices"
          component={juices}
          options={{
            title: 'Add Juice',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
        <Stack.Screen
          name="meat"
          component={meat}
          options={{
            title: 'Add Meat',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
        <Stack.Screen
          name="other"
          component={other}
          options={{
            title: 'Add Other Items',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            title: 'Add items',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
        <Stack.Screen
          name="Vegatableview"
          component={Vegatableview}
          options={{
            title: 'View Vegetable',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
        <Stack.Screen
          name="viewitem"
          component={viewitem}
          options={{
            title: 'View items',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
        <Stack.Screen
          name="notification"
          component={notification}
          options={{
            title: 'Notifications',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
        <Stack.Screen
          name="todaymeal"
          component={todaymeal}
          options={{
            title: 'Today Meal',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
      <Stack.Screen
          name="newdish"
          component={newdish}
          options={{
            title: 'New Dish',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#7BF85F',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logotext: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default App;
