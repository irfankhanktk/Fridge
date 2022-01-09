import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, ActivityIndicator, } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import Icon from "react-native-vector-icons/MaterialIcons";
import FRIDGE_ACTIONS from '../api/actions';
import urls from '../api/urls';
import CustomHeader from '../components/custom-header';
import PrimaryButton from '../components/primary-button';
import colors from './colors';

const todaymeal = (props) => {
    const [dishes, setDishes] = useState([]);
    const [persons, setPersons] = React.useState('4');
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(false);

    const [dish, setDish] = React.useState({
        dish_name: '',
        dish_id: '',
    });
    const [showModal, setShowModal] = React.useState(false);
    const getDishes = async () => {
        try {
            const res = await FRIDGE_ACTIONS.getData('Dishes/Getdishes');
            console.log('res: ', res?.data);
            setDishes(res?.data)
        } catch (error) {

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
    const onOk = async () => {
        try {
            setLoading(true)
            setMessage(false);
            const res = await FRIDGE_ACTIONS.getData(`${urls.cook_dish}${dish.dish_id}&persons=${persons}`);
            console.log('res:::', res?.data);
            setMessage(res?.data);
        } catch (error) {
            console.log('error::', error);
            alert('something went wrong');
        } finally {
            setLoading(false);
        }
    }
    return (
        <View>
            <ImageBackground style={{ width: '100%', height: '100%' }}
                source={require('../images/123.jpg')}>
                <CustomHeader navigation={props.navigation} title={'Dishes'} />
                <View style={{ paddingHorizontal: 22, flex: 1 }}>
                    <PrimaryButton onPress={() => props.navigation.navigate("newdish")} title={'DISHES'} plus={'pluscircleo'} />
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
                            {dishes.map((e) => {
                                return (
                                    <TouchableOpacity onPress={() => onPressDish(e)} style={{ backgroundColor: colors.secondary, paddingVertical: 10, borderRadius: 10, marginTop: 15, alignItems: 'center' }}>
                                        <Text style={{ color: colors.primary }}>{e.dish_name}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
            {/* Here is modal to cook a dish */}
            <ReactNativeModal
                backdropOpacity={0.2}
                visible={showModal}
                style={{ margin: 0 }}
            >
                <View style={{ alignSelf: 'center', height: 300, width: '80%', padding: 15, borderRadius: 20, backgroundColor: colors.white }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18 }}>Are you sure to Cook {dish.dish_name}</Text>
                    <Text style={{ alignSelf: 'center', fontSize: 14, marginTop: 10, width: '70%' }}>No. Of People</Text>
                    <TextInput editable={!loading} value={persons} onChangeText={setPersons} keyboardType='number-pad' style={{ alignSelf: 'center', width: '70%', paddingHorizontal: 15, borderWidth: StyleSheet.hairlineWidth, paddingVertical: 5, marginTop: 10, borderRadius: 10 }} placeholder='No. of people' />
                    {loading && <ActivityIndicator style={{ alignSelf: 'center', marginTop: 30 }} size={'small'} color={colors.primary} />}
                    {message&& <Text style={{alignSelf:'center',marginTop:10,height:70,color:'red'}}>{message}</Text>}
                    <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <PrimaryButton disabled={loading} onPress={onOk} title={'OK'} style={{ width: '45%' }} />
                        <PrimaryButton disabled={loading} onPress={() =>{ setShowModal(false);setMessage(false)}} textStyle={{ color: colors.black }} title={'Cancel'} style={{ width: '45%', backgroundColor: colors.white, borderWidth: StyleSheet.hairlineWidth }} />
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



