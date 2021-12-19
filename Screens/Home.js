import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Home = (props) => {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <ImageBackground style={{ width: '100%', height: '100%' }}
                    source={require('../images/inside.jpg')}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Add")}
                                style={styles.button}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="shopping-bag" size={30} color="#00BCD4" style={{ marginRight: 85 }} />
                                    <Text style={styles.text}>ADD</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate("viewitem")}
                                style={styles.button}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="list" size={30} color="#00BCD4" style={{ marginRight: 85 }} />
                                    <Text style={styles.text}>VIEW</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("notification")}
                                style={styles.button}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Icon name='bell' size={30} color="#00BCD4" style={{ marginRight: 8 }} />
                                    <Text style={styles.text}>NOTIFICATION</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate("todaymeal")}
                                style={styles.button}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="spoon" size={40} color="#00BCD4" style={{ marginRight: 8 }} />
                                    <Text style={styles.text}>TODAY MEAL</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:"100%",
        marginTop: 15,
        paddingHorizontal: 10,
        marginRight: 40,
        justifyContent: 'center',
    },
    button: {
        width: '70%',
        height: 80,
        backgroundColor: "#FFD700",
        padding: 22,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 70,
        borderWidth:2,
    },
    text: {
        fontWeight: '900',
        fontSize: 20,
        color: '#4B0082',
    }
});

export default Home;