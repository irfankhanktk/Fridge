import React from 'react';
import { StyleSheet, View, ImageBackground, Text, SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../components/custom-header';
import Icon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment';
import colors from './colors';
import urls from '../api/urls';
import FRIDGE_ACTIONS from '../api/actions';
const notification = ({ navigation }) => {
    const [notifications, setNotifications] = React.useState([]);
    const getNotifications = async () => {
        try {
            const response = await FRIDGE_ACTIONS.getData(`${urls.notifications}`);
            setNotifications(response?.data);
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
            <View>
                <ImageBackground style={{ width: '100%', height: '100%' }}
                    source={require('../images/123.jpg')}>
                    <View style={{ flex: 1, marginTop: 30, }}>
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 10, }}>
                            {
                                notifications?.map((ele) =>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent', borderWidth: StyleSheet.hairlineWidth, paddingHorizontal:10, paddingVertical: 10, marginTop: 20, borderRadius: 20 }}>
                                        <Icon name='circle-notifications' size={30} color={colors.primary} />
                                        <View style={{paddingLeft:10,width:'70%'}}>
                                            <Text>{ele?.title}</Text>
                                            <Text style={{ flex: 1, marginLeft: 10 }}>{ele?.description}</Text>
                                        </View>
                                        <Text style={{width:'20%',textAlign:'center'}}>{moment(ele?.created_at).fromNow().toLocaleString()}</Text>
                                    </View>
                                )}
                        </ScrollView>
                    </View>
                </ImageBackground>
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
