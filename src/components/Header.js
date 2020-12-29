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

const Header = (props, { adddok }) => {
  const { t } = useTranslation(['Header']);

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
    headerImage,
    cartNumber, onModalPress,
    noTitle,

  } = props;



  const headerColor =
    color || (secondary && colors.secondary) || colors.primary;
  return (headerImage ?
    <ImageBackground
      style={{
        height: hp(21),
        paddingHorizontal: wp(3),
        paddingBottom: hp(8),
        marginBottom: hp(1),
        justifyContent: 'flex-end',
        transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
      }}
      resizeMode="stretch"
      source={require('_assets/images/header.png')}>
      <View style={styles.container}>
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
          <TouchableOpacity onPress={backIcon ? () => navigation.goBack() : () => navigation.openDrawer()} >
            <AppText bold small color={headerColor} >
              {!adddok ? title || t(route.name) : title || t('kkk')}
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
              <View style={styles.right}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(CART_SCREEN, {
                      label: 'CART_SCREEN',
                      CART_SCREEN,
                    });
                  }}>
                  <Image
                    source={
                      cartNumber
                        ? require('../assets/images/filledcart.png')
                        : require('../assets/images/nocart.png')
                    }
                    style={{ marginRight: wp(3) }}
                  />
                  {cartNumber ? (
                    <View style={styles.circle}>
                      <AppText size={13} bold white>
                        {cartNumber}
                      </AppText>
                    </View>
                  ) : null}
                </TouchableOpacity>


                {(!!route && (route.name !== 'Search')) && (
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
    </ImageBackground>
    : (
      <View style={styles.container}>
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
          <AppText bold small color={headerColor}>
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
              <View style={styles.right}>
                <TouchableOpacity
                  onPress={() => {
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
                        : require('../assets/images/nocart.png')
                    }
                    style={{ marginRight: wp(3) }}
                  />
                  {cartNumber ? (
                    <View style={styles.circle}>
                      <AppText size={13} bold white>
                        {cartNumber}
                      </AppText>
                    </View>
                  ) : null}
                </TouchableOpacity>

                {/* <Icon
                onPress={() =>
                  navigation.navigate(CART_SCREEN, {
                    label: 'CART_SCREEN',
                    CART_SCREEN,
                    // CARTNEW
                  })
                }
                color={headerColor}
                name="shopping-bag"
                type="font-awesome-5"
                containerStyle={{ paddingEnd: 10 }}
              /> */}
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
    flexDirection: 'row',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-around',
  },
  circle: {
    position: 'absolute',
    right: wp(3.3),
    top: hp(0),
    width: wp(3),
    height: wp(3),
  },
});
export { Header };
