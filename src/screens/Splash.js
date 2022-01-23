import React from 'react';
import {View,Text, StyleSheet, ImageBackground, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


const SplashScreen=({ navigation })=> {
      const getData=async()=>{
        const user = await AsyncStorage.getItem('@user');
        if(user){
          setTimeout(() => {
            navigation.replace('Home');
          }, 3000);
        }else{
          setTimeout(() => {
            navigation.replace('Signin');
          }, 3000);
        }
      }
  React.useEffect(()=>{
    getData();
  },[])
        
       
        return (
          <View style={styles.logo}>
            <ImageBackground
              source={require('../images/background.jpg')}
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
                  source={require('../images/fridgeicon.png')}
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

export default SplashScreen;
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
