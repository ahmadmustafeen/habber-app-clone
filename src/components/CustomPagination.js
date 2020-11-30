import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, StyleSheet } from 'react-native'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CustomPagination = (props) => {
    const { colors } = useTheme();
    const {
        total,
        currentPage,
    } = props;



    const renderDots = () => {
        const Dots = [];
        for (let i = 0; i < total; i += 1) {
            const isActive = currentPage === i + 1;

            const additionalStyle = {
                backgroundColor: isActive ? colors.primary : colors.borderColor,
                marginLeft: i === 0 ? 0 : 8,
            };

            Dots.push((
                <View
                    key={`pagination-dot-${i}`}
                    style={[
                        {
                            width: hp(3),
                            height: 4,
                            borderRadius: 3,
                        },
                        additionalStyle,
                    ]}
                />
            ));
        }
        return Dots;
    };

    return (
        <View
            style={{
                position: 'absolute',
                bottom: '0%',
                left: 0,
                right: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {renderDots()}
        </View>
    );
};
export { CustomPagination }