import React, {  useState } from 'react';
import {
  StyleSheet, View,
  Text, ImageBackground, TextInput
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FRIDGE_ACTIONS from '../api/actions';
import urls from '../api/urls';
import CustomHeader from '../components/custom-header';
import PrimaryButton from '../components/primary-button';
import colors from './colors';
import moment from 'moment';

const viewitem = ({ navigation }) => {

  var [foodItemList, setFoodItemList] = useState([]);
  var [searchList, setSearchList] = useState([]);
  var [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const onPressCategory = async (category_id = 1) => {
    if (selectedCategory === category_id) {
      setSelectedCategory(0);
      return;
    }
    try {
      const res = await FRIDGE_ACTIONS.getData(`${urls.get_items_by_cat_id}${category_id}&qty=0`);
      setSelectedCategory(category_id);
      setFoodItemList(res?.data);
    } catch (error) {
      alert(error);
      setSelectedCategory(0);
    }
  }

  const valueSeacrch = async () => {
    try {
      // const res=await FRIDGE_ACTIONS.getData(urls.search_item+searchText);
      const res = await FRIDGE_ACTIONS.getData(`${urls.search_item}${searchText}`);
      console.log('res of search : ', res?.data);
      setSearchList(res?.data);

    } catch (error) {
      console.log('err:', error);
      alert('Item Not Found');
    }
  };

  const ViewItems = () => (<View>
    {
      foodItemList.map((ele) => {
        return (
          <View style={styles.item}>
            <Text numberOfLines={1} style={{ width: '40%', }}>{ele.item_name}</Text>
            <Text >{ele.qty} {ele.unit}</Text>
            {ele.expiry_date && <Text>{moment(ele.expiry_date).format('ll')}</Text>}
          </View>
        )
      })
    }
  </View>)
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} title={'View'} />
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={require('../images/mff.jpg')}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ paddingHorizontal: 22, flex: 1 }}>
            <View style={styles.searchbar}>
              <TextInput
                placeholder="SEARCH ITEM HERE"
                style={{ width: '90%' }}
                onChangeText={(t) => {
                  if (!t) {
                    setSearchList([]);
                  }
                  setSearchText(t)
                }}
              />
              <AntDesign name="search1" color={'black'} size={22} onPress={valueSeacrch}
              />
            </View>
            {searchList.length > 0 && <View style={{}}>
              <ScrollView>
                {
                  searchList.map((ele, index) => {
                    return (
                      <View style={styles.item}>
                        <Text>{ele.item_name}</Text>
                        <Text>{ele.qty} {ele.unit}</Text>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>}
            <View style={{ marginTop: 5 }}>
              <PrimaryButton expand={selectedCategory === 1} icon title={'VEGATABLES'} onPress={() => onPressCategory(1)} />
              {selectedCategory === 1 && (
                <ViewItems />
              )}
              <PrimaryButton expand={selectedCategory === 2} icon title={'FRUITS'} onPress={() => onPressCategory(2)} />
              {selectedCategory === 2 && (
                <ViewItems />
              )}
              <PrimaryButton expand={selectedCategory === 3} icon title={'JUICES'} onPress={() => onPressCategory(3)} />

              {selectedCategory === 3 && (
                <ViewItems />
              )}
              <PrimaryButton expand={selectedCategory === 4} icon title={'MEAT'} onPress={() => onPressCategory(4)} />

              {selectedCategory === 4 && (
                <ViewItems />
              )}
              <PrimaryButton expand={selectedCategory === 5} icon title={'OTHERS'} onPress={() => onPressCategory(5)} />

              {selectedCategory === 5 && (
                <ViewItems />
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  searchbar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.black,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 10
  },
});

export default viewitem;
