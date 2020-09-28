import React, {useState} from 'react';
import {View} from 'react-native';
import {InputWithLabel, RoundIcon, ModalScreen} from '../../components';
import {BackgroundImage, Button, AppText} from '../../components/common';
import {signUp} from '../../assets/data/StaticData';
const SignUp = (props) => {
  const {navigate} = props.navigation;
  const [isModalVisible, setModalVisible] = useState(false);

  const onSignUp = () => {
    setModalVisible(true);
  };

  const handleModalButton = () => {
    setModalVisible(false);
  };
  return (
    <BackgroundImage source={require('../../assets/images/background.jpg')}>
      <View key="header"></View>
      <View key="content">
        <InputWithLabel placeholder="Khaled" label="First Name" required />
        <InputWithLabel placeholder="Ammar" label="Last Name" required />
        <InputWithLabel placeholder="ahmadalajmi@gmail.com" label="Email" />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Password"
        />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Confirm Password"
        />
        <View style={{alignItems: 'center'}}>
          <AppText secondary size={15}>
            {signUp.agreement}
          </AppText>
          <AppText underline primary size={15}>
            {signUp.TermsAndPolicies}
          </AppText>
          <Button round width="60%" onPress={onSignUp}>
            {signUp.sign_up}
          </Button>

          <AppText secondary>OR</AppText>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <RoundIcon
            name="sc-facebook"
            type="evilicon"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <RoundIcon
            name="google"
            type="font-awesome"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <RoundIcon
            name="sc-twitter"
            type="evilicon"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <ModalScreen
            {...signUp.modalData}
            onPress={handleModalButton}
            visible={isModalVisible}
          />
        </View>
      </View>
    </BackgroundImage>
  );
};
export default SignUp;
