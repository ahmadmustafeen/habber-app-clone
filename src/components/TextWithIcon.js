import { useTheme } from '@react-navigation/native';
import React from 'react';
import { I18nManager } from 'react-native';
import { Platform } from 'react-native';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import { AppText } from './common';



const TextWithIcon = (props) => {
    const {
        iconName,
        iconType,
        iconSize,
        title,
        value,
        size,
        small,
        large,
        color,
        onPress,
        style
    } = props;
    const { colors } = useTheme()

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>

            <Icon
                color={colors.primary}
                name={iconName || "feather"}
                type={iconType || "font-awesome"}
                size={iconSize || 14}
            />

            <View style={styles.text}>
                <AppText
                    size={size}
                    small={small}
                    large={large}
                    color={color || colors.primary}>
                    {`${title} ${value}`}</AppText>
            </View>


        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: hp(0.5)

    },
    text: {
        // backgroundColor: 'red',
        alignItems: 'center',
        marginTop: I18nManager.isRTL && Platform.OS === 'android' ? hp(-2) : hp(0),
        paddingLeft: wp(5),
    }
})
export { TextWithIcon }