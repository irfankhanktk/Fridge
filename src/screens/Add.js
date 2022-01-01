import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, SafeAreaView } from 'react-native';
import CustomHeader from '../components/custom-header';
import colors from './colors';

const Add = ({ navigation }) => {

    return (
            <View style={{flex:1}}>
                <ImageBackground style={{ width: '100%', height: '100%' }}
                    source={require('../images/back.jpeg')}
                >
                      <CustomHeader title={`Add`} navigation={navigation}/>
                    <View style={{ marginTop: 90, paddingHorizontal: 30 }}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('vegatable', { category_id: 1, title: 'vegatable' })}>
                            <Text style={styles.text1}>VEGATABLES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('vegatable', { category_id: 2, title: 'fruits' })}>
                            <Text style={styles.text1}>FRUITS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('vegatable', { category_id: 3, title: 'juices' })}>
                            <Text style={styles.text1}>JUICES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('vegatable', { category_id: 4, title: 'meat' })}>
                            <Text style={styles.text1}>MEAT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('vegatable', { category_id: 5, title: 'other' })}>
                            <Text style={styles.text1}>OTHERS</Text>
                        </TouchableOpacity>
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
