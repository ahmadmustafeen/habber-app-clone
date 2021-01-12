import React from 'react'
import { TouchableOpacity, View, Image, StyleSheet, Dimensions, } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { AppText } from './common';
import { I18nManager } from 'react-native';




const CarasoulRender = ({ item }, width) => {
    console.log(width)
    return (
        <TouchableOpacity key={item.coverImageUri} style={styles.cardContainer}
            onPress={() => {
                navigate(BOOK_DETAILS_SCREEN, {
                    ...item.product,
                    product_type: item.product.product_type
                })
            }
            }>
            <View
                style={{
                    zIndex: 5,
                    width: wp(80),
                    justifyContent: 'space-between',
                    // flexDirection: (I18nManager.isRTL ? 'row-reverse' : 'row'),
                    // flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                    flexDirection: 'row',
                    position: 'absolute',
                    top: hp(2.5),
                    paddingHorizontal: 20,
                }}>
                <Icon
                    color={'white'}
                    size={17}
                    name="left"
                    type="ant-design"
                    onPress={() =>
                        CAROUSEL.current ? CAROUSEL.current.snapToPrev() : null
                    }
                />
                <Icon
                    color={'white'}
                    size={17}
                    name="right"
                    type="ant-design"
                    onPress={() =>
                        CAROUSEL.current ? CAROUSEL.current.snapToNext() : null
                    }
                />
            </View>
            <View style={styles.cardWrapper}>
                <Image style={styles.card} source={{ uri: item.coverImageUri }} />
                <View
                    style={[
                        styles.cornerLabel,
                        { backgroundColor: item.cornerLabelColor },
                    ]}>
                    <AppText style={styles.cornerLabelText}>
                        {item.cornerLabelText}
                    </AppText>
                </View>
            </View>
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    cardWrapper: {
        borderRadius: 5,
        overflow: 'hidden',
    },
    cardContainer: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // width,
        marginBottom: 30,
        marginHorizontal: 10,
    },
    card: {
        // width: width * 0.9,
        // height: width * 0.5,
        width: wp(90),
        height: hp(10)
    },
    cornerLabel: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderTopLeftRadius: 8,
    },
    cornerLabelText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
    },
})

export { CarasoulRender }