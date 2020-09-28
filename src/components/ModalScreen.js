import React, {useState} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {AppText, Button, Screen} from './common';
import {RoundIcon} from './RoundIcon';
export const ModalScreen = ({
  visible,
  onPress,
  heading,
  description,
  iconType,
  iconName,
  iconSize,
  buttonLabel,
}) => {
  return (
    <Modal animationType="fade" visible={visible}>
      <View style={styles.container}>
        <Screen>
          <View key="header"></View>
          <View
            key="content"
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <RoundIcon
              large
              name={iconName || 'check'}
              type={iconType || 'feather'}
              color="#fff"
              size={iconSize || 50}
            />
            <AppText bold primary>
              {heading}
            </AppText>
            <AppText>{description}</AppText>
          </View>
          <View key="footer">
            <Button color="white" onPress={onPress}>
              {buttonLabel}
            </Button>
          </View>
        </Screen>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
});
