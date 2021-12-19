import React, { Component, useState } from 'react';
import {View, Text, StyleSheet,TextInput, TouchableOpacity, ImageBackground} from 'react-native';

const useView = props => {
  var [usequantity, setusequantity] = useState('');
  const usefuc = () => {
    var value = parseInt(usequantity);
    var original = parseInt(props?.route?.params?.qty);
    if (value > original) {
      alert('please inser valid value');
    } else {
      original = original - value;
      console.log(props?.route?.params?.foodname);
      fetch('http://192.168.43.137/addfood/api/addfood/usedItem',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            foodname: props?.route?.params?.foodname,
            qty: original,
            expdate: props?.route?.params?.expDate,
            weight: 'kg',
          }),
        })
        .then(r => r.json())
        .then(e => {
          console.log(e);
        })
        .catch(E => {
          console.log(E);
        });
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../images/1.jpg')}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{
              color: 'black', fontSize: 17,
              fontWeight: 'bold', marginTop: 250
            }}>
              Food Name
            </Text>
            <Text
              style={{
                color: 'green',
                fontSize: 17,
                fontWeight: 'bold',
                marginLeft: 12,
                marginTop: 250
              }}>
              {props?.route?.params?.foodname}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>
              weight
            </Text>
            <Text
              style={{
                color: 'green',
                fontSize: 17,
                fontWeight: 'bold',
                marginLeft: 12,
              }}>
              {props?.route?.params?.qty}
              {props?.route?.params?.weight}
            </Text>
            <Text
             style={{
              color: 'blue',
              fontSize: 17,
              fontWeight: 'bold',
              marginLeft: 12,
            }}>Kg</Text>
          </View>
          <View>
            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>
              Use Quantity
            </Text>
            <TextInput
              placeholder="Use quantity"
              onChangeText={e => setusequantity(e)}
              style={{ borderWidth: 1, marginTop: 10,borderRadius:14,padding:10,height:60 }} />
          </View>
          <TouchableOpacity onPress={() => usefuc()}>
            <View
              style={{
                backgroundColor: 'skyblue',
                width: 150,
                height: 50,
                margin: 20,
                borderRadius:14,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontWeight: 'bold'}}>Use</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',

  }
});
export default useView;
