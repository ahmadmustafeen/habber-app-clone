import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {AppText} from './common/AppText';
import {Icon} from 'react-native-elements';

const TitleBarWithIcon = (props) => {
  const {colors} = useTheme();
  const {viewStyle, label, onIconPress, iconType, iconName} = props;

  return (
    <View
      style={[
        styles.containerStyle,
        viewStyle,
        {borderLeftColor: colors.primary},
      ]}>
      <AppText primary bold>
        {label || 'Title'}
      </AppText>
      <Icon
        onPress={onIconPress}
        name={iconName || 'rightcircleo'}
        type={iconType || 'antdesign'}
        color={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderLeftWidth: 6,
    justifyContent: 'space-between',
    padding: 10,
  },
});
export {TitleBarWithIcon};
