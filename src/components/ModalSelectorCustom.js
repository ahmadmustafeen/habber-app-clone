import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const ModalSelectorCustom = (props) => {
    const { colors } = useTheme();
    const {
        viewStyle,
        style,
        data,
        onChangeText,
        onChange,
        initValue,
        noIcon,
        iconsize,
        iconColor,
        iconStyle,
        iconType
    } = props;
    return (
        <View style={[viewStyle]}>
            <ModalSelector
                selectStyle={[style, styles.modalSelector, { borderColor: colors.primary }]}
                data={data}

                selectTextStyle={{ textAlign: 'left', fontSize: 20, color: "rgba(0,0,0,0.45)" }}
                initValue={initValue || "Select"}
                onChange={onChangeText}
            />
            {!noIcon &&
                <Icon
                    size={iconsize || 20}
                    containerStyle={iconStyle || styles.iconStyle}
                    color={iconColor || "black"}
                    name={iconStyle || "downcircleo"}
                    type={iconType || "antdesign"}
                />
            }

        </View>
    )
}
const styles = StyleSheet.create({
    modalSelector: {
        marginVertical: hp(1.0),
        height: hp(5.8),
        paddingVertical: 3,
        paddingLeft: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        fontSize: 20,
        justifyContent: 'center',

        backgroundColor: 'transparent',
    },
    iconStyle: {
        position: 'absolute',
        right: wp(5),
        top: hp(3),
    }

})
export { ModalSelectorCustom }