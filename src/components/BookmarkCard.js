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
import { I18nManager } from 'react-native';
const BookmarkCard = (props) => {

    const { image, title, arabic_title, price, prices, onPress, quantity } = props;
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
    var rtlLayout = false;
    (UserProfileReducer.currency.iso === "USD" || UserProfileReducer.currency.iso === "GBP" || UserProfileReducer.currency.iso === "EUR") && (rtlLayout = true)


    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.containerStyle}>
                <View style={styles.imageContainer}>
                    <FastImage source={{ uri: image }} onPress={toggleModal} />
                </View>

                <View
                    style={styles.detailContainer}>
                    <AppText bold size={13}>{I18nManager.isRTL ? arabic_title : title}</AppText>
                    {quantity ?
                        <AppText primary bold size={13} style={styles.outOfStock} >
                            {rtlLayout && price_product.symbol} {(parseFloat(prices.find((price) => price.iso === UserProfileReducer.currency.iso).price.toString().replace(",", ""))).toFixed(2)} {rtlLayout || price_product.symbol}
                        </AppText>
                        :
                        <View style={[styles.outOfStock, { backgroundColor: colors.primary }]}>
                            <AppText color="white" bold size={8}>{I18nManager.isRTL ? "الكمية نفذت" : "Out Of Stock"}</AppText>
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
        aspectRatio: 0.27,
    },
    imageContainer: {
        width: wp(20.6),
        aspectRatio: 0.4
    },
    outOfStock: {
        marginTop: hp(1),
        width: wp(20.6),
        height: hp(4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailContainer: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'flex-end',

    }
});
export { BookmarkCard };
