import React from 'react';
import { View, StyleSheet } from 'react-native';

import { FastImage } from './FastImage';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const RelatedThumbnailClub = (props) => {
    return (
        <View style={styles.containerStyle}>
            <FastImage source={{ uri: props.url }} onPress={props.onPress} />
        </View>
    );
};
const styles = StyleSheet.create({
    containerStyle: {
        width: wp(18),
        aspectRatio: 1,
        borderWidth: 1,
        marginHorizontal: wp(2),
        borderRadius: 10,
        overflow: 'hidden',
    },
});
