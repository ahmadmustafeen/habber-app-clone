import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {InputWithLabel} from '_components';
import {Button, AppText} from '_components/common';
import {JOINUS, REQUESTBOOKS} from '_constants/Screens';

const JoinUs = (props) => {
  const {navigate} = props.navigation;
  return (
    <View style={{paddingHorizontal: 25, marginTop: 20}}>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <InputWithLabel
          style={styles.inputfield}
          placeholder="Name*"
          required
        />
        <InputWithLabel placeholder="Email*" required />
        <InputWithLabel placeholder="Mobile Number*" required />
        <AppText style={styles.businesstype}>Select Business Type*</AppText>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Details*"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
        />
        <AppText style={styles.businesstype}>Select Products Type*</AppText>
      </View>
      <View key="footer">
        <Button color="white" onPress={() => navigate(REQUESTBOOKS)}>
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
  },
  businesstype: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    borderColor: 'rgb(221, 221, 221)',
    borderWidth: 3,
    marginVertical: 20,
    textAlignVertical: 'top',
    padding: 10,
  },
});

export default JoinUs;
