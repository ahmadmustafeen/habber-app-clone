/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  I18nManager,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AppText } from './common';
import { useTheme } from '@react-navigation/native';
import { CART_SCREEN, SEARCH } from 'constants/Screens';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { HOME } from '../constants/Screens';

const Header = (props, { adddok }) => {
  const { t } = useTranslation(['Header']);

  const {
    CartReducer,
  } = useSelector(
    ({
      CartReducer,
    }) => {
      return {
        CartReducer,
      }
    },
  )
  const qua = CartReducer.book.length + CartReducer.bookmark.length
  // console.log(qua)
  const { colors } = useTheme();
  const {
    navigation,
    title,
    color,
    secondary,
    route,
    // route: { name = "home" },
    // // name = "home",
    headerLeft,
    headerRight,
    backIcon,
    UpperCase,
    headerImage,
    cartNumber, onModalPressOnly,
    onModalPress,
    onCart,
    onSearch,
    noTitle,
    noSearch,
    noCart,
    capitalize, inVoiceBack,

  } = props;



  const headerColor =
    color || (secondary && colors.secondary) || colors.primary;
  return (headerImage ?
    <ImageBackground
      style={{
        // marginTop: hp(-5),
        minHeight: 0,
        height: hp(21),
        paddingVertical: hp(5),
        paddingHorizontal: wp(3),
        paddingBottom: hp(8),
        // marginBottom: hp(1),
        justifyContent: 'flex-end',
      }}
      resizeMode="stretch"
      source={I18nManager.isRTL ? require('_assets/images/header-arabic.png') : require('_assets/images/header.png')}>

      <View style={[styles.container, { transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }]}>
        <View>
          {headerLeft ? (
            headerLeft
          ) : (
            <Icon
              size={20}
              onPress={() => navigation.openDrawer()}
              color={headerColor}
              name="menu"
              type="feather"
            />
          )}
        </View>
        <View>
          {backIcon ? (
            <Icon
              onPress={onModalPress ? onModalPress : () => navigation.goBack()}
              color="#c27e12"
              name="leftcircleo"
              type="ant-design"
            />
          ) : null}
        </View>
        {noTitle || <View
          style={{
            flex: 4,
            width: wp(20),
            paddingLeft: 10,
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],

          }}>
          <TouchableOpacity onPress={backIcon ? () => navigation.goBack() : inVoiceBack ? () => navigation.navigate(HOME) : () => navigation.openDrawer()} >
            <AppText bold small color={headerColor} UpperCase={UpperCase} capitalize={capitalize}  >
              {title || t(route.name)}
            </AppText>
          </TouchableOpacity>

        </View>}

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          {headerRight ? (
            headerRight
          ) : (
            <View style={[styles.right, (!!route && (route.name !== 'Search')) && I18nManager.isRTL && { width: wp(19.5), marginLeft: wp(-2) }]}>
              <TouchableOpacity
                // onPress={() => {

                // navigation.navigate(CART_SCREEN, {
                //   label: 'CART_SCREEN',
                //   CART_SCREEN,
                // });
                // }}
                onPress={
                  onCart ? onCart : () => {
                    navigation.navigate(CART_SCREEN, {
                      label: 'CART_SCREEN',
                      CART_SCREEN,
                    })
                  }
                }
              >
                {!noCart ?

                  <Image
                    source={
                      cartNumber
                        ? require('../assets/images/filledcart.png')
                        : (qua === 0 ? require('../assets/images/emptycart.png') : require('../assets/images/nocart3.png'))
                    }
                    style={{ marginRight: wp(3), marginHorizontal: wp(1) }}
                  /> : null
                }
                {qua ? (
                  <View style={I18nManager.isRTL ? styles.circleArabicCheck : styles.circleCheck}>
                    <AppText style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], }} size={13} bold color={"#0a2937"}>
                      {qua}
                    </AppText>
                  </View>
                ) : null}
              </TouchableOpacity>


              { !noSearch ? (!!route && (route.name !== 'Search')) && (
                <Icon
                  props={props}
                  onPress={onSearch ? onSearch : () =>
                    navigation.navigate(SEARCH, { label: 'SEARCH', SEARCH })
                  }
                  color={headerColor}
                  name="search1"
                  type="antdesign"
                />
              ) : null}
            </View>
          )}
        </View>
      </View>
    </ImageBackground >
    : (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <View>
          {headerLeft ? (
            headerLeft
          ) : (
            <Icon
              onPress={() => navigation.openDrawer()}
              color={headerColor}
              name="menu"
              type="feather"
            />
          )}
        </View>
        <View>
          {backIcon ? (
            <Icon
              onPress={() => props.navigation.goBack()}
              color={colors.primary}
              name="leftcircleo"
              type="ant-design"
            />
          ) : null}
        </View>

        <View
          style={{
            flex: 4,
            paddingLeft: 10,
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],

          }}>
          <AppText style={{ width: wp(50) }} bold small color={headerColor}>
            {title || t(route.name)}
          </AppText>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',

          }}>
          {headerRight ? (
            headerRight
          ) : (
            <View style={[styles.right,]}>
              <TouchableOpacity onPress={() => {
                navigation.navigate(CART_SCREEN, {
                  label: 'CART_SCREEN',
                  CART_SCREEN,
                  // CARTNEW
                });
              }}>
                <Image
                  source={
                    cartNumber
                      ? require('../assets/images/filledcart.png')
                      : (qua !== 0 ? require('../assets/images/nocart.png') : require('../assets/images/nocart.png'))
                  }
                />
                {qua ? (
                  <View style={I18nManager.isRTL ? styles.circleArabic : styles.circle}>
                    <AppText size={13} style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], }} bold white>
                      {qua}
                    </AppText>
                  </View>
                ) : <View style={I18nManager.isRTL ? styles.circleArabic : styles.circle}>
                  <AppText style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], }} size={13} bold white>
                    {0}
                  </AppText>
                </View>}
              </TouchableOpacity>


              {(!!route && route.name) !== 'Search' && (
                <Icon
                  props={props}
                  onPress={() =>
                    navigation.navigate(SEARCH, { label: 'SEARCH', SEARCH })
                  }
                  color={headerColor}
                  name="search1"
                  type="antdesign"
                />
              )}
            </View>
          )}
        </View>
      </View>
    )
  )

};
const styles = StyleSheet.create({
  container: {
    height: Platform.OS == 'ios' ? 75 : 60,
    flexDirection: 'row',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 5,
    marginBottom: 5,
  },
  right: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-around',
    // width: wp(50),
    // backgroundColor: 'red',

  },
  circle: {
    position: 'absolute',
    right: wp(1.6),
    top: hp(0.1),
    width: wp(2.5),
    // height: wp(4.5),
  },
  circleArabic: {
    position: 'absolute',
    // right: wp(4.0),
    left: wp(1.0),
    top: hp(0.2),
    width: wp(3),
    // height: wp(3),
  },
  circleCheck: {
    position: 'absolute',
    right: wp(4.6),
    top: hp(0.1),
    width: wp(2.5),
    // height: wp(4.5),
  },
  circleArabicCheck: {
    position: 'absolute',
    // right: wp(4.0),
    left: wp(1.9),
    top: hp(0.2),
    width: wp(3),
    // height: wp(3),
  },
});
export { Header };
