import React, { useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { WebView } from 'react-native-webview';
import { Header, ModalScreen } from '../../components';
import { Screen } from '../../components/common';
import { HOME, INVOICE } from '../../constants/Screens';

import { useTheme } from '@react-navigation/native';
import { I18nManager } from 'react-native';
export const Payment = (props) => {
  console.log("payment props", props)
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(null);

  const { colors } = useTheme()
  const WEBVIEW_REF = useRef(null);
  const modalData = {
    heading: success ? I18nManager.isRTL ? "الدفع الناجح" : 'Payment Success' : I18nManager.isRTL ? "فشل الدفع" : 'Payment Failure',
    description: success
      ? I18nManager.isRTL ? `تم الدفع الخاص بك بنجاح
مكتمل`: `Your Payment has successfully
Completed`
      : I18nManager.isRTL ? `عفوًا! عملية الدفع فشلت
الرجاء اعادة المحاولة`: `Ops! Payment Failed
Please Retry`,
    buttonLabel: I18nManager.isRTL ? 'يكمل' : 'Continue',
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleWebViewNavigationStateChange = (navState) => {
    console.log(navState, "NAVSTATE")
    const { url, loading } = navState;
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
  const onContinue = () => {
    toggleModal();
    success ? props.navigation.navigate(INVOICE, { item: props.route.params.orderDetails }) : props.navigation.navigate(HOME)
  };
  return (
    <Screen noPadding>
      <View key="header">
        <Header {...props}
          headerRight
          headerLeft={<Icon
            onPress={() => props.navigation.navigate(HOME)}
            color={colors.primary}
            name={I18nManager.isRTL ? "leftcircleo" : "leftcircleo"}
            type="antdesign"
          />} headerImage />
      </View>
      <View key="content" style={{ flex: 1, backgroundColor: 'silver' }}>
        <WebView
          ref={WEBVIEW_REF}
          scalesPageToFit={false}
          source={{ uri: props.route.params.paymentUrl }}
          renderLoading={() => {
            return (
              <ActivityIndicator
                style={{ width: 100, height: 100 }}
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
