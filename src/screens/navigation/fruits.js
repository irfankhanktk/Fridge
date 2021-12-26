import React, { useState } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, ImageBackground, TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ToastAndroid } from 'react-native';

const Fruits = ({ navigation }) => {

    const [selectedValue, setSelectedValue] = useState("");
    const Toast = () => {
        //ToastAndroid.show for simple toast
        ToastAndroid.showWithGravityAndOffset(
            'FOOD ADDED',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            20,
            150,
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
                source={require('../../assets/fruits.png')}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: "bold", color: "#B2A7F0", paddingTop: 25, fontSize: 28 }}> Food</Text>
                    <View style={{ borderBottomWidth: 2, width: 250, height: 50, marginTop: 12, marginLeft: 45 }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ width: 248, backgroundColor: '#fff' }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                            <Picker.Item label="Mango" value="Mango" />
                            <Picker.Item label="Apple" value="Apple" />
                            <Picker.Item label="Guava" value="Guava" />
                            <Picker.Item label="Stabbery" value="Stabbery" />
                            <Picker.Item label="Grapes" value="Grapes" />
                            <Picker.Item label="Pear" value="Pear" />
                        </Picker>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 14 }}>
                    <Text style={{
                        fontWeight: "bold", color: "#B2A7F0",
                        paddingTop: 25, fontSize: 28
                    }}> Weight</Text>
                    <View style={{
                        borderBottomWidth: 2, width: 250, height: 50,
                        marginTop: 12, marginLeft: 22
                    }}>
                        <TextInput placeholder="Weight"
                            style={{
                                backgroundColor: '#fff',
                                padding: 14
                            }}>
                        </TextInput>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 28,
                            marginTop: 17, marginLeft: 5,
                            color: "#B2A7F0"
                        }}>kg</Text>

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
        height: 55,
        backgroundColor: '#3e3f8f',
        padding: 2,
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
export default Fruits;