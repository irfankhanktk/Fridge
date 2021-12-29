import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
const CustomHeader = ({navigation,title}) => {
    return (
        <View style={{ ...styles.container }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Icon name='arrowleft' color={'#fff'} size={25} />
            </TouchableOpacity>
            <Text style={{...styles.text}}>{title}</Text>
        </View>
    );
};
export default CustomHeader;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        backgroundColor: 'green',
        flexDirection: 'row',
        paddingHorizontal:22,
    },
    text:{
        fontSize:20,
        fontWeight:'700',
        color:'#fff',
        marginLeft:15
    }
});