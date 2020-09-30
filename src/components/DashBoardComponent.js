import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {TitleBarWithIcon} from './TitleBarWithIcon';

const DashboardComponent = (props) => {
  const {viewStyle, data, renderComponent} = props;

  return (
    <View style={[styles.containerStyle, viewStyle]}>
      <TitleBarWithIcon {...props} />
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
