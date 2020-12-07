import React, {useEffect} from 'react';
import Navigator from './src/navigator';
import {navigationRef} from './NavigationService';
import {StatusBar, View} from 'react-native';
import {ModalScreen} from 'components';
import useNetworkModal from 'utils/customHooks/useNetworkModal';
import OfflineNotice from 'components/OfflineNotice';
import {Color} from '_constants/Colors';
import RemotePushController from './src/services/RemotePushController';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const App = () => {
  const {network, toggleModal} = useNetworkModal();
  // useEffect(() => {
  //   PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  // });

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
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <Navigator ref={navigationRef} />

      <ModalScreen
        image={require('./src/assets/images/nointernet.png')}
        colors={Color}
        visible={network}
        onContinue={toggleModal}
        heading="No Internet"
        description="Oops! Internet Failed, Please Retry"
        buttonLabel="Retry"
      />
      <RemotePushController />
      {/* <OfflineNotice /> */}
    </View>
  );
};

export default App;
