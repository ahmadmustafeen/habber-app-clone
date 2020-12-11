import React, {useRef, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Header, ModalScreen} from '../../components';
import {Screen} from '../../components/common';
import {INVOICE} from '../../constants/Screens';

export const Payment = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(null);
  const WEBVIEW_REF = useRef(null);
  const modalData = {
    heading: success ? 'Payment Success' : 'Payment Failure',
    description: success
      ? `Your Payment has successfully
Completed`
      : `Ops! Payment Failed
Please Retry`,
    buttonLabel: 'Continue',
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleWebViewNavigationStateChange = (navState) => {
    const {url, loading} = navState;
    if (!url) return;

    if (url.includes('payment/failure')) {
      setSuccess(false);
      toggleModal();
    }

    if (url.includes('payment/success') && !loading) {
      setSuccess(true);
      toggleModal();
    }

    // redirect somewhere else
    // if (url.includes('google.com')) {
    //   const newURL = 'https://logrocket.com/';
    //   const redirectTo = 'window.location = "' + newURL + '"';
    //   WEBVIEW_REF.injectJavaScript(redirectTo);
    // }
  };
  onContinue = () => {
    toggleModal();
    success && props.navigation.navigate(INVOICE);
  };
  return (
    <Screen>
      <View key="header">
        <Header {...props} />
      </View>
      <View key="content" style={{flex: 1, backgroundColor: 'silver'}}>
        <WebView
          ref={WEBVIEW_REF}
          scalesPageToFit={false}
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

        <ModalScreen
          visible={modalVisible}
          onContinue={onContinue}
          {...modalData}
        />
      </View>
    </Screen>
  );
};
