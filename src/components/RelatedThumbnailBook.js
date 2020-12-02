import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FastImage } from './FastImage';

export const RelatedThumbnailBook = (props) => {
    return (
        <View style={styles.containerStyle}>
            <FastImage source={{ uri: props.url }} onPress={props.onPress} />

        </View>
    );
};
const styles = StyleSheet.create({
    containerStyle: {
        width: wp(16.33),
        aspectRatio: 0.6,
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
});
