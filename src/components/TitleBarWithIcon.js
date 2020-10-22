import React from 'react';
import {View, StyleSheet, I18nManager, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {AppText} from './common/AppText';
import {Icon} from 'react-native-elements';

const TitleBarWithIcon = (props) => {
  const {colors} = useTheme();
  const {viewStyle, label, onIconPress, iconType, iconName} = props;

  return (
    <TouchableOpacity onPress={onIconPress}>
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
          name={iconName || I18nManager.isRTL ? 'leftcircleo' : 'rightcircleo'}
          type={iconType || 'antdesign'}
          color={colors.primary}
          // style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderLeftWidth: 6,
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  },
});
export {TitleBarWithIcon};
