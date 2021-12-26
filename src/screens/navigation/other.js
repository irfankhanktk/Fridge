import React, { useState } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, ImageBackground, TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ToastAndroid } from 'react-native';

const other = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const Toast = () => {
        ToastAndroid.showWithGravityAndOffset(
            'FOOD ADDED',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            20,
            150,
        )
    };
    return (
        <View style={{ backgroundColor: "#E0EED6", height: "100%" }}>
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={require('../../assets/bakery.jpg')}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{
                        fontWeight: "bold", color: "#FFD700",
                        paddingTop: 25, fontSize: 28
                    }}> Food</Text>
                    <View style={{
                        borderBottomWidth: 2, width: 218,
                        height: 50, marginTop: 12, marginLeft: 65
                    }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ width: 218, backgroundColor: '#fff' }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                            <Picker.Item label="Eggs" value="Eggs" />
                            <Picker.Item label="Cake" value="Cake" />
                            <Picker.Item label="Ice Cream" value="Ice Cream" />
                            <Picker.Item label="Bread" value="Bread" />
                        </Picker>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 14 }}>
                    <Text style={{
                        fontWeight: "bold", color: "#FFD700",
                        paddingTop: 25, fontSize: 28
                    }}> Quantity</Text>
                    <View style={{
                        borderBottomWidth: 2, width: 218,
                        height: 50, marginTop: 12, marginLeft: 22
                    }}>
                        <TextInput placeholder="Quantity"
                            style={{ backgroundColor: '#fff', padding: 14 }}>
                        </TextInput>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 22,
                            marginTop: 20, marginLeft: 3,
                            color: "#FFD700"
                        }}>/Item</Text>
                    </View>
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
export default other;