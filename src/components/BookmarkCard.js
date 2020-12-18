import React, { useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector, shallowEqual } from 'react-redux';

import { AppText } from './common/AppText';
import { FastImage } from './FastImage';
import { ModalImage } from './ModalImage';
const BookmarkCard = (props) => {

    const { image, title, price, prices, onPress, quantity } = props;
    const { colors } = useTheme();
    const modalRef = useRef(null);
    const toggleModal = () => {
        modalRef.current.toggle();
    };
    const {
        UserProfileReducer,
    } = useSelector(({ UserProfileReducer }) => {
        return {
            UserProfileReducer,
        };
    }, shallowEqual);
    const price_product = prices.find((item) => item.iso === UserProfileReducer.currency.iso)


    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.containerStyle}>
                <View style={styles.imageContainer}>
                    <FastImage source={{ uri: image }} onPress={toggleModal} />
                </View>

                <View
                    style={styles.detailContainer}>
                    <AppText bold size={13}>{title}</AppText>
                    {quantity ?
                        <AppText primary bold size={13} style={styles.outOfStock} >
                            {parseFloat(price).toFixed(2)} {price_product.iso}
                        </AppText>
                        :
                        <View style={[styles.outOfStock, { backgroundColor: colors.primary }]}>
                            <AppText color="white" bold size={12}>Out Of Stock</AppText>
                        </View>
                    }
                </View>
                <ModalImage ref={modalRef} source={{ uri: image }} />
            </View>

        </TouchableWithoutFeedback >


    );
};

const styles = StyleSheet.create({
    containerStyle: {
        width: wp(20.6),
        aspectRatio: 0.26,
        margin: 3
    },
    imageContainer: {
        width: wp(20.6),
        aspectRatio: 0.4
    },
    outOfStock: {
        marginTop: hp(1),
        width: wp(20.6),
        height: hp(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailContainer: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'flex-start',

    }
});
export { BookmarkCard };
