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

    const onSignup = async () => {

        try {
            if (password !== cpassword) {
                alert('passwords did not match')
            }
            const res = await FRIDGE_ACTIONS.postFormData(urls.signup, { u_name: name, u_password: password });
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
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, }}>
                    <Text style={{ fontSize: 25, color: 'indigo', fontWeight: '800', marginBottom: 30, marginHorizontal: 100 }}>SIGN UP </Text>
                    <CustomInput placeholder={'User name'} value={name} onChangeText={setName} />
                    <CustomInput placeholder={'Enter password'} secureTextEntry={true} value={password} onChangeText={setPassword} />
                    <CustomInput placeholder={'Conform password'} secureTextEntry={true} value={cpassword} onChangeText={setCPassword} />
                    <PrimaryButton onPress={onSignup} style={{ marginTop: 70 }} title={'Signup'} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ textDecorationLine: 'underline', marginTop: 30, alignSelf: 'center', fontSize: 17, marginHorizontal:20,fontWeight:'800'  }} >Already Have An Account ? </Text>
                        <Text onPress={() => props?.navigation?.pop()}
                            style={{ textDecorationLine: 'underline', marginTop: 30, fontSize: 17, color: 'red', fontWeight: '800' }}>
                            Sign in</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
export default Signup;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 100,
    }
});