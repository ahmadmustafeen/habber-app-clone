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
import { validateIsTrue, validatePassword } from '../../helpers/Validators';
import { RESET_PASSWORD } from '../../constants/Screens';
const ResetPassword = (props) => {

  const dispatch = useDispatch();
  const { visible, toggleModal } = useModal();

  const { t } = useTranslation(['resetPassword']);
  const { navigate } = props.navigation;
  const [token, setToken] = useState(props.route.params.token);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const Validate = () => {
    return (
      validateIsTrue(password, "Password") &&
      validateIsTrue(confirmPassword, "Confirm Password") &&
      validatePassword(password) && validateIsTrue((password === confirmPassword), "Password Don't Match", false)
    )

  }
  const onSubmit = () => {
    Validate() &&
      dispatch(withDataActions({ email, token, password }, "RESET_PASSWORD_SAGA"));
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
          heading
          style={{ marginTop: 40, marginBottom: 10, color: '#c27e12' }}>
          {t('resetPassword')}
        </AppText>

      </View>

      <View key="content">
        <InputWithLabel
          white
          placeholder="Email"
          label={t('email')}
          value={email}
          onChangeText={(val) => setEmail(val.replace(" ", ""))}
        />
        <InputWithLabel
          white
          placeholder="Password"
          label={t('password')}
          value={password}
          onChangeText={(val) => setPassword(val)}
        />
        <InputWithLabel
          white
          placeholder="Confirm_Password"
          label={t('confirm_password')}
          value={confirmPassword}
          onChangeText={(val) => setConfirmPassword(val)}
        />
      </View>
      <View key="footer" style={styles.footer}>


        <Button onPress={onSubmit} loading={isLoading}>{t('resetPassword')}</Button>

        {/* <ModalScreen
          forgetPassword
          image={require("../../assets/images/forgetPassword.png")}
          visible={visible}
          onContinue={onContinue}
          heading={t('modal_heading')}
          description={t('modal_description')}
          buttonLabel={t('modal_button_label')}

        /> */}
      </View>
    </ImageBackground>
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
