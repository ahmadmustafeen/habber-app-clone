import React from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import { AppText, Button,Screen} from '../../components/common';
import {InputWithLabel} from '../../components';
import { MY_PROFILE } from '../../constants/Screens';
const EditProfile = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <View style={{flexDirection: 'row',justifyContent:'center',marginBottom:20}}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Screenshot_Logo.jpg')}
        />
        </View>
        <View
         style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 0.4,
          }}
        />
        <View style={{marginTop:20}}>
        <InputWithLabel placeholder="Khaled" label="First Name:"/>
        <InputWithLabel placeholder="Ammer" label="Last Name:"/>
        <InputWithLabel placeholder="Khaled.ammar@gmail.com" label="Email:"/>
        </View>
      </View>
      <View key="footer">
            <Button color="white" onPress={() => navigate(MY_PROFILE)}>
              Save
            </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content:{
    marginTop: 50,
  },
  image: {
    width: '30%',
    borderRadius: 400/ 2,
  },
});

export default EditProfile;
