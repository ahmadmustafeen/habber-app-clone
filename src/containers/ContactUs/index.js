import React, { useState } from 'react';
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
import { validatePhone, validateEmail } from '_helpers/Validators';
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

const ContactUs = (props) => {
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
  const pjooo = FetchSiteReducer
  console.log(pjooo)

  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
    // $("key[name='phone']").keyup(function() {
    //   var curchr = value.length;
    //   var curval = $(this).val();
    //   if (curchr == 1) {
    //       $("input[name='phone']").val("" + curval + "" + " ");
    //   } else if (curchr == 4) {
    //       $("input[name='phone']").val(curval + " ");
    //   }else if (curchr == 8) { 
    //       $("input[name='phone']").val(curval + " ");
    //   }
  };
  const validate = () => {
    if (!state.name) {
      Alert.alert('Please Enter Name');
      return false;
    }
    if (!validateEmail(state.email)) {
      Alert.alert('Invalid Email');
      return false;
    }
    if (!state.message) {
      Alert.alert('Please Enter Message');
      return false;
    }

    return true;
  };

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
        <View key="content" style={styles.content}>
          <InputWithLabel
            containerStyle={styles.inputWithLabel}
            borderColor={colors.borderColor}
            color={"black"}
            placeholder={t('name')}
            required
            value={state.name}
            onChangeText={(val) => setStateHandler('name', val)}
          />
          <InputWithLabel
            borderColor={colors.borderColor}
            containerStyle={styles.inputWithLabel}
            placeholder={t('email')}
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

            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder={t('message')}
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline
            value={state.message}
            onChangeText={(val) => setStateHandler('message', val)}
          />
          <ModalScreen
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
        </View>
        <View key="footer"  >
          <ImageBackground
            style={{
              marginTop: hp(4),
              height: hp(28),
              paddingHorizontal: wp(3),
              // paddingBottom: hp(2),
              justifyContent: 'flex-end',
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
            }}
            resizeMode='stretch'
            source={require('_assets/images/footer.png')}>

            <View style={[styles.textwithIconContainer, { transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }]}>

              <TextWithIcon
                small
                iconName="whatsapp"
                iconType="font-awesome"
                iconSize={23}
                title={t('supportChat')}
                value={FetchSiteReducer.whatsaap_number}
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=""&phone=${FetchSiteReducer.whatsaap_number}`,
                  ).catch((err) => console.log('Err', err))
                }
              />
              <TextWithIcon
                small
                iconName="phone-call"
                iconType="feather"
                iconSize={23}
                title={t('phoneNumber')}
                value={FetchSiteReducer.phone_no}
                onPress={() =>
                  Platform.OS === 'ios'
                    ? Linking.openURL(`telprompt:${FetchSiteReducer.phone_no}`)
                    : Linking.openURL(`tel:${FetchSiteReducer.phone_no}`)
                }
              />
              <TextWithIcon
                small
                iconName="mail"
                iconType="octicons"
                iconSize={23}
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
