import React, { useState, useEffect } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, ImageBackground
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ToastAndroid } from 'react-native';

const Vegatableview = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [qty, setqty] = useState('');

    var [foodItemList, setFoodItemList] = useState([]);
    useEffect(() => {
        console.log(1)
        getdata()
    }, [])
    const getdata = async () => {
        await fetch('http://192.168.43.137/addfood/api/addfood/fridgeItem').then((r) => r.json())
            .then((e) => {
                setFoodItemList(e)
            }).catch((E) => {
                console.log(E)
            })
    }
    const Toast = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Item Viewed',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            20,
            70,
        )
    };
    return (
        <View style={{ backgroundColor: "#E0EED6", height: "100%" }}>
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={require('../../assets/vegetable.jpg')}>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <Text style={{ fontWeight: "bold", color: "#B2A7F0", paddingTop: 25, fontSize: 28 }}> Food</Text>
                    <View style={{ borderBottomWidth: 2, width: 225, height: 50, marginTop: 12, marginLeft: 65 }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ width: 238, backgroundColor: '#fff' }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                            <Picker.Item label="Select" value="" />
                            {
                                foodItemList.map(e => (
                                    console.log(e.foodname),
                                    <Picker.Item key={e.fid} label={e.foodname} value={e.qty} />

                                ))}
                        </Picker>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 14 }}>
                    <Text style={{ fontWeight: "bold", color: "#B2A7F0", paddingTop: 25, fontSize: 28 }}> Quantity</Text>
                    <View style={{
                        borderBottomWidth: 2, width: 235, height: 50,
                        marginTop: 12, marginLeft: 22, backgroundColor: '#fff'
                    }}>
                        <Text>{selectedValue}</Text>
                    </View>
                    <View>
                        {selectedValue < 1 ?
                            <Text style={{
                                fontWeight: 'bold', fontSize: 28,
                                marginTop: 17, marginLeft: 16,
                                color: "#B2A7F0"
                            }}>g</Text>
                            :
                            <Text style={{
                                fontWeight: 'bold', fontSize: 28,
                                marginTop: 17,
                                color: "#B2A7F0"
                            }}>kg</Text>
                        }
                    </View>
                </View>
                <View style={{ marginTop: 14 }}>
                    <TouchableOpacity onPress={Toast}
                        style={styles.button}>
                        <Text style={styles.text}> USE ITEM</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
};
const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 65,
        backgroundColor: '#3e3f8f',
        padding: 10,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 60,
    },
    text: {
        fontWeight: '700',
        fontSize: 24,
        color: '#ff0',
        padding: 7,
    },
});
export default Vegatableview;