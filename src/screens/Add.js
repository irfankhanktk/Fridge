import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, SafeAreaView } from 'react-native';
import CustomHeader from '../components/custom-header';
import PrimaryButton from '../components/primary-button';
import colors from './colors';

const Add = ({ navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ width: '100%', height: '100%' }}
                source={require('../images/back.jpeg')}
            >
                <CustomHeader title={`Add`} navigation={navigation} />
                <View style={{ marginTop: 90, paddingHorizontal: 30 }}>
                    <PrimaryButton title={'VEGATABLES'} onPress={() => navigation.navigate('addItem', { category_id: 1, title: 'vegatable' })} />
                    <PrimaryButton title={'FRUITS'} onPress={() => navigation.navigate('addItem', { category_id: 2, title: 'fruits' })} />
                    <PrimaryButton title={'JUICES'} onPress={() => navigation.navigate('addItem', { category_id: 3, title: 'juices' })} />
                    <PrimaryButton title={'MEAT'} onPress={() => navigation.navigate('addItem', { category_id: 4, title: 'meat' })} />
                    <PrimaryButton title={'OTHERS'} onPress={() => navigation.navigate('addItem', { category_id: 5, title: 'other' })} />
                </View>
            </ImageBackground>
        </View>
    )
};
const styles = StyleSheet.create({
    text1: {
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },
    btn: {
        borderRadius: 12,
        marginTop: 20,
        borderWidth: 1,
        padding: 12,
        backgroundColor: colors.primary,
    }
});

export default Add;
