import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Screen} from '_components/common';
import {InputWithLabel} from '_components';
import {HorizontalRow} from '_components/HorizontalRow';
import {MY_PROFILE} from '_constants/Screens';
const EditProfile = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <View style={styles.profiletop}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Screenshot_Logo.jpg')}
            />
          </View>
        </View>
        <HorizontalRow />
        <View style={{marginTop: 20}}>
          <InputWithLabel placeholder="Khaled" label="First Name:" />
          <InputWithLabel placeholder="Ammer" label="Last Name:" />
          <InputWithLabel placeholder="Khaled.ammar@gmail.com" label="Email:" />
        </View>
      </View>
      <View key="footer">
        <Button appColor primary onPress={() => navigate(MY_PROFILE)}>
          Save
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default EditProfile;
