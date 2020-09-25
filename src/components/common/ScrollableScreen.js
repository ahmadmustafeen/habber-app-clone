import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const ScrollableScreen = (props) => {
  return (
    <KeyboardAwareScrollView
      // resetScrollToCoords={{ x: 0, y: 0 }}
      // contentContainerStyle={{ flexGrow: 1 }}
      automaticallyAdjustContentInsets={true}
      keyboardDismissMode="on-drag"
      scrollsToTop={false}
      keyboardShouldPersistTaps="never"
      enableResetScrollToCoords={false}>
      <View style={[styles.formContainer, props.extraStyling]}>
        {props.children}
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('1%'),
    paddingTop: hp('2%'),
  },
});
