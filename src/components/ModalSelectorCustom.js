import { useTheme } from '@react-navigation/native';
import React from 'react'
import { Text } from 'react-native';
import { Platform } from 'react-native';
import { View, StyleSheet, I18nManager } from 'react-native';
import { Icon } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import { color } from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const ModalSelectorCustom = (props) => {
    const { colors } = useTheme();
    const {
        containerStyle,
        style,
        data,
        onChangeText,
        onChange,
        initValue,
        noIcon,
        iconsize,
        iconColor,
        iconStyle,
        iconType,
        fontSize,
        borderColor
    } = props;
    return (
        <View style={[containerStyle], {
            marginVertical: hp(1.0),
            // height: hp(5.8),
            paddingVertical: 1,
            paddingLeft: 5,
            borderRadius: 5,
            borderWidth: 0.5,
            justifyContent: 'center',
            // borderColor: colors.primary,
            backgroundColor: 'rgba(0,0,0,0.05)'
        }}>


            <ModalSelector
                selectStyle={[style, styles.modalSelector,
                    { borderColor: 'transparent' },
                    { fontSize: (fontSize || 25) },
                    Platform.OS === 'ios' && { height: hp(6), paddingBottom: hp(0.2), marginTo: hp(0.5) }
                ]}

                data={data}


                initValue={initValue || "Select"}
                initValueTextStyle={{ color: (props.color || "black"), textAlign: I18nManager.isRTL ? 'right' : 'left' }}
                onChange={onChangeText}
            />
            {!noIcon &&
                <Icon
                    size={iconsize || 20}
                    containerStyle={iconStyle || styles.iconStyle}
                    color={iconColor || "gray"}
                    name={iconStyle || "downcircleo"}
                    type={iconType || "antdesign"}
                />
            }

        </View>
    )
}
const styles = StyleSheet.create({
    modalSelector: {
        // marginVertical: hp(1.0),
        // height: hp(5.8),
        // paddingVertical: 3,
        // paddingLeft: 15,
        // borderRadius: 5,
        // borderWidth: 0.5,
        // fontSize: 20,


        justifyContent: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
        color: 'black'

    },
    iconStyle: {
        position: 'absolute',
        right: wp(5),
        // top: hp(1),
    }

})
export { ModalSelectorCustom }