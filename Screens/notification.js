import React from 'react';
import { StyleSheet, View, ImageBackground, Text, SafeAreaView } from 'react-native';

const notification = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <ImageBackground style={{ width: '100%', height: '100%' }}
                    source={require('../images/123.jpg')}>
                    <Text style={styles.text}>Food To Be Expired</Text>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    text: {
        marginTop: 14,
        marginLeft: 100,
        fontSize: 25,
        color: 'red',
        fontWeight: 'bold'
    }
});

export default notification;
