import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { I18nManager } from 'react-native';
import { Platform } from 'react-native';

const AppText = (props) => {
  const { colors } = useTheme();
  const {
    children,
    heading,
    bold,
    secondary,
    primary,
    style,
    underline,
    size,
    center,
    UpperCase,
    right,
    color,
    white,
    small,
    icon,
    iconName,
    iconType,
    iconsize,
    iconColor,
    iconStyle,
    subheading,
    capitalize
  } = props;

  return (
    <>

      {icon && <Icon
        size={iconsize || 15}
        containerStyle={iconStyle || styles.iconStyle}
        color={iconColor || "black"}
        name={iconName || "rightcircleo"}
        type={iconType || "antdesign"}
      />
      }
      <Text

        {...props}
        style={[
          styles.TextStyle,
          style && style,
          UpperCase && { textTransform: 'uppercase' },
          heading && { fontSize: 30 },
          bold && { fontWeight: 'bold' },
          color && { color },
          secondary && { color: colors.secondary },
          primary && { color: colors.primary },
          white && { color: colors.white },
          underline && { textDecorationLine: 'underline' },

          center && { textAlign: 'center' },
          right && { textAlign: 'right' },
          small && { fontSize: 17 },
          subheading && { fontSize: 20 },
          size && { fontSize: parseInt(size) },
          capitalize && { textTransform: 'capitalize' },
          // { fontFamily: 'Amiri-Regular' }
          (I18nManager.isRTL) && { fontFamily: 'Amiri-Regular' }
        ]}

      >
        {children}
      </Text>
    </>
  );
};
const styles = StyleSheet.create({
  TextStyle: {
    // fontSize: 20,
    fontSize: hp(2.6),
    color: 'black',
    textAlign: 'left',

  },
  iconStyle: {
    top: -15,
    height: 20,
    zIndex: 999,
    position: 'absolute',
    right: 70,
    justifyContent: 'center',
  }
});
export { AppText };
