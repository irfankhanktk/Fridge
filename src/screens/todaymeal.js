import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialIcons";
import FRIDGE_ACTIONS from '../api/actions';
import CustomHeader from '../components/custom-header';
import PrimaryButton from '../components/primary-button';
import colors from './colors';

const todaymeal = (props) => {
    const [dishes, setDishes] = useState([]);
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
    return (
        <View>
            <ImageBackground style={{ width: '100%', height: '100%' }}
                source={require('../images/123.jpg')}>
                <CustomHeader navigation={props.navigation} title={'Dishes'} />
                <View style={{ paddingHorizontal: 22 }}>
                    {/* <View style={{
                        flexDirection: 'row', marginTop: 20,
                        backgroundColor: '#fff000',
                        width: "83%",
                        marginLeft: 15,
                        borderRadius: 15
                    }}>
                        <Text style={styles.text}>DISHES</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("newdish")}style={{backgroundColor:'red'}}>
                            <Icon name="add-circle-outline" color="#984900" size={40} style={{}} />
                        </TouchableOpacity>
                    </View> */}
                    <PrimaryButton onPress={() => props.navigation.navigate("newdish")} title={'DISHES'} plus={'pluscircleo'} />
                    <View>
                        <ScrollView>
                            {dishes.map((e) => {
                                return (
                                    <TouchableOpacity style={{ backgroundColor:colors.secondary,paddingVertical:10,borderRadius:10,marginTop:15,alignItems:'center'}}>
                                        <Text style={{color:colors.primary}}>{e.dish_name}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
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



