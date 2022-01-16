import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../components/custom-header';
import colors from './colors';

const Home = (props) => {

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }}
                source={require('../images/inside.jpg')}>
                <CustomHeader backBtn={false} title={'Smart Fridge Food'} navigation={props.navigation} />
                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 22 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Add")}
                        style={styles.button}>
                        <Icon name="shopping-bag" size={30} color={colors.white} />
                        <Text style={styles.text}>ADD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("viewitem")}
                        style={styles.button}>
                        <Icon name="list" size={30} color={colors.white} />
                        <Text style={styles.text}>VIEW</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("todaymeal")}
                        style={styles.button}>
                        <Icon name="spoon" size={40} color={colors.white} style={{ marginRight: 8 }} />
                        <Text style={styles.text}>TODAY MEAL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("notification")}
                        style={styles.button}>
                        <Icon name='bell' size={30} color={colors.white} style={{ marginRight: 8 }} />
                        <Text style={styles.text}>NOTIFICATION</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        marginTop: 15,
        paddingHorizontal: 10,
        marginRight: 40,
        justifyContent: 'center',
    },
    button: {
        // width: '70%',
        flexDirection: 'row',
        height: 80,
        backgroundColor: colors.primary,
        padding: 22,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 2,
    },
    text: {
        flex: 1,
        fontWeight: '900',
        textAlign: 'center',
        fontSize: 20,
        color: colors.white,
    }
});

export default Home;