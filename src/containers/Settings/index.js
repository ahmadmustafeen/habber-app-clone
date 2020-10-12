import React, {useState} from 'react';
import {View, StyleSheet, Switch,ScrollView, Picker} from 'react-native';
import {Screen,Button} from '../../components/common';
import {SettingsComponent} from '../../components';
import {useTheme} from '@react-navigation/native';
import Header from '../../components/Header';
import { JOINUS } from '../../constants/Screens';

const Settings = (props) => {
  const {colors} = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState('java');
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  return (
    <View>
    <Header {...props} title={"Settings"} />
    <Screen>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <SettingsComponent
          label="Language"
          rightComponent={
            <Picker
              selectedValue={selectedValue}
              style={{height: 20, width: 100}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          }
        />
        <SettingsComponent
          label="Notifications"
          rightComponent={
            <Switch
              trackColor={{false: colors.primary, true: colors.textBlack}}
              thumbColor={!isEnabled ? colors.warmGray : colors.appColor}
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
        <SettingsComponent label="Join Us" />
      </View>
      <View key="footer">
          <Button
            fontSize={19} bold>
            LOGOUT
          </Button>
      </View>
    </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
 
});
export default Settings;
