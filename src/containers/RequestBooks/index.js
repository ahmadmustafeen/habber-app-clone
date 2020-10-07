import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {InputWithLabel} from '_components';
import {Button, AppText, Screen} from '_components/common';
const RequestBooks = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <InputWithLabel placeholder="Book Title*" required />
        <InputWithLabel placeholder="Author Name*" required />
        <Button primary>Upload Image</Button>
        <AppText size={15} style={styles.txt}>
          * 1 Image allowed (PNG,JPEG,JPG) formats ONLY maximum size 5 MB
        </AppText>
      </View>
      <View key="footer">
        <Button primary onPress={() => navigate(JOINUS)}>
          Send Request
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  txt: {
    marginVertical: 10,
    color: 'grey',
  },
});

export default RequestBooks;
