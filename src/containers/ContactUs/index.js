import React from 'react';
import {View,TextInput, StyleSheet} from 'react-native';
import {InputWithLabel} from '../../components';
import {Button, AppText,Screen} from '../../components/common';
import Header from '../../components/Header';

const ContactUs = (props) => {
  return (
    <View>
    <Header {...props} title={"Contact Us"} />
    <Screen>
      <View key="content" style={styles.content}>
        <InputWithLabel style={styles.inputfield} placeholder="Name*" required/>
        <InputWithLabel placeholder="Email*" required/>
        <InputWithLabel placeholder="Mobile Number (optional)" required/>
        <TextInput
         style={styles.textArea}
         underlineColorAndroid="transparent"
         placeholder="Message*"
         placeholderTextColor="grey"
         numberOfLines={10}
         multiline={true}
        />
      </View>
      <View key="footer">
            <Button color="white">
              Submit
            </Button>
      </View>
    </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  content:{
    marginTop: 50,
  },
  businesstype:{
      color:'black',
      fontSize: 18,
      marginLeft:10
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    borderColor:'rgb(221, 221, 221)',
    borderWidth:3,
    marginVertical:20,
    textAlignVertical:'top', 
    padding: 10
  }
});

export default ContactUs;
