import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  I18nManager,
  Linking,
  Platform,
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONTACT_US } from '_assets/data/StaticData';
import { withDataActions } from '_redux/actions';
import { SUBMIT_CONTACT_US } from '_redux/actionTypes';
import useModal from '_utils/customHooks/useModal';
import { checkIfLoading } from '_redux/selectors';
import { validatePhone, validateEmail, validateIsTrue } from '_helpers/Validators';
import {
  ModalScreen,
  InputWithLabel,
  Header,
  TextWithIcon,
  FloatingActionButton
} from '../../components';
import { AppText, Button, Screen } from '../../components/common';
import { useTranslation } from 'react-i18next';
import { combineEpics } from 'redux-observable';
import { BackHandler } from 'react-native';
import { Keyboard } from 'react-native';

// export const CONTACT_US = {
//   modalData: {
//     heading: isRTL ? 'We Will Contact You Shortly!' : 'عناويني',
//     description: 'Your Contact Request Submission Form is submitted Successfully',
//     buttonLabel: 'Continue',
//   },
// };

const ContactUs = (props) => {
  // console.log(FetchSiteReducer.phone_no)
  const { t } = useTranslation(['ContactUs'])
  const { visible, toggleModal } = useModal();
  const onContinue = () => {
    toggleModal();
    props.navigation.goBack();
  };
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
    whataap_number: "223232323232"
  });
  const { isLoading, FetchSiteReducer } = useSelector((state) => {
    return {
      FetchSiteReducer: state.FetchSiteReducer,
      isLoading: checkIfLoading(state, SUBMIT_CONTACT_US),
    };
  }, shallowEqual);
  const Phone_Number_footer = FetchSiteReducer.phone_no
  const support_chat = FetchSiteReducer.whatsaap_number;
  var resookkk = String(support_chat);
  var resoo = String(Phone_Number_footer);

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

  // var res = resoo

  // const checckk = Number(pjooo)
  // { checckk.length === 4 ? checckk + " " : checckk }
  // console.log(resookkk)

  const setStateHandler = (key, val) => {
    if (key === 'email' || key === 'phone') {
      val = val.replace(" ", "")
    }
    setState({ ...state, [key]: val });

  };
  // const validate = () => {
  //   if (!state.name) {
  //     Alert.alert(`${t('Please')}  ${t('name')}`);
  //     return false;
  //   }
  //   if (!validateEmail(state.email)) {
  //     Alert.alert('Invalid Email');
  //     return false;
  //   }
  //   if (!state.message) {
  //     Alert.alert('Please Enter Message');
  //     return false;
  //   }

  //   return true;



  // };
  const validate = () => {
    return (

      validateIsTrue(state.name, `${t('Please')} ${t('name')}`, false, t('ok')) &&
      validateIsTrue(state.email, `${t('Please')} ${t('email')}`, false, t('ok')) &&
      validateIsTrue(validateEmail(state.email), I18nManager.isRTL ? ("يرجى إدخال بريد إلكتروني صالح") : "Kindly enter a valid email", false, t('ok')) &&




      validateIsTrue(((state.phone.length === 0) || validatePhone(state.phone)),
        I18nManager.isRTL ? "يجب أن يتراوح رقم الهاتف بين 11 رقمًا و 15 رقمًا" : "Phone Number should be between 11 digits to 15 digits", false)

      && validateIsTrue(state.message.trim().length, `${t('Please')} ${t('message')}`, false, t('ok'))
    )




  };
  const _keyboardDidHide = () => {
    Keyboard.dismiss()
  }
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      keyboardDidHideListener.remove();
    }
  }, []);
  const onSubmit = () => {
    validate() && dispatch(withDataActions(state, SUBMIT_CONTACT_US));
  };
  const { colors } = useTheme();
  return (
    <>
      <Screen noPadding>
        <View key="header">


          <Header
            headerLeft
            backIcon
            headerImage
            {...props} />

        </View>
        <View key="content" >
          <View style={styles.content}>
            <InputWithLabel
              containerStyle={styles.inputWithLabel}
              borderColor={colors.borderColor}
              color={"black"}
              placeholder={t('Namestaric')}
              required
              value={state.name}
              onChangeText={(val) => setStateHandler('name', val)}
            />
            <InputWithLabel
              borderColor={colors.borderColor}
              containerStyle={styles.inputWithLabel}
              placeholder={t('emailstaric')}
              required
              color={"black"}
              value={state.email}
              onChangeText={(val) => setStateHandler('email', val)}
            />
            <InputWithLabel
              borderColor={colors.borderColor}
              containerStyle={styles.inputWithLabel}
              placeholder={t('mobileNumberOptional')}
              color={"black"}
              required
              value={state.phone}
              onChangeText={(val) => setStateHandler('phone', (val.length == 4 ? val + " " : val))}
            />
            <TextInput

              style={[styles.textArea, I18nManager.isRTL && { textAlign: 'right' }]}
              underlineColorAndroid="transparent"
              placeholder={t('Messangestaric')}
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline
              value={state.message}
              onChangeText={(val) => setStateHandler('message', val)}
            />
            <ModalScreen
              headerLeft
              // image={require("")}
              visible={visible}
              onContinue={onContinue}
              {...CONTACT_US.modalData}
            />
            <Button color="white"
              bold
              onPress={onSubmit}
              loading={isLoading}
              style={{
                width: wp(90),
                alignSelf: 'center',
                marginTop: hp(3)
              }}>
              {t('Submit')}
            </Button>
            {/* {/* </View> */}
          </View>
          <ImageBackground
            style={{
              marginTop: hp(4),
              height: hp(28),
              paddingHorizontal: wp(3),
              paddingBottom: hp(2),
              justifyContent: 'flex-end',
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
            }}
            resizeMode='stretch'
            source={require('_assets/images/footer.png')}>

            <View style={[styles.textwithIconContainer, { transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], }, I18nManager.isRTL && {
              // marginTop: hp(10.0),
              width: wp(75)
            }]}>

              <TextWithIcon
                size={13}
                iconName="whatsapp"
                iconType="font-awesome"
                iconSize={18}
                title={t('supportChat')}
                value={`${resookkk.substr(0, 4) + " " + resookkk.substr(4)}`}
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=""&phone=${FetchSiteReducer.whatsaap_number}`,
                  ).catch((err) => console.log('Err', err))
                }
              />

              <TextWithIcon
                size={13}
                iconName="phone-call"
                iconType="feather"
                iconSize={18}
                title={t('phoneNumber')}
                // value={(Number(FetchSiteReducer.phone_no))}
                // value={FetchSiteReducer.phone_no == 5 ? FetchSiteReducer.phone_no + " " : FetchSiteReducer.phone_no}
                value={`${resoo.substr(0, 4) + " " + resoo.substr(4)}`}

                onPress={() =>
                  Platform.OS === 'ios'
                    ? Linking.openURL(`telprompt:${FetchSiteReducer.phone_no}`)
                    : Linking.openURL(`tel:${FetchSiteReducer.phone_no}`)
                }
              />
              <TextWithIcon
                size={13}
                iconName="mail"
                iconType="octicons"
                iconSize={18}
                onPress={() =>
                  Linking.openURL(`mailto:${FetchSiteReducer.email}`)
                }
                title={t('displayEmail')}
                value={FetchSiteReducer.email}
              />
            </View>
          </ImageBackground>

        </View>

      </Screen>
      {/* <FloatingActionButton image={require("_assets/images/fab.png")} onPress={() => console.log("presses")} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: hp(2),
    width: wp(90),
    alignSelf: 'center',
  },
  businesstype: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  textArea: {
    height: hp(20),
    justifyContent: 'flex-start',
    borderColor: 'rgb(221, 221, 221)',
    borderWidth: 3,
    marginVertical: hp(0.5),
    textAlignVertical: 'top',
    padding: 10,
  },
  textwithIconContainer: {
    flex: 1,
    marginTop: hp(13.5),
    width: wp(70),
    alignSelf: 'center'
  },
  inputWithLabel: {
    marginVertical: hp(0.5),
    height: hp(7)
  }
});

export default ContactUs;
