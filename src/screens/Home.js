import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import FRIDGE_ACTIONS from '../api/actions';
import urls from '../api/urls';
import CustomHeader from '../components/custom-header';
import colors from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
    const [notificationsCountr, setNotificationsCounter] = React.useState();
    const [user, setUser] = React.useState({});
    const getNotiCounter = async (user_id) => {
        try {
            const response = await FRIDGE_ACTIONS.getData(`${urls.notificationsCounter}?user_id=${user_id}`);
            console.log('response?.data::',response?.data);
            setNotificationsCounter(response?.data);
        } catch (error) {
            alert(error);
        }
    }
    React.useEffect(() => {
        const unsubscribe =props?.navigation.addListener('focus', async() => {
            // do something
            let user = await AsyncStorage.getItem('@user');
            if (user) {
                user=JSON.parse(user)
                setUser(user);
                getNotiCounter(user?.id);
                console.log('JSON.parse(user):', user);
            }
          });
      
          return unsubscribe;
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }}
                source={require('../images/inside.jpg')}>
                {/* <Icon name="person" size={30} color={colors.white}/> */}
                <CustomHeader user_name={user?.u_name} backBtn={false} title={'Smart Fridge Food'} navigation={props.navigation} />
                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 22 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Add")}
                        style={styles.button}>
                        <Icon name="shopping-basket-add" size={30} color={colors.white} />
                        <Text style={styles.text}>ADD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("viewitem")}
                        style={styles.button}>
                        <Icon name="list-2" size={30} color={colors.white} />
                        <Text style={styles.text}>VIEW</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("todaymeal")}
                        style={styles.button}>
                        <Icon name="coffeescript" size={30} color={colors.white} style={{ marginRight: 8 }} />
                        <Text style={styles.text}>TODAY MEAL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("notification")}
                        style={styles.button}>
                        <Icon name='bell' size={30} color={colors.white} style={{ marginRight: 8 }} />
                        <Text style={styles.text}>
                            NOIFICATIONS
                        </Text>
                        {notificationsCountr? <View style={{ height: 20, width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondary, position: 'absolute', left: 30, borderRadius: 10, }}>
                            <Text style={{ color: colors.white, }}>{notificationsCountr}</Text>
                        </View>:null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Pair")}
                        style={styles.button}>
                        <Icon name="arrow-swap" size={30} color={colors.white} />
                        <Text style={styles.text}>PAIR</Text>
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
        // fontFamily:"RobotoCondensed-Light"
    }
});

export default Home;