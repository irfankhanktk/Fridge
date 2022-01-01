import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
const CustomHeader = ({navigation,title,backBtn=true}) => {
    return (
        <View style={{ ...styles.container }}>
            {backBtn&&<TouchableOpacity style={{position:'absolute',top:20,left:20}} onPress={()=>navigation.goBack()}>
                <Icon name='arrowleft' color={'#fff'} size={25} />
            </TouchableOpacity>}
            <Text style={{...styles.text}}>{title}</Text>
            <View/>
        </View>
    );
};
export default CustomHeader;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        backgroundColor: '#00BCD4',
        paddingHorizontal:22,
        alignItems:'center',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    text:{
        fontSize:20,
        fontWeight:'700',
        color:'#fff',
        marginLeft:15
    }
});