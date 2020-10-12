import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';

import {InputWithLabel, RoundIcon, ModalScreen} from '_components';
import {BackgroundImage, Button, AppText} from '_components/common';
import {signUp} from '_assets/data/StaticData';
const SignUp = (props) => {
  const {navigate} = props.navigation;
  const modalRef = useRef(null);

  const onSignUp = () => {
    toggleModal();
  };

  const toggleModal = () => {
    modalRef.current.toggle();
  };

  return (
    <BackgroundImage>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <InputWithLabel
          style={styles.inputfield}
          placeholder="Khaled"
          label="First Name"
          required
        />
        <InputWithLabel placeholder="Ammar" label="Last Name" required />
        <InputWithLabel
          placeholder="ahmadalajmi@gmail.com"
          label="Email"
          required
        />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Password"
          required
        />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Confirm Password"
          required
        />
        <View style={{alignItems: 'center'}}>
          <AppText white secondary size={17}>
            {signUp.agreement}
          </AppText>
          <AppText underline style={styles.termsandservices} size={17}>
            {signUp.TermsAndPolicies}
          </AppText>
          <Button round width="60%" onPress={onSignUp}>
            {signUp.sign_up}
          </Button>

          {/* <AppText white secondary style={{marginTop: 10, marginBottom: 10}}>
            OR
          </AppText> */}
        </View>
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
        </View> */}
        <ModalScreen ref={modalRef} {...signUp.modalData} />
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
  },
  termsandservices: {
    color: '#c27e12',
    marginTop: 5,
    marginBottom: 25,
  },
});

export default SignUp;
