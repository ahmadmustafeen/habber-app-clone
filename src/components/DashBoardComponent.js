import React from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { AppText } from './common';

import { TitleBarWithIcon } from './TitleBarWithIcon';

const DashboardComponent = (props) => {
  const { containerStyle, data, renderComponent, noTitle } = props;

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {noTitle || <TitleBarWithIcon {...props} />}
      <FlatList
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString() + item}
        renderItem={(item) => renderComponent(item)}
        ListEmptyComponent={() => (
          <View>
            <AppText>No Book Available</AppText>
          </View>
        )}
        ListFooterComponent={() => <View style={{ paddingBottom: 50 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: 10,
    width: '100%',
  },
  flatlist: {
    marginLeft: 9,
  }
});
export { DashboardComponent };
