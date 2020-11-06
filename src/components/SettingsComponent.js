import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { Icon } from 'react-native-elements';
import { HorizontalRow } from './HorizontalRow';

const SettingsComponent = (props) => {
  const { colors } = useTheme();
  const {
    viewStyle,
    label,
    onIconPress,
    iconType,
    iconName,
    rightComponent,

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
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderLeftWidth: 6,
    justifyContent: 'space-between',
    paddingLeft: 30,
    padding: 5,
  },
});
export { SettingsComponent };
