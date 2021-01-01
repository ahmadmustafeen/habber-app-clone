import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { withDataActions } from '_redux/actions';
import { Button, Screen } from '_components/common';
import { InputWithLabel } from '_components';
import { HorizontalRow } from '_components/HorizontalRow';
import { Header } from '_components/Header';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { validatePhone } from '_helpers/Validators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AppText } from '../../components/common';
import { UPDATE_PROFILE } from '../../redux/actionTypes';
import { checkIfLoading } from '../../redux/selectors';

const imageOptions = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const EditProfile = (props) => {
  const { t } = useTranslation('EditProfile');
  const UserProfileReducer = useSelector(
    (state) => state.UserProfileReducer,
    shallowEqual,
  );
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(
        state,
        UPDATE_PROFILE,
      )
    };
  }, shallowEqual);
  const [state, setState] = useState({
    first_name: UserProfileReducer.first_name,
    last_name: UserProfileReducer.last_name,
    email: UserProfileReducer.email,
    profile_pic: UserProfileReducer.profile_pic,
    language_id: UserProfileReducer.language.id,
    currency_id: 2,
    token: UserProfileReducer.token,
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
        setStateHandler('profile_pic', {
          uri: Platform.OS == 'ios' ? response.uri.replace("file://", "/private") : response.uri,

          type: response.type,
          name: Platform.OS == 'ios' ? "placeholder_text" : response.fileName,
        });

      }
    });
  }; getProfilePic = () => {
    if (state.profile_pic.uri) {
      return { uri: state.profile_pic.uri }
    }
    if (UserProfileReducer.profile_pic) {
      return { uri: UserProfileReducer.profile_pic }
    }
    return require('_assets/images/noUser.png')

  }

  const link = state.profile_pic ? state.profile_pic.uri : UserProfileReducer.profile_pic
  const { colors } = useTheme();
  return (
    <ScrollView>

      <View key="header">
        <Header {...props} headerImage />
      </View>
      <View key="content" style={styles.content}>
        <View style={styles.profiletop}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={getProfilePic()}
            />
          </View>
          <TouchableOpacity style={styles.addIcon} onPress={setImage}>
            <Image style={styles.image} source={require("_assets/images/addsign.png")} />
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', right: 0, top: hp(8) }}>
          <AppText primary onPress={() => setState({ ...state, profile_pic: '' })}>
            Reset Image
          </AppText>
        </View>
        <HorizontalRow style={[styles.HorizontalRow, { borderBottomColor: colors.borderColor }]} />
        <View style={{ marginTop: 20 }}>

          <InputWithLabel

            style={{ margin: hp(0), padding: hp(0), backgroundColor: 'red' }}

            color="black"
            value={state.first_name}
            placeholder="Khaled"
            label={t('firstName')}
            onChangeText={(val) => setStateHandler('first_name', val)}
          />
          <InputWithLabel
            color="black"
            value={state.last_name}
            placeholder="Ammer"
            label={t("lastName")}
            onChangeText={(val) => setStateHandler('last_name', val)}
          />
          <InputWithLabel
            color="black"
            value={state.email}
            placeholder="Khaled.ammar@gmail.com"
            label={t('phone')}
            onChangeText={(val) => setStateHandler('email', val)}
          />
        </View>
      </View>


      <View style={[styles.content, { marginTop: hp(10) }]}>
        <Button loading={isLoading} appColor primary onPress={() => save()}>
          {t('save')}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: hp(12),
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2,
    overflow: 'hidden',
  },
  HorizontalRow: {
    borderBottomWidth: hp(0.1),

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
  imageBackground: {
    height: hp(21),
    paddingHorizontal: wp(3),
    paddingBottom: hp(8),
    marginBottom: hp(1),
    justifyContent: 'flex-end',
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  content: {
    width: wp(90),
    alignSelf: 'center',
  },
  button: {
    marginTop: hp(-10),
  },
  addIcon: {
    position: 'absolute',
    width: wp(7),
    zIndex: 999,
    height: wp(7),
    bottom: hp(-1.75),
    right: wp(41.5),
  },
});

export default EditProfile;
