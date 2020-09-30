import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {forgotPassword} from '../../assets/data/StaticData';
import {InputWithLabel, ModalScreen} from '../../components';
import {AppText, BackgroundImage, Button} from '../../components/common';

const ForgotPassword = (props) => {
  const {navigate} = props.navigation;

  const onSubmit = () => {
    toggleModal();
  };

  const modalRef = useRef(null);

  const toggleModal = () => {
    modalRef.current.toggle();
  };
  return (
    <BackgroundImage>
      <View key="header">
        <AppText bold heading primary>
          {forgotPassword.forgot_password}
        </AppText>
        <AppText secondary>{forgotPassword.enter_email}</AppText>
      </View>
      <View key="content">
        <InputWithLabel placeholder="ahmadalajmi@gmail.com" label="Email" />
      </View>
      <View key="footer">
        <Button onPress={onSubmit}>{forgotPassword.resetPassword}</Button>
        <ModalScreen ref={modalRef} {...forgotPassword.modalData} />
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
