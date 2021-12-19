import React, { useState } from 'react';
import {
    SafeAreaView, StyleSheet, Text, View, ToastAndroid,
    TextInput, ImageBackground, TouchableOpacity, ScrollView
} from 'react-native';
import { CheckBox } from 'react-native-elements'

const newdish = () => {
    const [checked, setchecked] = useState(false);
    const [checked1, setchecked1] = useState(false);
    const [checked2, setchecked2] = useState(false);
    const [checked3, setchecked3] = useState(false);
    const [checked4, setchecked4] = useState(false);
    const [checked5, setchecked5] = useState(false);
    const [checked6, setchecked6] = useState(false);
    const [checked7, setchecked7] = useState(false);

    const Toast = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Dish Saved',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            20,
            130,
        )
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
            <View>
                <ImageBackground style={{ width: '100%', height: '100%' }}
                    source={require('../../images/1.jpg')}>
                    <View>
                        <Text style={styles.text}>Name:</Text>
                        <TextInput placeholder="Dish Name"
                            style={{
                                borderWidth: 1, width: "90%", height: 55,
                                marginLeft: 20, padding: 14, borderRadius: 14,
                                marginTop: 14, backgroundColor: '#fff'
                            }} />
                    </View>
                    <Text style={styles.text}>Fridge Items:</Text>
                    <ScrollView>
                        <View>
                            <CheckBox
                                title='Chicken'
                                checked={checked}
                                onPress={() => setchecked(!checked)}
                            />
                            <CheckBox
                                title='Fish'
                                checked={checked1}
                                onPress={() => setchecked1(!checked1)}
                            />
                            <CheckBox
                                title='Mutton'
                                checked={checked2}
                                onPress={() => setchecked2(!checked2)}
                            />
                            <CheckBox
                                title='Beaf'
                                checked={checked3}
                                onPress={() => setchecked3(!checked3)}
                            />
                            <CheckBox
                                title='Yogart'
                                checked={checked4}
                                onPress={() => setchecked4(!checked4)}
                            />
                            <CheckBox
                                title='Palak'
                                checked={checked5}
                                onPress={() => setchecked5(!checked5)}
                            />
                            <CheckBox
                                title='Patoto'
                                checked={checked6}
                                onPress={() => setchecked6(!checked6)}
                            />
                            <CheckBox
                                title='tomato'
                                checked={checked7}
                                onPress={() => setchecked7(!checked7)}
                            />
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={Toast}>
                        <Text style={styles.button}>SAVE</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        marginLeft: 20,
        marginTop: 12,
    },
    button: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 140,
        marginBottom: 30,
        borderWidth: 2,
        borderRadius: 14,
        backgroundColor: '#00FF00',
        height: 60,
        width: 130,
        padding: 9,
        textAlign: 'center',
        color: '#fff',
    }
});

export default newdish;


