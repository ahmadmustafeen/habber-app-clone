import React, { useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { AppText } from './common/AppText';
import { FastImage } from './FastImage';
import { ModalImage } from './ModalImage';
const BookClub = (props) => {
    const { bookclub_logo, name, onPress } = props;
    const modalRef = useRef(null);
    const toggleModal = () => {
        modalRef.current.toggle();
    };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.containerStyle}>
                <View style={styles.imageContainer}>
                    <FastImage source={{ uri: bookclub_logo }} onPress={toggleModal} />
                </View>
                <View
                    style={styles.txtDetails}>
                    <AppText capitalize size={14}>{name}</AppText>

                </View>
                <ModalImage ref={modalRef} source={{ uri: bookclub_logo }} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        alignSelf: 'center',
        width: wp(40.6),
        aspectRatio: 0.7,
    },
    imageContainer: {
        width: wp(40.6),
        aspectRatio: 1
    },
    txtDetails: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    }
});
export { BookClub };
