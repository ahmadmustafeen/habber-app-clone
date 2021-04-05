import React from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, I18nManager } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AppText } from './AppText';
const Button = (props) => {
  const {
    children,
    color,
    onPress,
    background,
    width,
    style,
    round,
    fontSize,
    secondary,
    primary,
    bold,
    borderRadius,
    loading,
    icon,
    outOfStock,
    add,
    inStock,

  } = props;
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: 'center',
          // alignItems: 'center',
          height: 45,
          width: width || '100%',
          borderRadius: round ? 35 : 5,
          backgroundColor: background || colors.primary,
          marginVertical: 3,
        },
        borderRadius && { borderRadius: parseInt(borderRadius) },
        primary && { backgroundColor: colors.primary },
        secondary && { backgroundColor: colors.secondary },
        style,
      ]}
      onPress={onPress}>
      <AppText
        size={fontSize}
        bold={bold}
        // capitalize
        style={{
          textAlign: 'center',
          color: color || 'black',
          fontSize: 20,
          // textTransform: 'capitalize'
        }}>
        {children || 'Button'}
      </AppText>
      {/* please make single component for it */}
      {outOfStock &&
        <View style={{ position: "absolute", left: wp(13), width: 20, height: 25, zIndex: 1, top: hp(1.25) }}>
          <Image style={{ width: "100%", height: "100%" }} source={require("../../assets/images/nocart2.png")} />
        </View>
      }
      {inStock &&
        <View style={{ position: "absolute", left: wp(13), width: 20, aspectRatio: 1, zIndex: 1, top: hp(1.75) }}>
          <Image style={{ width: "100%", height: "100%" }} source={require("../../assets/images/emptycart.png")} />
        </View>
      }
      {add &&
        <View style={{ position: "absolute", left: wp(8), width: wp(5), height: wp(5), zIndex: 1 }}>
          <Image style={{ width: "100%", height: "100%" }} source={require("../../assets/images/adddark.png")} />
        </View>
      }
      {props.icon && <Icon
        size={15}
        containerStyle={styles.iconStyle}
        color="black"
        name={I18nManager.isRTL ? "leftcircleo" : "rightcircleo"}
        type="antdesign"
      />
      }
      <ActivityIndicator
        animating={loading || false}
        size="small"
        color={color || 'white'}
        style={styles.loadingIndicator}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {},
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
  },
  loadingIndicator: {
    position: 'absolute',
    right: 15,
  },
  iconStyle: {
    height: '60%',
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
  }
});
export { Button };
