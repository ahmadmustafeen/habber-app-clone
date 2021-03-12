import React, { useEffect, useState } from 'react';
import Navigator from './src/navigator';
import { navigationRef } from './NavigationService';
import { StatusBar, View } from 'react-native';
import { ModalScreen } from './src/components';
import useNetworkModal from './src/utils/customHooks/useNetworkModal';
import OfflineNotice from './src/components/OfflineNotice';
import { Color } from './src/constants/Colors';
import RemotePushController from './src/services/RemotePushController';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { googleConfigure } from './src/services/googleLoginController';
import Linking from './src/navigator/Linking'
import { I18nManager } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { withDataActions, withoutDataActions } from './src/redux/actions';
import { HIDE_NETWORK_MODAL, SPLASH_ACTION } from './src/redux/actionTypes';
import RNBootSplash from "react-native-bootsplash";
import UserProfileReducer from './src/redux/reducers/UserProfileReducer';
import { Alert } from 'react-native';

const App = () => {
  const dispatch = useDispatch()
  const { network, toggleModal } = useNetworkModal();
  const [internet, setInternet] = useState(true);


  const {
    UserProfileReducer,

  } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,

    };
  }, shallowEqual);

  useEffect(() => {
    googleConfigure();

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        setInternet(false);
      }
      else {
        setInternet(true);
        // dispatch(withoutDataActions(HIDE_NETWORK_MODAL))
      }

    });
    return () => {
      // RNBootSplash.hide({ duration: 1 }); setTimeout(() => {


      unsubscribe();

      // RNBootSplash.hide({ duration: 200 });
    }
  });

  useEffect(() => {
    dispatch(withoutDataActions(SPLASH_ACTION))
  }, [])
  useEffect(() => {
    // dispatch(withoutDataActions(SPLASH_ACTION))
    setTimeout(() => {

      if (UserProfileReducer.setting !== null) {
        RNBootSplash.hide({ duration: 2000 })
      }
    }, 2000)

  }, [UserProfileReducer])
  // useEffect(() => {
  //   const init = async () => {
  //     // …do multiple sync or async tasks
  //   };

  //   init().finally(async () => {
  //     RNBootSplash.hide({ duration: 200 });
  //     console.log("Bootsplash has been hidden successfully");
  //   });
  // }, []);

  // const onRemoteNotification = (notification) => {
  //   const isClicked = notification.getData().userInteraction === 1;
  //   console.log('NOTIFCATION ', notification);
  //   if (isClicked) {
  //     console.log('NOTIFCATION CLICKED');
  //   } else {
  //     console.log('NOTIFCATION Clicked Else block ');
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Navigator ref={navigationRef} />
      <View>

      </View>
      <ModalScreen
        image={require('./src/assets/images/nointernet.png')}
        colors={Color}
        visible={(network || !internet)}
        onContinue={toggleModal}
        heading={I18nManager.isRTL ? "بدون انترنت" : "No Internet"}
        description={I18nManager.isRTL ? "وجه الفتاة! فشل الإنترنت" : "Oops! Internet Failed,"}
        descriptionNextLine={I18nManager.isRTL ? "الرجاء اعادة المحاولة" : "Please Retry"}
        buttonLabel={I18nManager.isRTL ? "أعد المحاولة" : "Retry"}
      />
      <RemotePushController />
      {/* <OfflineNotice /> */}
    </View>
  );
};

export default App;
