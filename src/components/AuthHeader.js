import React from 'react'
import { View, Text, StyleSheet, Image, I18nManager } from 'react-native'
import { Icon } from 'react-native-elements'; import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import Language from '../containers/Language'


const AuthHeader = (props) => {
    const { customNavigate } = props
    const { colors } = useTheme()
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                {!props.noIcon && <Icon
                    onPress={!customNavigate ? () => props.navigation.goBack() : () => props.navigation.navigate(Language)}
                    color={colors.primary}
                    name={I18nManager.isRTL ? "rightcircleo" : "leftcircleo"}
                    type="antdesign"
                />}
            </View>
            <View style={styles.logo}>
                <Image
                    style={styles.imageAvatar}
                    source={require('../assets/images/logo.png')}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: hp(7.6),
        flexDirection: 'row',
        height: hp(12),
        paddingBottom: hp(2)
    },
    icon: {
        width: '15.33%',
        height: '50%',
        justifyContent: 'flex-start',
        alignContent: 'center'
    },
    logo: {
        width: '72.33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageAvatar: {
        marginTop: hp(4),
        height: hp(20),
        aspectRatio: 1,
    }
})
export { AuthHeader };