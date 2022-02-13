import React from 'react';
import {StyleSheet, View, ImageBackground, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FRIDGE_ACTIONS from '../api/actions';
import urls from '../api/urls';
import CustomHeader from '../components/custom-header';
import PrimaryButton from '../components/primary-button';
import colors from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pair = ({navigation}) => {
  const [users, setUsers] = React.useState([]);


 const onTogglePair =async(item)=>{
   try {
    let user = await AsyncStorage.getItem('@user');
    if (user) {
      user = JSON.parse(user);
      let url=`${urls.pair_user}?user_id=${user?.id}&pair_id=${item?.user_id}`;
       if(item?.is_pair){
          url=`Pair/UnPairUser?id=${item?.id}&user_id=${user?.id}`
       }
       const res= await FRIDGE_ACTIONS.getData(url);
       setUsers(res?.data);
    }
   } catch (error) {
       alert(error);
   }
 }


  const getUsers = async () => {
    try {
      let user = await AsyncStorage.getItem('@user');
      if (user) {
        user = JSON.parse(user);
        const res = await FRIDGE_ACTIONS.getData(`${urls.users}${user?.id}`);
        console.log('res::', res?.data);
        setUsers(res?.data);
      }
    } catch (error) {
      alert(error);
    }
  };
  React.useEffect(() => {
    getUsers();
  }, []);
  return (
    <View style={{flex: 1}}>
      <CustomHeader title={`Pair`} navigation={navigation} />
      <View style={{paddingTop: 30}}>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20}}
          data={users}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
                borderBottomWidth: StyleSheet.hairlineWidth,
                paddingVertical: 5,
              }}>
              <Text>{item?.u_name}</Text>
              <TouchableOpacity
                // disabled={item?.is_pair ? true : false}
                style={{
                  backgroundColor: item?.is_pair
                    ? colors.gray
                    : colors.primary,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={()=>onTogglePair(item)}>
                <Text>{item?.is_pair ? `un-Pair` : 'Pair'}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index + ''}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text1: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  btn: {
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    padding: 12,
    backgroundColor: colors.primary,
  },
});

export default Pair;
