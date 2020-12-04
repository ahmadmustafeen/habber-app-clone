import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { Icon } from 'react-native-elements';
import { HorizontalRow } from './HorizontalRow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SettingsComponent = (props) => {
  const { colors } = useTheme();
  const {
    viewStyle,
    label,
    onIconPress,
    iconType,
    iconName,
    rightComponent,
    Currency
  } = props;

  return (
    <View>
      <View
        style={[
          styles.containerStyle,
          viewStyle,
          { borderLeftColor: colors.primary },
        ]}>
        <AppText bold>{label || 'Title'}</AppText>
        {Currency ? <AppText primary style={{ marginLeft: wp(-30), alignSelf: 'center' }}>{Currency}</AppText> : null}


        {rightComponent ? (
          rightComponent
        ) : (
            <Icon
              onPress={onIconPress}
              name={iconName || 'rightcircleo'}
              type={iconType || 'antdesign'}
              color={colors.primary}
            />
          )}
      </View>
      <HorizontalRow />
    </View >
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderLeftWidth: 6,
    justifyContent: 'space-between',
    paddingLeft: 30,
    padding: 5,
    alignItems: 'center'
  },
});
export { SettingsComponent };
