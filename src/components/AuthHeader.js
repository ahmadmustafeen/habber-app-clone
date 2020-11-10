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
                <Icon
                    onPress={() => props.navigation.goBack()}
                    color="#c27e12"
                    name="leftcircleo"
                    type="antdesign"
                />
            </View>
            <View style={styles.logo}>
                <Image
                    source={require('../assets/images/Screenshot_Logo.jpg')}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: hp(3.6),
        flexDirection: 'row',
        height: 100
    },
    icon: {
        width: '15.33%',
        height: '50%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    logo: {
        width: '72.33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageAvatar: {
        height: '100%',
        width: '100%',
    }
})
export { AuthHeader };