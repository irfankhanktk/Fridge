import React from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialIcons";

const todaymeal = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <ImageBackground style={{ width: '100%', height: '100%' }}
                    source={require('../images/123.jpg')}>
                    <View style={{
                        flexDirection: 'row', marginTop: 20,
                        backgroundColor: '#fff000', width: "93%",
                        marginLeft: 15, borderRadius: 15
                    }}>
                        <Text style={styles.text}>DISHES</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("newdish")}>
                            <Icon name="add-circle-outline" color="#984900" size={56} style={{ marginLeft: 190 }} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        marginLeft: 45,
        marginTop: 12,
        fontWeight: '800',
        color: "#000",
    },
});
export default todaymeal;



