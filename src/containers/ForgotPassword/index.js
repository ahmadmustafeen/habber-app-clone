import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
// import {forgotPassword} from '_assets/data/StaticData';
import { InputWithLabel, ModalScreen, AuthHeader } from '_components';
import { AppText, BackgroundImage, Button } from '_components/common';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { FORGOT_PASSWORD } from '_redux/actionTypes';
import { withDataActions } from '_redux/actions';
import { checkIfLoading } from '_redux/selectors';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  validateEmail,
} from '_helpers/Validators';
import useModal from '_utils/customHooks/useModal';
import { ImageBackground } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { validateIsTrue } from '../../helpers/Validators';
import { I18nManager } from 'react-native';
const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const { visible, toggleModal } = useModal();

  const { t } = useTranslation(['forgotPassword']);
  const { navigate } = props.navigation;
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    (!validateEmail(email)) ? validateIsTrue(validateEmail(email), I18nManager.isRTL ? "يرجى إدخال البريد الإلكتروني الصحيح" : "Please Enter a Valid Email", false) :
      dispatch(withDataActions(email, FORGOT_PASSWORD));
  };
  const onContinue = () => {
    toggleModal()

    props.navigation.goBack();
  }


  const {
    isLoading,
  } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(
        state,
        FORGOT_PASSWORD,
      ),
    };
  }, shallowEqual);
  return (
    <ScrollView contentContainerStyle={{ height: hp(100) }}>

      <ImageBackground
        style={{
          height: hp(100),
          paddingHorizontal: wp(5),
          paddingBottom: hp(3),
        }}
        resizeMode="stretch"
        source={require('_assets/images/background.jpg')}>
        <View key="header">
          <AuthHeader {...props} />
          <AppText
            bold
            size={25}
            heading
            style={{ marginTop: 40, marginBottom: 10, color: '#c27e12' }}>
            {t('forgot_password')}
          </AppText>
          <AppText size={16} secondary white style={{ marginBottom: 20 }}>
            {t('enter_email')}
          </AppText>
        </View>

        <View key="content">
          <InputWithLabel
            white
            placeholder="ahmadalajmi@gmail.com"
            label={t('email')}
            value={email}
            onChangeText={(val) => { setEmail(val.replace(" ", "")) }}
          />
        </View>
        <View key="footer" style={styles.footer}>


          <Button onPress={onSubmit} loading={isLoading}>{t('resetPassword')}</Button>

          <ModalScreen
            forgetPassword
            image={require("../../assets/images/forgetPassword.png")}

            visible={visible}
            onContinue={onContinue}
            heading={t('modal_heading')}
            description={t('modal_description')}
            buttonLabel={t('modal_button_label')}

          />
        </View>
      </ImageBackground>
    </ScrollView>

  );
};
const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  forgotPassword: {
    textAlign: 'right',
  },
  createAccount: {
    textAlign: 'center',
  },
  footer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? hp(8) : hp(10),
    // left: wp(10),
    width: wp(92),

    // marginTop: hp


    flex: 1,




  }
});
export default ForgotPassword;
