import React from 'react';
import {
  View,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { AppText } from './common/AppText';
import { Icon } from 'react-native-elements';

const TitleBarWithIcon = (props) => {
  const { colors } = useTheme();
  const {
    viewStyle,
    label,
    onIconPress,
    iconType,
    color,
    iconName,
    noIcon,
    small,
    filter,
    selectedFilter
  } = props;
  const renderFilterIcon = () => {
    if (filter) {

      return filter.length > 0 ?
        <Image source={require("../assets/images/filter.png")} /> :
        <Image source={require("../assets/images/nofilter.png")} />


    }
  }
  console.log("selected", filter)
  return (
    <TouchableOpacity onPress={onIconPress}>
      <View
        style={[
          styles.containerStyle,
          viewStyle,
          {
            borderLeftColor: colors.primary,
            padding: small ? 5 : hp('0.8%'),
            paddingLeft: 10,
            marginVertical: small ? 7 : hp('0.8%'),
          },
        ]}>
        <AppText subheading primary={!color} bold {...props}>
          {label || 'Title'}
        </AppText>
        {!noIcon && (
          <Icon
            name={
              iconName || I18nManager.isRTL ? 'leftcircleo' : 'rightcircleo'
            }
            type={iconType || 'antdesign'}
            color={colors.primary}
          // style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
          />
        )}


        {renderFilterIcon()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderLeftWidth: 6,
    // width: wp(90),
    justifyContent: 'space-between',
  },
});
export { TitleBarWithIcon };
