import React from 'react';
import { StyleSheet, View, ImageBackground, Text, ScrollView, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/custom-header';
import Icon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment';
import colors from './colors';
import urls from '../api/urls';
import FRIDGE_ACTIONS from '../api/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const notification = ({ navigation }) => {
    const [stockNotifications, setStockNotifications] = React.useState([]);
    const [itemNotifications, setItemNotifications] = React.useState([]);
    const [isStock, setIsStock] = React.useState(true);
    const getNotifications = async () => {
        try {
            let user = await AsyncStorage.getItem('@user');
            if (user) {
                console.log('JSON.parse(user):', JSON.parse(user));
                user = JSON.parse(user);
                const response = await FRIDGE_ACTIONS.getData(`${urls.stock_notifications}?user_id=${user?.id}`);
                const response2 = await FRIDGE_ACTIONS.getData(`${urls.item_notifications}?user_id=${user?.id}`);

                setStockNotifications(response?.data);
                setItemNotifications(response2?.data);
            }
        } catch (error) {
            alert(error);
        }
    }
    React.useEffect(() => {
        getNotifications();
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader navigation={navigation} title={'Notifications'} />
            <View style={{flex:1}}>
                {/* <ImageBackground style={{ width: '100%', height: '100%' }}
                    source={require('../images/123.jpg')}> */}
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                        <TouchableOpacity onPress={() => setIsStock(true)} style={{ borderBottomWidth: isStock ? 1 : 0, borderColor: colors.black, width: '50%', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{}}>Stock</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsStock(false)} style={{ borderBottomWidth: isStock ? 0 : 1, borderColor: colors.black, width: '50%', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{}}>Item</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginTop: 30, }}>
                        {console.log('itemNotifications::',itemNotifications)}
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
                            {isStock ?
                                stockNotifications?.map((ele) =>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between',
                                        //backgroundColor: 'white',
                                        borderWidth: StyleSheet.hairlineWidth,
                                        paddingHorizontal: 10, paddingVertical: 10, marginTop: 20, borderRadius: 20
                                    }}>
                                        <Icon name='circle-notifications' size={30} color={colors.black} />
                                        <View style={{ paddingLeft: 10, width: '70%' }}>
                                            <Text>{ele?.title}</Text>
                                            <Text style={{ flex: 1, marginLeft: 10 }}>{ele?.description}</Text>
                                        </View>
                                        <Text style={{ width: '20%', textAlign: 'center' }}>
                                            {moment(ele?.created_at).fromNow().toLocaleString()}
                                        </Text>
                                    </View>
                                ) :
                                itemNotifications?.map((ele) =>
                                    <View style={{
                                        flexDirection: 'row',
                                        //backgroundColor: 'white',
                                        borderWidth: StyleSheet.hairlineWidth,
                                        paddingHorizontal: 10, paddingVertical: 10, marginTop: 20, borderRadius: 20
                                    }}>
                                        <Icon name='circle-notifications' size={30} color={colors.black} />
                                        <View style={{width: '70%',paddingLeft:10 }}>
                                            <Text style={{ flex: 1,}}>{ele?.item_name}{ele?.expiry_duration<0?' has expired since '+(-ele?.expiry_duration)+' hours':' will expire within '+(ele?.expiry_duration)+' hours'}</Text>
                                        </View>
                                        {/* <Text style={{ width: '20%', textAlign: 'center' }}>
                                            {moment(ele?.created_at).fromNow().toLocaleString()}
                                        </Text> */}
                                    </View>
                                )
                            }
                        </ScrollView>
                    </View>
                {/* </ImageBackground> */}
            </View>
        </View>
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
