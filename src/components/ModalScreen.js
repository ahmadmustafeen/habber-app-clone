import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {AppText, Button, Screen} from './common';
import {RoundIcon} from './RoundIcon';
const ModalComponent = (
  {heading, description, iconType, iconName, iconSize, buttonLabel},
  ref,
) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => ({
    toggle,
  }));
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
            <Button color="white" onPress={toggle}>
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

const ModalScreen = forwardRef(ModalComponent);
export {ModalScreen};
