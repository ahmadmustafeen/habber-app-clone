import React from 'react';
import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { AppText } from "../../components/common"

export const BDScreenText = (props) => {
    const { title, value } = props;
    return (
        <AppText {...props} style={styles.infoProduct} bold size={15}>
            {title}: {value}
        </AppText>
    )
}

const styles = StyleSheet.create({
    infoProduct: {
        paddingVertical: hp(0.1),
    },
});
