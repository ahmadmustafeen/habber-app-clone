import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Screen = (props) => {
  const {noPadding} = props;

  const getComponent = (key) => {
    const {children} = props;
    return children.filter((view) => view.key === key);
  };

  return (
    <KeyboardAwareScrollView
      //resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{flexGrow: 1}}
      automaticallyAdjustContentInsets={true}
      keyboardDismissMode="on-drag"
      scrollsToTop={false}
      keyboardShouldPersistTaps="never"
      enableResetScrollToCoords={false}>
      <View
        style={[
          styles.formContainer,
          {backgroundColor: props.backgroundColor},
          noPadding && {paddingHorizontal: 0, paddingBottom: 0},
        ]}>
        {getComponent('header').length ? (
          <View style={styles.header}>{getComponent('header')}</View>
        ) : null}
        {getComponent('content').length ? (
          <View style={styles.content}>{getComponent('content')}</View>
        ) : null}
        {getComponent('footer').length ? (
          <View style={styles.footer}>{getComponent('footer')}</View>
        ) : null}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    margin: wp('5%'),
    marginBottom: hp('0.75%%'),
  },
  header: {
    marginBottom: hp('0.75%'),
  },
  content: {
    flex: 1,
  },
  footer: {
    marginTop: 0,
  },
});

export {Screen};
