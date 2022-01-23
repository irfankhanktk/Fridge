import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { CommonActions } from '@react-navigation/native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
const CustomHeader = ({navigation,title,backBtn=true,user_name}) => {
    const logout=async()=>{
        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Signin' },
                // {
                //   name: 'Profile',
                //   params: { user: 'jane' },
                // },
              ],
            })
          );
         await AsyncStorage.clear();
    }
    return (
        <View style={{ ...styles.container }}>
            {backBtn&&<TouchableOpacity style={{position:'absolute',top:20,left:20}} 
            onPress={()=>navigation.goBack()}>
                <Icon name='arrowleft' color={'#fff'} size={25} />
            </TouchableOpacity>}
            <Text style={{...styles.text}}>{title}</Text>
            <View/>
            
            {user_name&&<Text style={{position:'absolute',top:20,left:20,color:'#fff'}}>{user_name}</Text>}
            {user_name&&<Text onPress={logout} style={{position:'absolute',top:20,right:20,color:'#fff'}}>{'Logout'}</Text>}
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