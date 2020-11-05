/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet, Image, ImageBackground, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import {AppText} from './common';
import {useTheme} from '@react-navigation/native';

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
  } = props;
  const headerColor =
    color || (secondary && colors.secondary) || colors.primary;
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
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

      <View style={{flex: 4}}>
        <AppText color={headerColor}>{title || name}</AppText>
      </View>
      <View style={{flex: 1}}>
        {headerRight ? (
          headerRight
        ) : (
          <View style={styles.right}>
            <Icon
              color={headerColor}
              name="shopping-bag"
              type="font-awesome-5"
            />
            <Icon color={headerColor} name="search1" type="antdesign" />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Platform.OS == 'ios' ? 100 : 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 15,
    marginBottom: 5,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
export {Header};
