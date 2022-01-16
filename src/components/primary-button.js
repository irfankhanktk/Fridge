import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../screens/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PrimaryButton = ({ onPress, title, textStyle, style, icon, plus, expand = false, disabled }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.btn, style]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
            {icon && <AntDesign name={expand ? 'upcircleo' : 'downcircleo'} size={20} color={colors.white}
                style={{ position: 'absolute', right: 15, top: 15 }} />}
            {plus && <AntDesign name={plus} size={20} color={colors.white}
                style={{ position: 'absolute', right: 15, top: 15 }} />}
        </TouchableOpacity>
    );
};
export default PrimaryButton;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        backgroundColor: '#00BCD4',
        paddingHorizontal: 22,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    btn: {
        borderRadius: 12,
        marginTop: 20,
        padding: 12,
        backgroundColor: colors.primary,
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },
});