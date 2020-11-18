/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  ImageBackground,
  I18nManager,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon} from 'react-native-elements';
import {AppText, BackgroundImage} from './common';
import {useTheme} from '@react-navigation/native';
import {CART_SCREEN, SEARCH} from 'constants/Screens';

const Header = (props) => {
  const {colors} = useTheme();
  const {
    navigation,
    title,
    color,
    secondary,
    route: {name},
    headerLeft,
    headerRight,
    noTitle,
  } = props;
  const headerColor =
    color || (secondary && colors.secondary) || colors.primary;
  return (
    <ImageBackground
      {...props}
      style={styles.bgImage}
      resizeMode={'stretch'}
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

        <View style={{flex: 4, paddingLeft: 10}}>
          {!noTitle && <AppText color={headerColor}>{title || name}</AppText>}
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {headerRight ? (
            headerRight
          ) : (
            <View style={styles.right}>
              <Icon
                onPress={() =>
                  navigation.navigate(CART_SCREEN, {
                    label: 'CART_SCREEN',
                    CART_SCREEN,
                  })
                }
                color={headerColor}
                name="shopping-bag"
                type="font-awesome-5"
              />
              {name !== 'Search' && (
                <Icon
                  props={props}
                  onPress={() =>
                    navigation.navigate(SEARCH, {label: 'SEARCH', SEARCH})
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
  );
};
const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  container: {
    height: Platform.OS == 'ios' ? hp(31) : hp(22),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingBottom: 5,
    // marginBottom: 5,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
export {Header};
