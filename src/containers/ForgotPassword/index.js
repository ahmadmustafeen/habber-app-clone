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
  validateEmail,
} from '_helpers/Validators';
import useModal from '_utils/customHooks/useModal';
const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const { visible, toggleModal } = useModal();

  const { t } = useTranslation(['forgotPassword']);
  const { navigate } = props.navigation;
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    (!validateEmail(email)) ? Alert.alert("Invalid Email") :
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
    <BackgroundImage>
      <View key="header">
        <AuthHeader {...props} />
        <AppText
          bold
          heading
          style={{ marginTop: 40, marginBottom: 10, color: '#c27e12' }}>
          {t('forgot_password')}
        </AppText>
        <AppText secondary white style={{ marginBottom: 20 }}>
          {t('enter_email')}
        </AppText>
      </View>

      <View key="content">
        <InputWithLabel
          placeholder="ahmadalajmi@gmail.com"
          label={t('email')}
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
      </View>
      <View key="footer">
        <Button onPress={onSubmit} loading={isLoading}>{t('resetPassword')}</Button>
        <ModalScreen
          forgetPassword
          visible={visible}
          onContinue={onContinue}
          heading={t('modal_heading')}
          description={t('modal_description')}
          buttonLabel={t('modal_button_label')}

        />
      </View>
    </BackgroundImage>
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
});
export default ForgotPassword;
