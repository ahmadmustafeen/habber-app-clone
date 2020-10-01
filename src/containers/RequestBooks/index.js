import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {InputWithLabel} from '../../components';
import { Button, AppText,Screen} from '../../components/common';
const RequestBooks = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <InputWithLabel placeholder="Book Title*" required/>
        <InputWithLabel placeholder="Author Name*" required/>
        <Button color="white">
              Upload Image
        </Button>
        <Text style={{marginVertical:10,color:'grey'}}>* 1 Image allowed (PNG,JPEG,JPG) formats ONLY maximum size 5 MB</Text>
      </View>
      <View key="footer">
            <Button color="white" onPress={() => navigate(JOINUS)}>
              Send Request
            </Button>
      </View>
      </Screen>
  );
};

const styles = StyleSheet.create({
  content:{
    marginTop: 50,
  },
});

export default RequestBooks;
