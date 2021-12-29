import React, { useEffect, useState } from 'react';
import {
  StyleSheet, TouchableOpacity, View,
  Text, ImageBackground, TextInput,
  FlatList, Alert, Modal
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import FRIDGE_ACTIONS from '../api/actions';
import urls from '../api/urls';
import CustomHeader from '../components/custom-header';
const viewitem = ({ navigation }) => {
  var [foodItemList, setFoodItemList] = useState([]);
  var [serachVegetable, setserachVegetable] = useState([]);
  var [satusView, setSatusView] = useState('');
  var [search, setsearch] = useState('');
  var [modalVisible, setmodalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const onPressCategory = async (category_id = 1) => {
    if (selectedCategory === category_id) {
      setSelectedCategory(0);
      return;
    }
    try {
      const res = await FRIDGE_ACTIONS.getData(`${urls.get_items_by_cat_id}${category_id}`);
      console.log('res:', res);
      setSelectedCategory(category_id);
      setFoodItemList(res?.data);
    } catch (error) {
      alert(error);
      setSelectedCategory(0);
    }
  }
  const renderItem = ({ item }) => {
    console.log(item);
    return (
      // <TouchableOpacity onPress={() => navigation.navigate('useView', item)}>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          width: 120,
          margin: 20,
          alignItems: 'center',
          paddingVertical:7,
          borderRadius:10,
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {item?.item_name}
        </Text>
        {/* </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };
  const valueSeacrch = () => {
    let d = 0;

    foodItemList.map(e => {
      if (e.foodname === search) {
        setserachVegetable(e);

        setmodalVisible(true);
        d = 1;
      }
    });

    if (d === 0) {
      Alert.alert('Not Found Alert', search + ' is not found', [
        {
          text: 'OK',
          onPress: () => console.log('Install Pressed'),
        },
      ]);
    }
  };
  const ViewItems = () => (<View>
    <FlatList
      contentContainerStyle={{alignItems:'center'}}
      data={foodItemList}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
    />
  </View>)
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} title={'View'} />
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={require('../images/mff.jpg')}>
        <ScrollView>
          <View style={{ paddingHorizontal: 22, flex: 1 }}>
            <View style={styles.searchbar}>
              <TextInput
                placeholder="SEARCH ITEM HERE"
                style={{ width: '40%' }}
                onChangeText={e => setsearch(e)}
              />
              <Icon
                name="search"
                color={'black'}
                size={22}
                onPress={() => valueSeacrch()}
                style={{ marginRight: 12 }}
              />
            </View>
            <View style={{ marginTop: 50 }}>
              <TouchableOpacity onPress={() => onPressCategory(1)}>
                <Text style={styles.text1}>VEGATABLES</Text>
              </TouchableOpacity>
              {selectedCategory === 1 && (
                <ViewItems />
              )}
              <TouchableOpacity onPress={() => onPressCategory(2)}>
                <Text style={styles.text1}>FRUITS</Text>
              </TouchableOpacity>
              {selectedCategory === 2 && (
                <ViewItems />
              )}
              <TouchableOpacity onPress={() => onPressCategory(3)}>
                <Text style={styles.text1}>JUICES</Text>
              </TouchableOpacity>
              {selectedCategory === 3 && (
                <ViewItems />
              )}
              <TouchableOpacity onPress={() => onPressCategory(4)}>
                <Text style={styles.text1}>MEAT</Text>
              </TouchableOpacity>
              {selectedCategory === 4 && (
                <ViewItems />
              )}
              <TouchableOpacity onPress={() => onPressCategory(5)}>
                <Text style={styles.text1}>OTHERS</Text>
              </TouchableOpacity>
              {selectedCategory === 5 && (
                <ViewItems />
              )}
            </View>
          </View>
        </ScrollView>
        <Modal animationType="slide" visible={modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('useView', serachVegetable)}>
              <View
                style={{
                  backgroundColor: 'blue',
                  width: 100,
                  height: 30,
                  margin: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {serachVegetable?.foodname}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  searchbar: {
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {
    fontWeight: '600',
    marginTop: 20,
    fontSize: 20,
    borderWidth: 2,
    padding: 12,
    textAlign: 'center',
    borderRadius: 12,
    backgroundColor: '#DB2AB0',
    color: '#fff',
  }
});

export default viewitem;
