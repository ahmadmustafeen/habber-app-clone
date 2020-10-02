import React, {useState} from 'react';
import {View, StyleSheet, Switch, Picker} from 'react-native';
import {AppText, Screen} from '../../components/common';
import {RoundIcon, SettingsComponent, TitleBarWithIcon} from '../../components';
import {useTheme} from '@react-navigation/native';

const Settings = (props) => {
  const {colors} = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState('java');
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  return (
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
          label="Language"
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
        <SettingsComponent label="Language" />
      </View>
      <View key="footer"></View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
  },
  navbtn: {
    backgroundColor: 'transparent',
    borderBottomColor: '#c27e12',
    paddingVertical: 12,
    color: 'white',
    alignItems: 'flex-start',
    borderBottomWidth: 0.3,
    fontWeight: 'bold',
  },
  image: {
    width: '30%',
    height: '150%',
    borderRadius: 400 / 2,
  },
});
export default Settings;
