import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FRIDGE_ACTIONS from '../api/actions';
import CustomHeader from '../components/custom-header';
const Notify = (props) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = React.useState({});
    const {dish}=props?.route?.params;
console.log('props?.route?.params::',props?.route?.params);
    const getUsers = async () => {
        try {

            let user = await AsyncStorage.getItem('@user');
            if (user) {
                user = JSON.parse(user);
                setUser(user);
                setLoading(true);
                const res = await FRIDGE_ACTIONS.getData(`User/GetUsers?user_id=${user?.id}`);
                console.log('res: ', res?.data);
                setUsers(res?.data)
            }
        } catch (error) {
            alert(error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getUsers();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [])
    const notifyUsers=async(item)=>{
        try {
            const copy=users.filter(x=>x.id!==item?.id)
            setUsers(copy);
            const res = await FRIDGE_ACTIONS.getData(`Notifications/NotifyUser?user_id=${item?.id}&description=${user?.u_name} want to cook ${dish?.dish_name}&dish_name=${dish?.dish_name}`);
            console.log('res:',res?.data);
        } catch (error) {
            alert(error)
        }
    }
    return (
        <View style={{flex: 1 }}>
            <CustomHeader navigation={props.navigation} title={'Notify Users'} />

            <View style={{ paddingHorizontal: 22,paddingTop:20, flex: 1 }}>
                <Text style={{textAlign:'center'}}>
                   You are going to notify users that you want to cook {dish?.dish_name}
                </Text>
                {users?.length===0&&!loading? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                   <Text>You are not paired with any user</Text>
               </View>:
               <FlatList
               data={users}
               renderItem={({item})=>(
                    <View style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-between',borderBottomWidth:1,}}>
                        <Text>{item?.u_name}</Text>
                        <TouchableOpacity onPress={()=>notifyUsers(item)}>
                            <Text>Notify</Text>
                        </TouchableOpacity>
                    </View>
               )}
               keyExtractor={(item,index)=> index+''}
               />}
            
            </View>
                
        </View>
    )
};
const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        marginLeft: 45,
        marginTop: 12,
        fontWeight: '800',
        color: "#000",
    },
});
export default Notify;



