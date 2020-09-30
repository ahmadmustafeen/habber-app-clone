import React from 'react';
import {View, FlatList, StyleSheet, ScrollView} from 'react-native';
import {AppText} from './common';

import {TitleBarWithIcon} from './TitleBarWithIcon';

const DashboardComponent = (props) => {
  const {viewStyle, data, renderComponent} = props;

  return (
    <View style={[styles.containerStyle, viewStyle]}>
      <TitleBarWithIcon {...props} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data.items}
        keyExtractor={(item, index) => index.toString() + item}
        renderItem={(item) => renderComponent(item)}
        ListEmptyComponent={() => (
          <View>
            <AppText>No Book Available</AppText>
          </View>
        )}
        ListFooterComponent={() => <View style={{paddingBottom: 50}} />}
      />
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
