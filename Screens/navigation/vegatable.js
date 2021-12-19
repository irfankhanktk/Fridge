import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Vegatable = ({ navigation }) => {
  var foodItemList = [
    { fID: '1', foodName: 'Cabbage', expDate: '12/2/2021' },
    { fID: '2', foodName: 'Palak Sabzi', expDate: '12/11/2021' },
    { fID: '8', foodName: 'Tamoto', expDate: '12/21/2021' },
    { fID: '4', foodName: 'Cacumber', expDate: '11/27/2021' },
    { fID: '5', foodName: 'peas', expDate: '12/01/2021' },
    { fID: '6', foodName: 'Lady Finger', expDate: '12/10/2021' },
    { fID: '7', foodName: 'Bringel', expDate: '11/21/2021' },
    { fID: '9', foodName: 'Patato', expDate: '12/30/2021' },
    { fID: '10', foodName: 'Carrot', expDate: '1/05/2022' },
  ];

  const [selectFood, setSelectedFood] = useState('');
  const [selectFoodName, setSelectedFoodName] = useState('');

  const [SelectQty, setSelectedQTY] = useState('');
  const Toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'FOOD ADDED',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      20,
      150,
    );
    console.log(selectFood, SelectQty);
    foodItemList.map(e => {
      if (selectFood === e.fID) {
        fetch('http:// 192.168.175.2/addfood/api/addfood/addItemInFridge', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            foodname: e.foodName,
            qty: SelectQty,
            expdate: e.expDate,
            weight: SelectQty > 100 ? 'g' : 'kg',
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
    });
  };
  return (
    <View style={{ backgroundColor: '#E0EED6', height: '100%' }}>
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={require('../../Assets/vegetable.jpg')}>
        <View style={{ flexDirection: 'row', marginTop: 25 }}>
          <Text
            style={{
              fontWeight: 'bold', color: '#B2A7F0',
              paddingTop: 25, fontSize: 28,
            }}>
            {' '}
            Food
          </Text>
          <View
            style={{
              borderBottomWidth: 2, width: 225,
              height: 50, marginTop: 12, marginLeft: 65,
            }}>
            <Picker
              selectedValue={selectFood}
              style={{ width: 238, backgroundColor: '#fff' }}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedFood(itemValue), console.log(itemValue);
              }}>
              <Picker.Item label="Select" value="" />
              {foodItemList.map(e => (
                <Picker.Item key={e.fID} label={e.foodName} value={e.fID} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 14 }}>
          <Text
            style={{
              fontWeight: 'bold', color: '#B2A7F0',
              paddingTop: 25, fontSize: 28,
            }}>
            {' '}
            Weight
          </Text>
          <View
            style={{
              borderBottomWidth: 2, width: 238, height: 50,
              marginTop: 12, marginLeft: 38
            }}>
            <TextInput
              placeholder="weight"
              style={{ backgroundColor: '#fff', padding: 14 }} />
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold', fontSize: 28,
                marginTop: 17, marginLeft: 5, color: '#B2A7F0'
              }}>
              Kg
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 14 }}>
          <TouchableOpacity onPress={Toast} style={styles.button}>
            <Text style={styles.text}>ADD</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 55,
    backgroundColor: '#3e3f8f',
    padding: 5,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 60,
    borderWidth: 2,
  },
  text: {
    fontWeight: '700',
    fontSize: 25,
    color: '#ff0',
    padding: 4,
  },
});
export default Vegatable;
