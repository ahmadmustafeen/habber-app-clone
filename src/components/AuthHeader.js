import React from 'react'
import { from } from 'rxjs'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Icon } from 'react-native-elements'; import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



const AuthHeader = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                {!props.noIcon && <Icon
                    onPress={() => props.navigation.goBack()}
                    color="#c27e12"
                    name="leftcircleo"
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
        height: 50
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
        height: 120,
        width: 120,
    }
})
export { AuthHeader };