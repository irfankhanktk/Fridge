import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import PushNotification from 'react-native-push-notification';
import FRIDGE_ACTIONS from '../api/actions';
import urls from '../api/urls';
import CustomHeader from '../components/custom-header';
import PrimaryButton from '../components/primary-button';
import colors from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage'
const todaymeal = (props) => {

    const [dishes, setDishes] = useState([]);
    const [persons, setPersons] = React.useState('5');
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(false);
    const [user, setUser] = React.useState({});

    const [dish, setDish] = React.useState({
        dish_name: '',
        dish_id: '',
    });
    const [showModal, setShowModal] = React.useState(false);

    const getDishes = async () => {
        try {

            let user = await AsyncStorage.getItem('@user');
            if (user) {
                user = JSON.parse(user);
                setUser(user);
                const res = await FRIDGE_ACTIONS.getData(`Dishes/Getdishes?user_id=${user?.id}`);
                console.log('res: ', res?.data);
                setDishes(res?.data)
            }
        } catch (error) {
            alert(error);
        }
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getDishes();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [])
    const onPressDish = (ele) => {
        setDish({
            dish_id: ele.id,
            dish_name: ele.dish_name,
        });
        setShowModal(true);
    }
    const manageNotification = (obj) => {
        console.log('heloo');
        PushNotification.localNotification({
            channelId: "channel-id",
            title: `You cannot make ${obj?.title}`,
            message: obj?.description,
        });
    }
    const onOk = async () => {
        try {
            setLoading(true)
            setMessage(false);
            const res = await FRIDGE_ACTIONS.getData(`${urls.cook_dish}${dish.dish_id}&persons=${persons}&user_id=${user?.id}`);
            console.log('res:::', res);
            if (res?.status === 201) {
                manageNotification(res?.data);
            } else {
                setMessage(res?.data);
            }
        } catch (error) {
            console.log('error::', error);
            alert('something went wrong');
        } finally {
            setLoading(false);
        }
    }
    return (
        <View style={{flex: 1 }}>
            {/* <ImageBackground style={{ width: '100%', height: '100%' }}
                source={require('../images/123.jpg')}> */}
            <CustomHeader navigation={props.navigation} title={'Dishes'} />
            <View style={{ paddingHorizontal: 22, flex: 1 }}>
                <PrimaryButton
                    onPress={() => props.navigation.navigate("newdish")} title={'DISHES'} plus={'pluscircleo'} />
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
                        {dishes.map((e) => {
                            return (
                                <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between'}}>
                                <TouchableOpacity  onPress={() => onPressDish(e)}
                                    style={{
                                        width:200,
                                        // flex:1,
                                        backgroundColor: colors.secondary,
                                        paddingVertical: 10, borderRadius: 10,
                                        //  marginHorizontal: 40,
                                        marginTop: 18, alignItems: 'center',
                                    }}>
                                    <Text style={{
                                        color: colors.primary, fontWeight: '800', fontSize: 18
                                    }}>{e.dish_name}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>props?.navigation?.navigate('Notify',{dish:e})} style={{width:80,alignItems:'center',backgroundColor:'red',borderRadius:20}}>
                                    <Text>Notify</Text>
                                </TouchableOpacity>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
            {/* </ImageBackground> */}
            {/* Here is modal to cook a dish */}
            <ReactNativeModal
                visible={showModal}
                backdropOpacity={0.5}
                style={{ margin: 0, }}
            >
                <View style={{flex:1,justifyContent:'center'}}>
                <View style={{
                    alignSelf: 'center',
                    height: 300, 
                    width: '80%',
                     padding: 15,
                      borderRadius: 20,
                    backgroundColor: colors.white,
                }}>

               
                    <Text style={{ alignSelf: 'center', fontSize: 17 }}>
                        Are you sure to Cook {dish.dish_name}?</Text>
                    <Text style={{
                        alignSelf: 'center', fontSize: 14, marginTop: 10, width: '70%'
                    }}>
                        No. Of People</Text>
                    <TextInput editable={!loading} value={persons} onChangeText={setPersons}
                        keyboardType='number-pad'
                        style={{
                            alignSelf: 'center', width: '70%', paddingHorizontal: 15,
                            borderWidth: StyleSheet.hairlineWidth, paddingVertical: 5,
                            marginTop: 14, borderRadius: 10
                        }} placeholder='No. of people' />
                    {loading && <ActivityIndicator style={{ alignSelf: 'center', marginTop: 30 }}
                        size={'small'} color={colors.primary} />}
                    {message && <Text style={{
                        alignSelf: 'center', marginTop: 10, height: 70, color: 'red'
                    }}>{message}</Text>}
                    <View style={{
                        position: 'absolute', bottom: 20, alignSelf: 'center', width: '100%',
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                        <PrimaryButton disabled={loading} onPress={onOk} title={'OK'}
                            style={{ width: '45%' }} />
                        <PrimaryButton disabled={loading} onPress={() => {
                            setShowModal(false);
                            setMessage(false)
                        }}
                            textStyle={{ color: colors.black }} title={'Cancel'}
                            style={{
                                width: '45%', backgroundColor: colors.white,
                                borderWidth: StyleSheet.hairlineWidth
                            }} />
                    </View>
                    </View>
                </View>
            </ReactNativeModal>
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
export default todaymeal;



