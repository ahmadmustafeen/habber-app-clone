import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Alert, ImageBackground, I18nManager } from 'react-native';
import { withDataActions } from '_redux/actions';
import { Button, Screen } from '_components/common';
import { InputWithLabel } from '_components';
import { HorizontalRow } from '_components/HorizontalRow';
import { MY_PROFILE } from '_constants/Screens';
import { Header } from '_components/Header';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { validatePhone } from 'helpers/Validators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const EditProfile = (props) => {
  const { UserProfileReducer } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
    };
  }, shallowEqual);

  const dispatch = useDispatch();
  const [state, setState] = useState({
    first_name: 'bye',
    last_name: 'hi',
    phone: '1111111134233',
    profile_pic: '',
    language_id: 1,
    currency_id: 2,
  });
  const validate = () => {
    if (!state.first_name) {
      Alert.alert('Please Enter First Name');
      return false;
    }
    if (!state.last_name) {
      Alert.alert('Please Enter Second Name');
      return false;
    }
    if (!validatePhone(state.phone)) {
      Alert.alert('Invalid Phone');
      return false;
    }
    return true;
  };
  const { navigate } = props.navigation;
  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
  };
  const save = () => {
    // validate() &&
    console.log('PRESSED');
    dispatch(withDataActions([state, UserProfileReducer.id], 'UPDATE_PROFILE'));
    // navigate(MY_PROFILE)
  };
  return (
    <ScrollView>
      <ImageBackground
        style={{
          height: hp(21),
          paddingHorizontal: wp(3),
          paddingBottom: hp(8),
          marginBottom: hp(1),
          justifyContent: 'flex-end',
          transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
        }}
        resizeMode='stretch'
        source={require('_assets/images/header.png')}>

        <Header {...props} title={'Edit Profile'} />


      </ImageBackground>
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
          <View style={{ marginTop: 20 }}>
            <InputWithLabel
              color={'black'}
              value={state.firstName}
              placeholder="Khaled"
              label="First Name:"
              onChangeText={(val) => setStateHandler('first_name', val)}
            />
            <InputWithLabel
              color={'black'}
              value={state.lastName}
              placeholder="Ammer"
              label="Last Name:"
              onChangeText={(val) => setStateHandler('last_name', val)}
            />
            <InputWithLabel
              color={'black'}
              value={state.phone}
              placeholder="Khaled.ammar@gmail.com"
              label="Phone:"
              onChangeText={(val) => setStateHandler('phone', val)}
            />
          </View>
        </View>
        <View key="footer">
          <Button appColor primary onPress={() => save()}>
            Save
          </Button>
        </View>
      </Screen>
    </ScrollView>
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
