import React, { useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { FastImage } from './FastImage';
import { ModalImage } from './ModalImage';
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const BookmarkCard = (props) => {
    const { image, author_name, title, price, onPress } = props;
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
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                    }}>
                    <AppText bold size={13}>{title}</AppText>
                    <AppText primary bold size={13}>
                        {price} KW
                    </AppText>
                </View>
                <ModalImage ref={modalRef} source={{ uri: image }} />
            </View>
        </TouchableWithoutFeedback>
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
});
export { BookmarkCard };
