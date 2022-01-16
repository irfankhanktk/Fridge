import React from 'react';
import { StyleSheet, View, ImageBackground, Text, SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../components/custom-header';
import Icon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment';
import colors from './colors';
const notification = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader navigation={navigation} title={'Notifications'} />
            <View>
                <ImageBackground style={{ width: '100%', height: '100%' }}
                    source={require('../images/123.jpg')}>
                    <View style={{ flex: 1, marginTop: 30, }}>
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 22, }}>
                            {
                                Array(10).fill({ expiry_date: '2022-01-05' }).map((ele) =>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent', borderWidth: StyleSheet.hairlineWidth, paddingHorizontal: 20, paddingVertical: 15, marginTop: 20, borderRadius: 20 }}>
                                        <Icon name='circle-notifications' size={30} color={colors.primary} />
                                        <Text style={{ flex: 1, marginLeft: 10 }}>Hi, it is notified that onion will expires after
                                            <Text> {moment(ele.expiry_date).diff(new Date(), 'hours').toLocaleString()} hours</Text>
                                        </Text>

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
