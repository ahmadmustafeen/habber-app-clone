import React from 'react';
import { Modal, View, StyleSheet, Image } from 'react-native';
import { colors } from 'react-native-elements';
import { AppText, Button, Screen } from './common';
import { RoundIcon } from './RoundIcon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ModalScreen = ({
  heading,
  description,
  iconType,
  iconName,
  iconSize,
  buttonLabel,
  visible,
  onContinue,
  colors, forgetPassword,
  loading,
  image
},
) => {
  console.log("CC", colors)
  return (
    <Modal animationType="fade" visible={visible}>
      <View style={styles.container}>
        <Screen>
          <View key="header"></View>
          <View
            key="content"
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            {image ? <Image
              // source={require("../assets/images/forgetPassword.png")}
              source={image}
              style={{ marginRight: wp(3) }}

            /> :
              <RoundIcon
                large
                name={iconName || 'check'}
                type={iconType || 'feather'}
                color="#fff"
                size={iconSize || 50}
              />}
            <AppText
              bold
              primary={!colors}
              style={{
                color: colors && colors.primary,
                paddingHorizontal: 20,
                textAlign: 'center',
                fontSize: 25,
                marginTop: 20,
                marginBottom: 20,
              }}>
              {heading}
            </AppText>
            <AppText
              style={{
                paddingHorizontal: 20,
                fontSize: 18,
                textAlign: 'center',
              }}>
              {description}
            </AppText>
          </View>
          <View key="footer">
            <Button background={colors && colors.primary} color="white" onPress={onContinue} loading={loading}>
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
  },
});

export { ModalScreen };
