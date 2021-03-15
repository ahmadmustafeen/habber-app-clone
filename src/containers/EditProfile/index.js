import React, { useEffect, useState, } from 'react';
import {
  View,
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
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, validateIsTrue } from '../../helpers/Validators';
import { BackHandler } from 'react-native';




const imageOptions = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const EditProfile = (props) => {

  const handleBackButton = () => {
    props.navigation.goBack()
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, [])

  const { t } = useTranslation('EditProfile');
  const UserProfileReducer = useSelector(
    (state) => state.UserProfileReducer,
    shallowEqual,
  );
  const dispatch = useDispatch();
  console.log(UserProfileReducer, "ADSASD")
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
    // profile_pic: { uri: UserProfileReducer.profile_pic, name: "something", type: "image/jpeg" },
    profile_pic: "",
    language_id: UserProfileReducer.language.iso === "ar" ? 1 : 2,
    currency_id: UserProfileReducer.currency.id,
    token: UserProfileReducer.token,
    flag: false
  });
  const validate = () => {
    //todo - use validation method from src > helpers
    return (
      validateIsTrue(state.first_name, I18nManager.isRTL ? "الرجاء إدخال الاسم الأول" : "Please Enter First Name", false) &&
      validateIsTrue(state.last_name, I18nManager.isRTL ? "الرجاء إدخال الاسم الأخير" : "Please Enter Last Name", false) &&
      validateIsTrue(validateEmail(state.email), I18nManager.isRTL ? "الرجاء إدخال بريد إلكتروني صحيح" : "Please Enter Valid Email", false)
    )

  };
  const { navigate } = props.navigation;
  const setStateHandler = (key, val) => {
    if (key === 'email' || key === 'phone') {
      val = val.replace(" ", "")
    }
    setState({ ...state, [key]: val });
  };
  const save = () => {
    validate() &&
      dispatch(withDataActions(state, 'UPDATE_PROFILE'));
    // navigate(MY_PROFILE)
  };
  const setImage = () => {
    ImagePicker.showImagePicker(imageOptions, (response) => {
      console.log('Response = ', response);
      if (response.fileSize > 5000000) {
        return validateIsTrue(false, I18nManager.isRTL ? "الرجاء تحديد صورة أقل من 5 ميغا بايت" : "Please select a image less than 5MBs", false);
      }
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
  };

  const getProfilePic = (params) => {
    if (state.profile_pic.uri) {
      return { uri: state.profile_pic.uri }
    }
    if (state.flag) {
      return require('_assets/images/noUser.png')
    }
    if (UserProfileReducer.profile_pic !== "") {
      return { uri: UserProfileReducer.profile_pic }
    }

    return require('_assets/images/noUser.png')

  }

  const link = state.profile_pic ? state.profile_pic.uri : UserProfileReducer.profile_pic
  const { colors } = useTheme();
  return (
    <Screen noPadding>

      <View key="header">
        <Header {...props} headerImage backIcon headerLeft />


      </View>
      <View key="content" style={{ flex: 1, width: wp(90), alignSelf: 'center' }} >
        <KeyboardAwareScrollView
          // style={}
          automaticallyAdjustContentInsets={true}
          keyboardDismissMode="on-drag"
          scrollsToTop={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="never"
          bounces={false}
        >
          <View style={styles.profiletop}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={getProfilePic(state.profile_pic)}
              />
            </View>
            <TouchableOpacity style={styles.addIcon} onPress={setImage}>
              <Image style={styles.image} source={require("_assets/images/addsign.png")} />
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', right: wp(0), top: hp(7), width: wp(30), justifyContent: 'center' }}>
            <AppText primary bold small onPress={() => setState({ ...state, flag: true, profile_pic: "" })}>
              {I18nManager.isRTL ? "إعادة تعيين الصورة" : "Reset Image"}
            </AppText>
          </View>
          <HorizontalRow style={[styles.HorizontalRow, { borderBottomColor: colors.borderColor }]} />
          <View style={{ paddingVertical: hp(5) }}>


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
        </KeyboardAwareScrollView>
      </View >


      <View style={[styles.content, { paddingBottom: hp(3) }]} key="footer">
        <Button loading={isLoading} appColor color={"white"} bold primary onPress={() => save()}>
          {t('save')}
        </Button>
      </View>
    </Screen >
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
    // marginTop: hp(-10),
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
