import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
// import {forgotPassword} from '_assets/data/StaticData';
import {InputWithLabel, ModalScreen} from '_components';
import {AppText, BackgroundImage, Button} from '_components/common';
import {useTranslation} from 'react-i18next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {HIDE_MODAL, SHOW_MODAL} from 'redux/actionTypes';
import {withoutDataActions} from 'redux/actions';

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const {visible} = useSelector(
    (state) => ({
      visible: state.ModalReducer.visible,
    }),
    shallowEqual,
  );
  const {t} = useTranslation(['forgotPassword']);
  const {navigate} = props.navigation;

  const onSubmit = () => {
    dispatch(withoutDataActions(SHOW_MODAL));
    // toggleModal();
  };

  // const modalRef = useRef(null);

  // const toggleModal = () => {
  //   modalRef.current.toggle();
  // };
  return (
    <BackgroundImage>
      <View key="header">
        <AppText
          bold
          heading
          style={{marginTop: 40, marginBottom: 10, color: '#c27e12'}}>
          {t('forgot_password')}
        </AppText>
        <AppText secondary white style={{marginBottom: 20}}>
          {t('enter_email')}
        </AppText>
      </View>
      <View key="content">
        <InputWithLabel placeholder="ahmadalajmi@gmail.com" label="Email" />
      </View>
      <View key="footer">
        <Button onPress={onSubmit}>{t('resetPassword')}</Button>
        <ModalScreen
          visible={visible}
          onContinue={() => dispatch(withoutDataActions(HIDE_MODAL))}
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
