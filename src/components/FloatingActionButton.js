import React from 'react'
import { StyleSheet, TouchableOpacity, Image, I18nManager } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FloatingActionButton = (props) => {
    const { onPress, image } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.fab, { transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], }]}>
            <Image style={styles.fabImage} source={image} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    fab: {
        flex: 1,
        position: 'absolute',
        zIndex: 999,
        height: wp(17),
        width: wp(17),
        right: wp(4),
        bottom: hp(12),
    },
    fabImage: {
        width: '100%',
        height: '100%'
    },
})

export { FloatingActionButton }