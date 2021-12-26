import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, SafeAreaView } from 'react-native';

const Add = ({ navigation }) => {

    return (
        <SafeAreaView>
            <View>
                <ImageBackground style={{ width: '100%', height: '100%' }}
                    // source={require('../images/back.jpeg')}
                    >
                    <View style={{ marginTop: 90 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('vegatable')}>
                            <Text style={styles.text1}>VEGATABLES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('fruits')}>
                            <Text style={styles.text1}>FRUITS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('juices')}>
                            <Text style={styles.text1}>JUICES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('meat')}>
                            <Text style={styles.text1}>MEAT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('other')}>
                            <Text style={styles.text1}>OTHERS</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    text1: {
        fontWeight: '600',
        marginTop: 20,
        fontSize: 20,
        width: 300,
        borderWidth: 2,
        marginLeft: 14,
        padding: 12,
        textAlign: 'center',
        borderRadius: 12,
        backgroundColor: '#DB2AB0',
        marginLeft: 50,
        color: '#fff',
    },
});

export default Add;
