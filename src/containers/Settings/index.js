import React, {useState} from 'react';
import {View, StyleSheet, Switch, Picker, I18nManager} from 'react-native';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';

import {Screen, Button} from '_components/common';
import {SettingsComponent, Header} from '_components';
import {useTheme} from '@react-navigation/native';
import {JOINUS} from '../../constants/Screens';
const Settings = (props) => {
  const {colors} = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);

  const {i18n} = useTranslation();

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  const {navigation} = props;
  return (
    <View>
      <Header {...props} title={'Settings'} />
      <Screen>
        <View key="header"></View>
        <View key="content" style={styles.content}>
          {/* <SettingsComponent
            label="Language"
            rightComponent={
              <Picker
                selectedValue={i18n.language}
                style={{ height: 20, width: 100 }}
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
          <SettingsComponent
            label="Notifications"
            rightComponent={
              <Switch
                trackColor={{false: colors.primary, true: colors.textBlack}}
                thumbColor={!isEnabled ? colors.secondary : colors.appColor}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            }
          />
          <SettingsComponent label="Currency" />
          <SettingsComponent label="Terms & Conditions" />
          <SettingsComponent label="Privacy Policy" />
          <SettingsComponent label="Return Policy" />
          <SettingsComponent
            onIconPress={() => navigation.navigate(JOINUS)}
            label="Join Us"
          />
        </View>
        <View key="footer">
          <Button fontSize={19} bold>
            LOGOUT
          </Button>
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Settings;
