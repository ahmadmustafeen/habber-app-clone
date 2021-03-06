import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
// import {forgotPassword} from '_assets/data/StaticData';
import { InputWithLabel, ModalScreen, AuthHeader } from '_components';
import { AppText, BackgroundImage, Button } from '_components/common';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
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
import { validateIsTrue, validatePassword } from '../../helpers/Validators';
import { RESET_PASSWORD } from '../../constants/Screens';
import { ScrollView } from 'react-native';
import { PASSWORD_CHANGE } from '../../assets/data/StaticData';
import { I18nManager } from 'react-native';
const ResetPassword = (props) => {

  const dispatch = useDispatch();
  const { visible, toggleModal } = useModal();

  const { t } = useTranslation(['resetPassword']);
  const { navigate } = props.navigation;
  const [remember_token, setToken] = useState(props.route.params.token);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const Validate = () => {
    return (
      validateIsTrue(password, I18nManager.isRTL ? "الرجاء إدخال كلمة المرور" : "Please Enter Password", false) &&
      validateIsTrue(confirmPassword, I18nManager.isRTL ? "الرجاء إدخال تأكيد كلمة المرور" : "Please Enter Confirm Password") &&
      validatePassword(password) && validateIsTrue((password === confirmPassword), I18nManager.isRTL ? "كلمة السر غير متطابقة" : "Password Does Not Match", false)
    )

  }
  const onSubmit = () => {
    Validate() &&
      dispatch(withDataActions({ email, remember_token, password }, "RESET_PASSWORD_SAGA"));
  };
  const onContinue = () => {
    toggleModal()

    props.navigation.goBack();
  }


  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(
        state,
        RESET_PASSWORD,
      )
    };
  }, shallowEqual);
  console.log(isLoading, "THIS")
  return (
    <ScrollView contentContainerStyle={{ height: hp(100) }} bounces={false}>
      <ImageBackground
        style={{
          height: hp(100),
          paddingHorizontal: wp(5),
          // paddingBottom: hp(3),
        }}
        resizeMode="stretch"
        source={require('_assets/images/background.jpg')}>
        <View key="header">
          <AuthHeader {...props} />
          <AppText
            bold
            heading
            style={{ marginTop: 40, marginBottom: 10, color: '#c27e12' }}>
            {t('resetPassword')}
          </AppText>

        </View>

        <View key="content">
          <InputWithLabel
            white
            placeholder="ahmadalajmi@gmail.com"
            label={t('email')}
            value={email}
            onChangeText={(val) => setEmail(val.replace(" ", ""))}
          />
          <InputWithLabel
            white
            secureTextEntry
            placeholder="*********"
            label={t('password')}
            value={password}
            onChangeText={(val) => setPassword(val)}
          />
          <InputWithLabel
            white
            secureTextEntry
            placeholder="*********"
            label={t('confirm_password')}
            value={confirmPassword}
            onChangeText={(val) => setConfirmPassword(val)}
          />
          <ModalScreen
            // image={require("")}
            visible={visible}
            onContinue={onContinue}
            {...PASSWORD_CHANGE.modalData}

          />
        </View>
        <View key="footer" style={styles.footer}>


          <Button onPress={onSubmit} loading={isLoading}>{t('resetPassword')}</Button>


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
    paddingTop: hp(10),
    marginBottom: hp(6),
    paddingBottom: hp(6),

    // marginTop: hp


    flex: 1,




  }
});
export default ResetPassword;
