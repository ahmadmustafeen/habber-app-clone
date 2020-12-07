import { useTheme } from '@react-navigation/native';
import React from 'react';
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
        small, large
        , color
    } = props;
    const { colors } = useTheme()

    return (
        <TouchableOpacity style={styles.container}>

            <Icon
                color={colors.primary}
                name={iconName || "feather"}
                type={iconType || "font-awesome"}
                size={iconSize || 16}
            />

            <View style={styles.text}>

            </View>
            <AppText
                size={size}
                small={small}
                large={large}
                color={color || colors.primary}>
                {`${title} ${value}`}</AppText>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: hp(1)

    },
    text: {
        paddingLeft: wp(5)
    }
})
export { TextWithIcon }