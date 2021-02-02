import React from 'react';
import { Modal, View, StyleSheet, Image } from 'react-native';
import { colors } from 'react-native-elements';
import { AppText, Button, Screen } from './common';
import { RoundIcon } from './RoundIcon';
import { useTranslation } from 'react-i18next';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Header } from './Header';
const ModalScreen = props => {
  console.log("MODAL SCREEM0", props)
  const {
    heading,
    description,
    iconType,
    iconName,
    iconSize,
    buttonLabel,
    visible,
    onContinue,
    toggle,
    onSearch,
    onCart,
    colors, forgetPassword,
    loading,
    image, descriptionNextLine,
    noBackIcon
  } = props
  // console.log("CC", colors)
  const { t } = useTranslation(['AddNewAddress'])

  return (
    <Modal animationType="fade" visible={visible}>
      <View style={styles.container}>
        <Screen noPadding>
          <View key="header" >
            {/* <Header headerImage noTitle backIcon headerRight headerLeft {...props} onModalPress={onContinue} /> */}

            <Header {...props} headerImage route backIcon={!noBackIcon} headerLeft noCart={!onCart} noSearch={!onSearch} onModalPress={onContinue} onModalPressOnly={toggle} onCart={onCart} />
          </View>
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
              {t(heading)}
            </AppText>
            <AppText
              style={{
                paddingHorizontal: 20,
                fontSize: 18,
                textAlign: 'center',
              }}>
              {description}
            </AppText>
            <AppText
              style={{
                paddingHorizontal: 20,
                fontSize: 18,
                textAlign: 'center',
              }}>
              {descriptionNextLine}
            </AppText>
          </View>
          <View key="footer" style={styles.footer}>
            <Button background={colors && colors.primary} color="white" onPress={onContinue} loading={loading} bold Capitalize>
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
  footer: {
    marginBottom: hp(3),
    width: wp(90),
    alignSelf: 'center'
  },

});

export { ModalScreen };
