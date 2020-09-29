import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {AppText} from './common/AppText';
import {Icon} from 'react-native-elements';

const DashboardComponent = (props) => {
  const {colors} = useTheme();
  const {viewStyle, label, data, renderComponent} = props;

  return (
    <View style={[styles.containerStyle, viewStyle]}>
      <View
        style={{
          flexDirection: 'row',
          borderLeftWidth: 6,
          justifyContent: 'space-between',
          padding: 10,
          borderLeftColor: colors.primary,
        }}>
        <AppText primary bold>
          {label || data.label}
        </AppText>
        <Icon name="rightcircleo" type="antdesign" color={colors.primary} />
      </View>
      {data && (
        <ScrollView
          horizontal
          contentContainerStyle={{flexGrow: 1}}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          scrollEnabled>
          {data.items.map((item) => renderComponent(item))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: 10,
    width: '100%',
  },
});
export {DashboardComponent};
