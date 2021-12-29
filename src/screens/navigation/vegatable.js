import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FRIDGE_ACTIONS from '../../api/actions';
import urls from '../../api/urls';
import CustomHeader from '../../components/custom-header';

const Vegatable = ({ navigation,route }) => {
  const {category_id=1,title}=route.params;
  const [items, setItems] = React.useState([]);

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
  const [selectItemId, setSelectedItemId] = useState(0);
  const [selectFoodName, setSelectedFoodName] = useState('');
  const [weight, setWeight] = useState();
  const toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'FOOD ADDED',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      20,
      150,
    );
   
  };
  React.useEffect(() => {
    (async () => {
      try {
        if(category_id){
          const res = await FRIDGE_ACTIONS.getData(`${urls.get_items_by_cat_id}${category_id}`);
          //  console.log(res?.data);
          setItems(res?.data);
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, [category_id]);
  const onAdd=async()=>{
     try {

       const res=await FRIDGE_ACTIONS.getData(`${urls.update_item}?item_id=${selectItemId}&qty=${weight}`,);
       console.log('res:',res);
       toast();
     } catch (error) {
       console.log(error)
     }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#E0EED6', }}>
      <CustomHeader title={`Add ${title}`} navigation={navigation}/>
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={require('../../assets/vegetable.jpg')}>
        <View style={{ ...styles.body }}>
          <View style={styles.row}>
            <Text style={styles.heading}>
              Food
            </Text>
            <View
              style={{...styles.picker_container,borderRadius:20,backgroundColor: '#fff',overflow:'hidden'}}>
              <Picker
                selectedValue={selectItemId}
                style={{ borderRadius:20, }}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedItemId(itemValue);
                }}>
                <Picker.Item label="Select" value="select" />
                {items.map(e => (
                  <Picker.Item key={e?.id} label={e?.item_name} value={e?.id} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{...styles.row,}}>
            <Text
              style={styles.heading}>
              Weight
            </Text>
            <View
              style={{...styles.picker_container,...styles.row,marginTop:0,borderRadius:20,justifyContent:'space-between',paddingHorizontal:10, backgroundColor: '#fff',}}>
              <TextInput
                onChangeText={setWeight}
                placeholder="weight"
                style={{ padding: 14,width:'80%', }} />
                 <Text
                style={{
                  fontWeight: 'bold', fontSize: 28,
                   marginLeft: 5, color: '#B2A7F0'
                }}>
                Kg
              </Text>
            </View>
            <View>
             
            </View>
          </View>
          <View style={{ marginTop: 14 }}>
            <TouchableOpacity disabled={selectItemId==0||!weight} onPress={onAdd} style={{...styles.button,backgroundColor:(selectItemId==0||!weight)?'#9d9d9d':'#3e3f8f'}}>
              <Text style={styles.text}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 22,
  },
  button: {
    backgroundColor: '#3e3f8f',
    padding: 8,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
  },
  row:{ flexDirection: 'row',marginTop:30,alignItems:'center' },
  text: {
    fontWeight: '700',
    fontSize: 25,
    color: '#ff0',
    padding: 4,
  },
  heading: {
    fontWeight: 'bold', color: '#B2A7F0',
    fontSize: 28,
    width:'30%',
  },
  picker_container: {
    // borderBottomWidth: 2,
    width:'70%'
  }
});
export default Vegatable;
