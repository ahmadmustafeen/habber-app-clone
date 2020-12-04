import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { withDataActions } from '_redux/actions';
import { Button, Screen } from '_components/common';
import { InputWithLabel } from '_components';
import { HorizontalRow } from '_components/HorizontalRow';
import { MY_PROFILE } from '_constants/Screens';
import { Header } from '_components/Header';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { validatePhone } from '_helpers/Validators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const imageOptions = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const EditProfile = (props) => {

  const UserProfileReducer = useSelector((state) => state.UserProfileReducer, shallowEqual);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    first_name: UserProfileReducer.first_name,
    last_name: UserProfileReducer.last_name,
    phone: UserProfileReducer.phone,
    profile_pic: UserProfileReducer.profile_pic,
    language_id: UserProfileReducer.language.id,
    currency_id: 2,
  });
  const validate = () => {
    //todo - use validation method from src > helpers
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
    dispatch(withDataActions(state, 'UPDATE_PROFILE'));
    // navigate(MY_PROFILE)
  };
  const setImage = () => {
    ImagePicker.showImagePicker(imageOptions, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setStateHandler('profile_pic', response.uri);

        console.log("PROFILE", response.uri)
      }
    });
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
        resizeMode="stretch"
        source={require('_assets/images/header.png')}>
        <Header {...props} title={'Edit Profile'} />
      </ImageBackground>
      <Screen>
        <View key="header"></View>
        <View key="content" style={styles.content}>
          <View style={styles.profiletop}>
            <TouchableOpacity style={styles.imgContainer} onPress={setImage}>
              <Image
                style={styles.image}
                source={require('../../assets/images/Screenshot_Logo.jpg')}
              />
            </TouchableOpacity>
          </View>
          <HorizontalRow />
          <View style={{ marginTop: 20 }}>
            <InputWithLabel
              color={'black'}
              value={state.first_name}
              placeholder="Khaled"
              label="First Name:"
              onChangeText={(val) => setStateHandler('first_name', val)}
            />
            <InputWithLabel
              color={'black'}
              value={state.last_name}
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
