import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {AppText, Button, Screen} from './common';
import {RoundIcon} from './RoundIcon';
const ModalScreen = ({
  heading,
  description,
  iconType,
  iconName,
  iconSize,
  buttonLabel,
  visible,
  onContinue,
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
            <AppText bold primary style={{paddingHorizontal:20,textAlign: 'center',fontSize: 25,marginTop:20,marginBottom:20}}>
              {heading}
            </AppText>
            <AppText style={{paddingHorizontal:20,fontSize: 18,textAlign: 'center'}}>{description}</AppText>
          </View>
          <View key="footer">
            <Button color="white" onPress={onContinue}>
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

export {ModalScreen};
