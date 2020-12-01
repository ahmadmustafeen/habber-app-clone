/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, Image, Platform, I18nManager, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppText, BackgroundImage } from './common';
import { useTheme } from '@react-navigation/native';
import { CART_SCREEN, CARTNEW, SEARCH } from 'constants/Screens';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { shallowEqual, useSelector } from 'react-redux';
const Header = (props) => {
  const { CartReducer } = useSelector((state) => ({
    CartReducer: state.CartReducer,
  }), shallowEqual);
  // console.log("header cart", CartReducer)
  const { colors } = useTheme();
  const {
    navigation,
    title,
    color,
    secondary,
    route: { name },
    headerLeft,
    headerRight,
  } = props;
  const headerColor =
    color || (secondary && colors.secondary) || colors.primary;
  return (
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


      <View style={{ flex: 4, paddingLeft: 10, transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], }}>
        <AppText color={headerColor}>{title || name}</AppText>
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
              <TouchableOpacity onPress={() => {
                navigation.navigate(CART_SCREEN, {
                  label: 'CART_SCREEN',
                  CART_SCREEN,
                  // CARTNEW
                })
              }}>
                <Image
                  source={(CartReducer) ? require("../assets/images/nocart.png") : require("../assets/images/nocart.png")}
                  style={{ marginRight: wp(3) }}

                />
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
              {name !== 'Search' && (
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
  );
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
});
export { Header };
