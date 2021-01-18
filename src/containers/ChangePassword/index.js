import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputWithLabel } from '_components';
import { Button, Screen } from '_components/common';
// import { MY_PROFILE } from '_constants/Screens';
import { Header } from '_components/Header';
import { useTheme } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { withDataActions } from '_redux/actions';
import { UPDATE_PASSWORD } from '_redux/actionTypes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { validateIsTrue, validatePassword } from '../../helpers/Validators';
import { checkIfLoading } from '../../redux/selectors';
const ChangePassword = (props) => {
  const { t } = useTranslation(['ChangePassword'])
  const { navigate } = props.navigation;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const {
    UserProfileReducer,
    FetchSiteReducer
  } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
      FetchSiteReducer: state.FetchSiteReducer
    };
  }, shallowEqual);


  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(
        state,
        UPDATE_PASSWORD,
      )
    };
  }, shallowEqual);
  const [state, setState] = useState({
    email: UserProfileReducer.email,
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
  };
  const Validate = () => {
    return (
      validateIsTrue(state.old_password, "Old Password") &&
      validateIsTrue(state.password, "New Password") &&
      validateIsTrue(state.password_confirmation, "Confirm Password") &&
      validatePassword(state.password) &&
      validateIsTrue((state.password === state.password_confirmation), "Password does not Match", false)
    )
  }
  const passChange = () => {

    Validate() &&


      dispatch(withDataActions(state, UPDATE_PASSWORD));
    // navigate(MY_PROFILE)
  };
  return (
    <View style={{ flex: 1 }} >
      <View >
        <Header {...props} headerImage headerLeft backIcon />
      </View>
      <View style={styles.container}>
        <InputWithLabel
          color={colors.borderColor}
          name="oldPassword"
          placeholder="*************"
          label={t('password')}
          secureTextEntry
          value={state.oldPassword}
          onChangeText={(val) => setStateHandler('old_password', val)}
        />
        <InputWithLabel
          color={colors.borderColor}
          name="newPassword"
          placeholder="*************"
          secureTextEntry
          label={t('newPassword')}
          value={state.oldPassword}
          onChangeText={(val) => setStateHandler('password', val)}
        />
        <InputWithLabel
          color={colors.borderColor}
          name="password_confirmation"
          secureTextEntry
          placeholder="*************"
          label={t('confirmNewPassword')}

          value={state.oldPassword}
          onChangeText={(val) =>
            setStateHandler('password_confirmation', val)
          }
        />

      </View>
      <View style={styles.footer}>
        <Button
          loading={isLoading}
          style={styles.button}
          appColor
          bold
          color={colors.white}
          onPress={() => passChange()}>
          {t('save')}
        </Button>
      </View>
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp(90),
    alignSelf: 'center',
    flex: 1
  },
  button: {
    alignSelf: 'center',
    width: wp(90),
  },
  footer: {
    alignSelf: 'flex-end',
    bottom: hp(3),
    right: wp(5)
  }
})
export default ChangePassword;
