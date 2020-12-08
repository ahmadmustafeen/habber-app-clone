import React, { useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { FastImage } from './FastImage';
import { ModalImage } from './ModalImage';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const BookmarkCard = (props) => {
    const { image, author_name, title, price, onPress, quantity } = props;
    const { colors } = useTheme();

    const modalRef = useRef(null);

    const toggleModal = () => {
        modalRef.current.toggle();
    };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.containerStyle}>
                <View style={styles.imageContainer}>
                    <FastImage source={{ uri: image }} onPress={toggleModal} />
                </View>

                <View
                    style={{
                        flex: 1,
                        paddingVertical: 10,
                        justifyContent: 'flex-start',

                    }}>
                    <AppText bold size={13}>{title}</AppText>
                    {quantity ?
                        <AppText primary bold size={13} style={styles.outOfStock} >
                            {parseFloat(price).toFixed(2)} KW
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
        // borderWidth: 0.5,
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
    }
});
export { BookmarkCard };
