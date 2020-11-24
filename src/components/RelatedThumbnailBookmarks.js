import React from 'react';
import { View, StyleSheet } from 'react-native';

import { FastImage } from './FastImage';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const RelatedThumbnailBookmarks = (props) => {
    return (
        <View style={styles.containerStyle}>
            <FastImage source={{ uri: props.url }} />
        </View>
    );
};
const styles = StyleSheet.create({
    containerStyle: {
        width: wp(9.33),
        aspectRatio: 0.34,
        borderWidth: 1,
        marginLeft: 6,
        borderRadius: 10,
        overflow: 'hidden',
    },
});
