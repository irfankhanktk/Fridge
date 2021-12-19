import React, {useEffect, useState} from 'react';
import {
  StyleSheet,TouchableOpacity,View,
  Text,ImageBackground,TextInput,
  FlatList,Alert,Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const viewitem = ({navigation}) => {
  var [foodItemList, setFoodItemList] = useState([]);
  var [serachVegetable, setserachVegetable] = useState([]);

  var [satusView, setSatusView] = useState('');
  var [search, setsearch] = useState('');
  var [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getdata();
    });
    return unsubscribe;
  }, [navigation]);
  const getdata = async () => {
    await fetch('http://192.168.43.137/addfood/api/addfood/fridgeItem')
      .then(r => r.json())
      .then(e => {
        setFoodItemList(e);
        console.log(e);
      })
      .catch(E => {
        console.log(E);
      });
  };
  const renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity onPress={() => navigation.navigate('useView', item)}>
        <View
          style={{
            backgroundColor: 'blue',
            width: 100,
            height: 30,
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {item.foodname}
          </Text>
        </View>
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
  return (
    <View>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../images/mff.jpg')}>
        <View style={styles.searchbar}>
          <TextInput
            placeholder="SEARCH ITEM HERE"
            style={{width: '40%'}}
            onChangeText={e => setsearch(e)}
          />
          <Icon
            name="search"
            color={'black'}
            size={22}
            onPress={() => valueSeacrch()}
            style={{marginRight:12}}
          />
        </View>
        <View style={{marginTop: 50}}>
          <TouchableOpacity onPress={() => setSatusView('v')}>
            <Text style={styles.text1}>VEGATABLES</Text>
          </TouchableOpacity>
          {satusView === 'v' ? (
            <View>
              <FlatList
                data={foodItemList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
              />
            </View>
          ) : null}
          <TouchableOpacity onPress={() => ''}>
            <Text style={styles.text1}>FRUITS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ''}>
            <Text style={styles.text1}>JUICES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ''}>
            <Text style={styles.text1}>MEAT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ''}>
            <Text style={styles.text1}>OTHERS</Text>
          </TouchableOpacity>
        </View>
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
                <Text style={{color: 'white', fontWeight: 'bold'}}>
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
    width: 380,
    height: 60,
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 23,
    borderRadius:20,
    backgroundColor: '#fff',
    paddingLeft: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {
    fontWeight: '600',
    marginTop: 20,
    fontSize: 20,
    width: 300,
    borderWidth: 2,
    marginLeft: 14,
    padding: 12,
    textAlign: 'center',
    borderRadius: 12,
    backgroundColor: '#DB2AB0',
    marginLeft: 50,
    color: '#fff',
  }
});

export default viewitem;
