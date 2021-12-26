import React, { useState } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, ImageBackground, TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ToastAndroid } from 'react-native';

const Juices = ({ navigation }) => {

    const [selectedValue, setSelectedValue] = useState("");
    const Toast = () => {
        ToastAndroid.showWithGravityAndOffset(
            'ITEM ADDED',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            20,
            100,
            //ToastAndroid.show for simple toast
            // ToastAndroid.showWithGravityAndOffset(
            //     'FOOD ADDED',
            //     ToastAndroid.SHORT,
            //     ToastAndroid.TOP,
        )
    };
    return (
        <View style={{ backgroundColor: "#E0EED6", height: "100%" }}>
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={require('../../assets/juices.jpg')}>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold", color: "#B2A7F0", paddingTop: 25, fontSize: 28 }}> Food</Text>
                    <View style={{ borderBottomWidth: 2, width: 225, height: 50, marginTop: 12, marginLeft: 65 }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ width: 238, backgroundColor: '#fff000' }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                            <Picker.Item label="Mango juice" value="Mango" />
                            <Picker.Item label="Apple juice" value="Apple" />
                            <Picker.Item label="Guava juice" value="Guava" />
                            <Picker.Item label="Stabbery juice" value="Stabbery" />
                            <Picker.Item label="Grapes juice" value="Grapes" />
                            <Picker.Item label="Mix Friut juice" value="Mix Friut" />
                            <Picker.Item label="Banana juice" value="Banana" />
                        </Picker>
                    </View>
                    {/* {selectedValue === "Drinks"?
            <Text>ml</Text>    
            :
            <Text>00</Text>
            } */}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 14 }}>
                    <Text style={{ fontWeight: "bold", color: "#B2A7F0", paddingTop: 25, fontSize: 28 }}> Quantity</Text>
                    <View style={{ borderBottomWidth: 2, width: 235, height: 50, marginTop: 12, marginLeft: 22 }}>
                        <TextInput placeholder="Weight"
                            style={{
                                backgroundColor: '#fff000',
                                padding: 14
                            }}>

                        </TextInput>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 28,
                            marginTop: 17, marginLeft: 10,
                            color: "#B2A7F0"
                        }}>L</Text>
                    </View>
                    {/* {itemValue === "Drinks" && selectedValue > "1" ?
            <Text>Liter</Text>    
            :
            <Text>00</Text>
            } */}
                </View>
                <View style={{ marginTop: 14 }}>
                    <TouchableOpacity onPress={Toast}
                        style={styles.button}>
                        <Text style={styles.text}>ADD</Text>
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
        padding: 7,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 60,
        borderWidth:2,
    },
    text: {
        fontWeight: '700',
        fontSize: 25,
        color: '#ff0',
        padding: 7,
    },
});
export default Juices;