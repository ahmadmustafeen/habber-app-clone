import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import { AppText } from '_components/common'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { I18nManager } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';

const FilterChip = (props) => {



    const {
        FilterGenreReducer,

    } = useSelector((state) => {
        return {
            FilterGenreReducer: state.FilterGenreReducer,
        }
    }, shallowEqual);

    const { colors } = useTheme()
    const { filter, onIconPress, onCrossPress } = props
    const removeFilter = (item) => {
        filter.splice(filter.findIndex((filter) => filter === item), 1)
        return filter
    }
    const { t } = useTranslation(["Filter"])
    // console.log(item, "FILTER CHIP")
    return (
        <View style={styles.filterApply}>
            {filter.map((item) =>


                <View key={item} style={[styles.filterView, { backgroundColor: colors.borderColor }]} >
                    <AppText size={13} style={{ marginRight: 16 }} capitalize>
                        {I18nManager.isRTL ? FilterGenreReducer.find((filter) => filter.title == item).arabic_title : item}
                    </AppText>
                    <TouchableOpacity style={styles.filterCross} onPress={() => props.onCrossPress(item)} >
                        <Image source={require('_assets/images/remove.png')} />
                    </TouchableOpacity>
                </View>
            )

            }

        </View>
    )
}
const styles = StyleSheet.create({
    filterApply: {
        flexDirection: 'row',
        alignSelf: "center",
        flexWrap: "wrap",
        width: wp(90),
        justifyContent: 'center',

    },
    filterView: {
        flexDirection: 'row',
        width: wp(35),
        marginHorizontal: wp(3),
        marginVertical: hp(1),
        paddingVertical: 10,
        borderRadius: wp(10),
        justifyContent: "center",
        alignItems: 'center'
    }
    ,
    filterCross: {
        position: "absolute",
        right: 10
    }

})
export { FilterChip };