import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Alert } from 'react-native';
import { Dimensions } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const Screen = (props) => {

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    props?.refresh && props.refresh()
    // setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
  }, []);
  const { noPadding, contentPadding } = props;

  const getComponent = (key) => {
    const { children } = props;
    return children.filter((view) => view.key === key);
  };
  const [verticalOffSet, setVerticalOffSet] = useState(false)
  return (
    <>
      {getComponent('header').length ? (
        <View style={styles.header}>{getComponent('header')}</View>
      ) : null}
      <KeyboardAwareScrollView

        refreshControl={props.refresh &&
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
          />
        }

        onKeyboardWillShow={() => {
          setVerticalOffSet(true)
        }}
        onKeyboardWillHide={() => {
          setVerticalOffSet(false)
        }}
        style={{

        }}
        // contentContainerStyle={[{ flexGrow: 1 },]}
        // resetScrollToCoords={{ x: 0, y: 0 }}
        automaticallyAdjustContentInsets={false}
        // keyboardDismissMode="on-drag"
        // keyboardVerticalOffset={-100}
        scrollsToTop={false}
        behavior={"padding"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        bounces={!props.refresh ? false : true}


      // resetScrollToCoords={{ x: 0, y: 0 }}
      // contentContainerStyle={{ height: heightPercentageToDP(96), flexGrow: 1 }}
      // automaticallyAdjustContentInsets={true
      // automaticallyAdjustContentInsets={false}
      // keyboardDismissMode="on-drag"
      // scrollsToTop={false}
      // showsHorizontalScrollIndicator={false}
      // showsVerticalScrollIndicator={false}
      // keyboardShouldPersistTaps="never"
      // bounces={false}
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

        </View>
      </KeyboardAwareScrollView>
      {getComponent('footer').length ? (
        <View style={styles.footer}>{getComponent('footer')}</View>
      ) : null}
      {/* </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 25,
    // flexGrow: 1
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
    // flexGrow: 1
  },
  footer: {
    marginTop: 0,
    paddingVertical: heightPercentageToDP(3)
  },
});

export { Screen };
