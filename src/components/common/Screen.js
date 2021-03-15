import React from 'react';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const Screen = (props) => {
  const { noPadding, contentPadding } = props;

  const getComponent = (key) => {
    const { children } = props;
    return children.filter((view) => view.key === key);
  };

  return (
    <>
      {getComponent('header').length ? (
        <View style={styles.header}>{getComponent('header')}</View>
      ) : null}
      <KeyboardAwareScrollView
        // stickyHeaderIndices={[1]}
        // // resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
        // // automaticallyAdjustContentInsets={true}
        // keyboardDismissMode="on-drag"
        // scrollsToTop={true}
        // showsHorizontalScrollIndicator={false}
        // showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps="never"
        // bounces={false}
        // enableResetScrollToCoords={false}
        resetScrollToCoords={{ x: 0, y: 0 }}
        // contentContainerStyle={{ height: heightPercentageToDP(96), flexGrow: 1 }}
        // automaticallyAdjustContentInsets={true
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        scrollsToTop={false}
        // behavior={Platform.OS == "ios" ? "padding" : "height"}
        behavior={"padding"}
        showsHorizontalScrollIndicator={false}
        // keyboardVerticalOffset={100}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="never"
        bounces={false}
      // style={{ backgroundColor: 'red' }}
      >
        <View
          style={[
            styles.formContainer,
            { backgroundColor: props.backgroundColor },
            noPadding && { paddingHorizontal: 0, paddingBottom: 0 },
          ]}>

          {getComponent('content').length ? (
            <View
              style={[styles.content, contentPadding && { paddingHorizontal: 20 }]}>
              {getComponent('content')}
            </View>
          ) : null}
          {getComponent('footer').length ? (
            <View style={styles.footer}>{getComponent('footer')}</View>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
      {/* </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 25,
    // paddingBottom: 20,
  },
  container: {
    flex: 1,
    margin: wp('5%'),
    marginBottom: hp('0.75%'),
  },
  header: {
    // marginBottom: hp(4),

  },
  content: {
    flex: 1,
  },
  footer: {
    marginTop: 0,
    paddingVertical: heightPercentageToDP(3)
  },
});

export { Screen };
