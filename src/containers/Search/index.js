import {Header} from '_components';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';

import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Screen} from '_components/common';
import {useTheme} from '@react-navigation/native';

const Search = (props) => {
  const {navigate} = props.navigation;
  const {colors} = useTheme();
  return (
    <Screen noPadding>
      <View
        key="header"
        style={{backgroundColor: colors.secondary, padding: 10}}>
        <Header {...props} />
        <View>
          <TextInput style={styles.textInput} placeholder="Search keyword" />
          <Icon
            containerStyle={styles.iconStyle}
            name="search1"
            type="antdesign"
          />
        </View>
      </View>
      <View key="content"></View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  textInput: {
    height: 45,
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    color: '#000000',
    backgroundColor: '#fff',
  },
  iconStyle: {
    height: '100%',
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
  },
});
export default Search;
