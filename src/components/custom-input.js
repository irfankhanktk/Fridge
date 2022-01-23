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
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom:20,
    }
});