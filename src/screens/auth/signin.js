import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import FRIDGE_ACTIONS from '../../api/actions';
import urls from '../../api/urls';
import CustomInput from '../../components/custom-input';
import PrimaryButton from '../../components/primary-button';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Signin = (props) => {
    const [name, setName] = React.useState('');

    const [password, setPassword] = React.useState('');

    const onSignin = async () => {
        try {
            const res = await FRIDGE_ACTIONS.postFormData(urls.signin, { u_name: name, u_password: password });
            if (res?.data === "Password or UserName is incorrect") {
                alert(res?.data);
                return;
            }
            await AsyncStorage.setItem('@user', JSON.stringify(res?.data));
            props?.navigation?.replace('Home');
        } catch (error) {
            alert(error);
        }
    }

    //    React.useEffect(()=>{

    //    },[]);


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.body}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, }}>
                    <CustomInput placeholder={'Enter name'} value={name} onChangeText={setName} />
                    <CustomInput placeholder={'Enter password'} value={password} onChangeText={setPassword} />
                    <PrimaryButton onPress={onSignin} style={{ marginTop: 100 }} title={'Signin'} />
                    <Text onPress={() => props?.navigation.navigate('Signup')}
                        style={{ textDecorationLine: 'underline', marginTop: 30, alignSelf: 'center' }}>
                        Do you have an account? signup</Text>
                </ScrollView>
            </View>
        </View>
    );
};
export default Signin;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 200,
    }
});