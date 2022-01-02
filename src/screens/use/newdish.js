import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, StyleSheet, Text, View, ToastAndroid,
    TextInput, ImageBackground, TouchableOpacity, ScrollView
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import FRIDGE_ACTIONS from '../../api/actions';
import urls from '../../api/urls';
import CustomHeader from '../../components/custom-header';
import PrimaryButton from '../../components/primary-button';

const newdish = (props) => {
    const [checkedList, setCheckedList] = useState([]);
    const [dishName,setDishName]=useState('');

    const Toast = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Dish Saved',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            20,
            130,
        )
    };
    const getIngredients = async () => {
        try {
            const res = await FRIDGE_ACTIONS.getData(urls.ingradients);
            console.log('res:', res?.data);
            setCheckedList(res?.data);
        } catch (error) {

        }
    }
    const onSave=async()=>{
       try {
       
           const ids=[];
           checkedList.map(e=>{
               if(e.isSelected){
                 ids.push(e.id);
               }
           });
           console.log(ids);
           if(ids.length===0&&!dishName){
               alert('You have not selected any ingredient or enter name');
               return ;
           }
           const body =new FormData();
           body.append('name',dishName);
           body.append('ids',ids.join());
           console.log('body:',body);
        const res = await FRIDGE_ACTIONS.postData(`${urls.add_dish}`,body);
        console.log('res of post dish:',res);
        Toast();
       } catch (error) {
           
       }
    }
    useEffect(() => {
        getIngredients();
    }, [])
    return (
                <View style={{flex:1}}>
                    <ImageBackground style={{ width: '100%', height: '100%' }}
                        source={require('../../images/1.jpg')}>
                            <CustomHeader navigation={props.navigation} title={'Add Dish'} />
                        <View>
                            <Text style={styles.text}>Name:</Text>
                            <TextInput placeholder="Dish Name"
                                style={{
                                    borderWidth: 1, width: "90%", height: 55,
                                    marginLeft: 20, padding: 14, borderRadius: 14,
                                    marginTop: 14, backgroundColor: '#fff'
                                }}
                                onChangeText={setDishName}
                                 />
                        </View>
                        <Text style={styles.text}>Fridge Items:</Text>
                        <View style={{flex:1}}>
                            <ScrollView>
                                {checkedList.map((ele, index) => <CheckBox
                                    title={ele.item_name}
                                    checked={ele.isSelected}
                                    onPress={() => {
                                        ele.isSelected = !ele.isSelected;
                                        const copy = [...checkedList];
                                        copy[index] = ele;
                                        setCheckedList(copy);
                                    }}
                                />)}
                            </ScrollView>
                        </View>
                        <PrimaryButton style={{marginHorizontal:22,marginBottom:10}}  title={'SAVE'} onPress={onSave}/>
                    </ImageBackground>
                </View>
    )
};
const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        marginLeft: 20,
        marginTop: 12,
    },
    button: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 140,
        marginBottom: 30,
        borderWidth: 2,
        borderRadius: 14,
        backgroundColor: '#00FF00',
        height: 60,
        width: 130,
        padding: 9,
        textAlign: 'center',
        color: '#fff',
    }
});

export default newdish;


