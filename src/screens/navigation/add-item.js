import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FRIDGE_ACTIONS from '../../api/actions';
import urls from '../../api/urls';
import { fruit, juice, meat, other, vegetable } from '../../assets';
import CustomHeader from '../../components/custom-header';
import DateTimePicker from '../../components/date-picker';
import Icon from 'react-native-vector-icons/AntDesign'
import colors from '../colors';

const AddItem = ({ navigation, route }) => {
  const { category_id = 1, title } = route.params;
  const [items, setItems] = React.useState([]);
  const [unit, setUnit] = React.useState('');
  const [selectItemId, setSelectedItemId] = useState(0);
  const [weight, setWeight] = useState();
  const [expiryDate, setExpiryDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false)



  const hideDatePicker = (date) => {
    setExpiryDate(moment(date).format('YYYY-MM-DD'));
    setDatePickerVisibility(false);
  }

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
        if (category_id) {
          const res = await FRIDGE_ACTIONS.getData(`${urls.get_items_by_cat_id}${category_id}`);
          //  console.log(res?.data);
          setItems(res?.data);
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, [category_id]);
  const onAdd = async () => {
    try {

      const res = await FRIDGE_ACTIONS.getData(`${urls.update_item}?item_id=${selectItemId}&qty=${weight}&expiry=${expiryDate}`,);
      console.log('res:', res);
      toast();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#E0EED6', }}>
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={category_id === 1 ? vegetable : category_id === 2 ? fruit : category_id === 3 ? juice : category_id === 4 ? meat : other}>
        <CustomHeader title={`Add ${title}`} navigation={navigation} />
        <View style={{ ...styles.body }}>
          <View style={styles.row}>
            <Text style={styles.heading}>
              Food
            </Text>
            <View
              style={{ ...styles.picker_container, borderRadius: 20, backgroundColor: colors.white, }}>
              <Picker
                selectedValue={selectItemId}
                style={{ borderRadius: 20, }}
                onValueChange={(itemValue, index) => {
                  setSelectedItemId(itemValue);
                  setUnit(items[index]?.unit);
                }}>
                {console.log('items:', items)}
                <Picker.Item label="Select" value="select" />
                {items.map(e => (
                  <Picker.Item key={e?.id} label={e?.item_name} value={e?.id} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{ ...styles.row, }}>
            <Text
              style={styles.heading}>
              Weight
            </Text>
            <View
              style={{ ...styles.picker_container, ...styles.row, marginTop: 0, borderRadius: 20, justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: colors.white, }}>
              <TextInput
                onChangeText={setWeight}
                placeholder="weight"
                style={{ padding: 14, width: '80%', }} />
              <Text
                style={{
                  fontWeight: 'bold', fontSize: 15,
                  marginLeft: 5, color: colors.primary
                }}>
                {unit}
              </Text>
            </View>
            <View>

            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25 }}>
            <Text
              style={{ ...styles.heading, width: '49%' }}>
              Expiry Date
            </Text>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}
              style={{
                flexDirection: 'row', justifyContent: 'space-between',
                backgroundColor: colors.white, paddingHorizontal: 10,
                alignSelf: 'flex-end', paddingVertical: 8, borderRadius: 10, width: '49%'
              }}>
              <Text>{expiryDate || 'Date'}</Text>
              <Icon name='calendar' size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 14 }}>
            <TouchableOpacity disabled={selectItemId == 0 || !weight} onPress={onAdd}
              style={{
                ...styles.button,
                backgroundColor: (selectItemId == 0 || !weight) ? colors.secondary : colors.primary
              }}>
              <Text style={{ ...styles.text }}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        onCancel={() => setDatePickerVisibility(false)}
        mode="date"
        maximumDate={new Date()}
        isDarkModeEnabled={false}
        onConfirm={hideDatePicker}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 22,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center'
  },
  text: {
    fontWeight: '700',
    fontSize: 25,
    color: colors.black,
    padding: 4,
  },
  heading: {
    fontWeight: 'bold', color: colors.white,
    fontSize: 28,
    width: '30%',
  },
  picker_container: {
    // borderBottomWidth: 2,
    width: '70%'
  }
});
export default AddItem;
