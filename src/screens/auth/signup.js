import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FRIDGE_ACTIONS from '../../api/actions';
import urls from '../../api/urls';
import CustomHeader from '../../components/custom-header';
import CustomInput from '../../components/custom-input';
import PrimaryButton from '../../components/primary-button';
const Signup = (props) => {
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cpassword, setCPassword] = React.useState('');
    
    const onSignup=async()=>{
    
        try {
            if(password!==cpassword){
                alert('passwords did not match')
            }
            const res= await FRIDGE_ACTIONS.postFormData(urls.signup,{u_name:name,u_password:password});
            alert('saved Successfully')
            props?.navigation?.pop();
        } catch (error) {
            alert(error);
        }
    }

//    React.useEffect(()=>{
    
//    },[]);


    return (
        <View style={{ flex: 1 }}>
            <CustomHeader navigation={props.navigation} title={'Sign Up'} />
            <View style={styles.body}>
            <ScrollView contentContainerStyle={{flexGrow:1,paddingHorizontal:22,}}>
                <CustomInput placeholder={'Enter name'} value={name} onChangeText={setName} />
                <CustomInput placeholder={'Enter password'} value={password} onChangeText={setPassword} />
                <CustomInput placeholder={'Enter password'} value={cpassword} onChangeText={setCPassword} />
                <PrimaryButton onPress={onSignup} style={{marginTop:100}} title={'Signup'}/>
                <Text onPress={()=>props?.navigation?.pop()} style={{textDecorationLine:'underline',marginTop:30,alignSelf:'center'}}>Already have an account? Sigin</Text>
            </ScrollView>
            </View>
        </View>
    );
};
export default Signup;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop:100,
    }
});