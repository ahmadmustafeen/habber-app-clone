import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {forgotPassword} from '../../assets/data/StaticData';
import {InputWithLabel, ModalScreen} from '../../components';
import {AppText, BackgroundImage, Button} from '../../components/common';

const ForgotPassword = (props) => {
  const {navigate} = props.navigation;

  const [isModalVisible, setModalVisible] = useState(false);

  const onSubmit = () => {
    setModalVisible(true);
  };

  const handleModalButton = () => {
    setModalVisible(false);
  };
  return (
    <BackgroundImage>
      <View key="header">
        <AppText bold heading style={{marginTop:40,marginBottom:10, color: '#c27e12'}}>
          {forgotPassword.forgot_password}
        </AppText>
        <AppText secondary style={{marginBottom:20}}>{forgotPassword.enter_email}</AppText>
      </View>
      <View key="content">
        <InputWithLabel placeholder="ahmadalajmi@gmail.com" label="Email" />
      </View>
      <View key="footer">
        <Button onPress={onSubmit}>{forgotPassword.resetPassword}</Button>
        <ModalScreen
          {...forgotPassword.modalData}
          onPress={handleModalButton}
          visible={isModalVisible}
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
