import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
const CustomInput = ({
    onChangeText,
    value,
    placeholder
}) => {
    return (
            <TextInput placeholder={placeholder} value={value} style={styles.txt_input} onChangeText={onChangeText} />
    );
};
export default CustomInput;
const styles = StyleSheet.create({
    txt_input: {
       // borderBottomWidth: StyleSheet.hairlineWidth,
       borderWidth:1,
       borderRadius:20,
       marginBottom:22,
       paddingLeft:14,
    }
});