import React, {Component, useRef} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Header} from '../../components';
import {Screen} from '../../components/common';
import {HOME} from '../../constants/Screens';

export const Payment = (props) => {
  console.log('PAYMENT', props);
  const WEBVIEW_REF = useRef(null);
  const handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    console.log('NEWNAVSTATE', newNavState);
    const {url} = newNavState;
    if (!url) return;
    // if (newNavState.title == 'Secure payment') {
    //   props.navigation.navigate(HOME);
    // }
    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      WEBVIEW_REF.stopLoading();
      // maybe close this view?
    }

    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      WEBVIEW_REF.stopLoading();
    }

    // redirect somewhere else
    if (url.includes('google.com')) {
      const newURL = 'https://logrocket.com/';
      const redirectTo = 'window.location = "' + newURL + '"';
      WEBVIEW_REF.injectJavaScript(redirectTo);
    }
  };
  return (
    <Screen>
      <View key="header">
        <Header {...props} />
      </View>
      <View key="content" style={{flex: 1, backgroundColor: 'silver'}}>
        <WebView
          ref={WEBVIEW_REF}
          source={{uri: props.route.params.paymentUrl}}
          renderLoading={() => {
            return (
              <ActivityIndicator
                style={{width: 100, height: 100}}
                size="large"
              />
            );
          }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      </View>
    </Screen>
  );
};
