import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import FRIDGE_ACTIONS from '../../api/actions';
import urls from '../../api/urls';
import CustomInput from '../../components/custom-input';
import PrimaryButton from '../../components/primary-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 28, color: 'indigo', fontWeight: '800', marginLeft: 50 }}>Welcome To </Text>
                    <Text style={{ fontSize: 28, color: '#9C27B0', fontWeight: '800' }}>My Fridge</Text>
                </View>
                <Image source={require('../../images/fridgeicon.png')}
                    style={{ width: 100, height: 100, marginBottom: 50, marginHorizontal: 150, marginTop: 20 }}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 25, }}>
                    <TextInput placeholder={'Enter name'} value={name} onChangeText={setName}
                        style={{ borderWidth: 1, borderRadius: 20, paddingLeft: 18 }} />
                    <TextInput placeholder={'Enter password'} secureTextEntry={true} value={password} onChangeText={setPassword}
                        style={{ borderWidth: 1, marginTop: 18, borderRadius: 20, paddingLeft: 18 }}
                    />
                    <PrimaryButton onPress={onSignin} style={{ marginTop: 50, }} title={'Sign In'} />
                    <Text onPress={() => props?.navigation.navigate('Signup')}
                        style={{ textDecorationLine: 'underline', marginTop: 20, alignSelf: 'center', fontSize: 18, fontWeight: '800' }}>
                        Do Not Have An Account? SignUp</Text>
                </ScrollView>
            </View>
        </View>
    );
};
export default Signin;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 100,
    }
});