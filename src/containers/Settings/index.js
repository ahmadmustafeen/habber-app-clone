import React, { useState } from 'react';
import { View, StyleSheet, Switch, Picker, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

import { Screen, Button } from '_components/common';
import { SettingsComponent, Header } from '_components';
import { useTheme } from '@react-navigation/native';
import { JOINUS, PRIVACY_POLICY, RETURN_POLICY } from '../../constants/Screens';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { withoutDataActions } from '_redux/actions';
import { SIGN_OUT } from '_redux/actionTypes';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const Settings = (props) => {
  const { colors } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);

  const { i18n } = useTranslation();

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  const dispatch = useDispatch();
  const UserProfileReducer = useSelector(
    ({ UserProfileReducer }) => UserProfileReducer,
    shallowEqual,
  );
  const onLogout = () => {
    dispatch(withoutDataActions(SIGN_OUT));
  };
  const { navigation } = props;
  return (
    <Screen>
      <View key="header">
        <Header {...props} title={'Settings'} />
      </View>
      <View key="content" style={styles.content}>
        {/* <SettingsComponent
          label="Language"
          rightComponent={
            <Picker
              selectedValue={i18n.language}
              style={{height: 20, width: 100}}
              onValueChange={(itemValue, itemIndex) => {
                console.log('itemValue', itemValue);
                i18n.changeLanguage(itemValue).then(() => {
                  I18nManager.forceRTL(itemValue === 'ar');
                  RNRestart.Restart();
                });
              }}>
              <Picker.Item label="English" value="en" />
              <Picker.Item label="عربى" value="ar" />
            </Picker>
          }
        /> */}
        {__DEV__ && <View><Button bold onPress={() => {

          i18n.changeLanguage('en').then(() => {
            I18nManager.forceRTL(false);
            RNRestart.Restart();
          })
        }}>
          English
          </Button>
          <Button bold onPress={() => {

            i18n.changeLanguage('ar').then(() => {
              I18nManager.forceRTL(true);
              RNRestart.Restart();
            })
          }}>
            Arabic
</Button></View>}
        <SettingsComponent
          label="Notifications"
          rightComponent={
            <Switch
              trackColor={{ false: colors.primary, true: colors.textBlack }}
              thumbColor={!isEnabled ? colors.secondary : colors.appColor}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          }
        />
        <SettingsComponent label="Currency" />
        <SettingsComponent label="Terms & Conditions" />
        <SettingsComponent
          onIconPress={() => navigation.navigate(PRIVACY_POLICY)}
          label="Privacy Policy"
        />
        <SettingsComponent
          onIconPress={() => navigation.navigate(RETURN_POLICY)}
          label="Return Policy"
        />
        <SettingsComponent
          onIconPress={() => navigation.navigate(JOINUS)}
          label="Join Us"
        />
      </View>
      <View key="footer">
        {UserProfileReducer.token && (
          <Button bold onPress={onLogout}>
            LOGOUT
          </Button>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({});
export default Settings;
