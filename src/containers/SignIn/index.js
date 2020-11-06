import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {withDataActions} from '_redux/actions/GenericActions';
import {SIGN_IN} from '_redux/actionTypes';
import {InputWithLabel, RoundIcon} from '_components';
import {AppText, BackgroundImage, Button} from '_components/common';
import {FORGOT_PASSWORD_SCREEN, SIGNUP_SCREEN} from '_constants/Screens';
import {validateEmail, validatePassword} from '../../helpers/Validators';
const SignIn = (props) => {
  const dispatch = useDispatch();
  const {navigate} = props.navigation;
  const {colors} = useTheme();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const {email, password} = state;

  const handleChange = (key, value) => {
    setState((state) => ({...state, [key]: value}));
  };

  const {loading} = useSelector(({LoadingReducer}) => {
    return {
      loading: LoadingReducer.loading,
    };
  }, shallowEqual);
  const validate = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email');
      return false;
    }
    if (!validatePassword(password)) {
      Alert.alert('Invalid Password');
      return false;
    }
    return true;
  };

  const onSignIn = () => {
    validate() && dispatch(withDataActions(state, SIGN_IN));
  };
  return (
    <BackgroundImage>
      <View key="header">
        <AppText bold color={colors.primary} heading style={styles.hellotxt}>
          Hello !
        </AppText>
        <AppText white secondary style={{marginBottom: 10}}>
          Sign in to your account
        </AppText>
      </View>
      <View key="content" style={styles.content}>
        <InputWithLabel
          placeholder="ahmadalajmi@gmail.com"
          label="Email"
          value={email}
          onChangeText={(value) => handleChange('email', value)}
        />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Password"
          value={password}
          onChangeText={(value) => handleChange('password', value)}
        />
        <AppText
          underline
          style={styles.forgotPassword}
          size={18}
          onPress={() => navigate(FORGOT_PASSWORD_SCREEN)}>
          Forgot Password
        </AppText>
        <View style={{alignItems: 'center'}}>
          <Button
            loading={loading}
            width="70%"
            color={colors.secondary}
            round
            onPress={onSignIn}>
            SIGN IN
          </Button>
          <AppText
            underline
            center
            primary
            onPress={() => navigate(SIGNUP_SCREEN)}
            style={{
              marginVertical: 20,
            }}>
            Create New Account
          </AppText>
          {/* <AppText
          white
          style={{textAlign: 'center', marginBottom: 10}}
          secondary
          onPress={() => navigate(SIGNUP_SCREEN)}>
          {`OR

Login with Social media account`}
        </AppText> */}
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
        </View>  */}
        </View>
      </View>
      <View key="footer">
        <AppText
          right
          underline
          primary
          size={30}
          onPress={() => navigate('Drawer', {screen: 'Home'})}>
          Skip
        </AppText>
      </View>
    </BackgroundImage>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bgImage: {
    flex: 1,
  },
  hellotxt: {
    marginTop: 30,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#c27e12',
    marginBottom: 20,
  },
});
export default SignIn;
