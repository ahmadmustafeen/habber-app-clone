import React, { useEffect } from 'react';
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

const App = () => {
  const { network, toggleModal } = useNetworkModal();
  useEffect(() => {
    googleConfigure();
  });

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
        {/* <LoginButton
          publishPermissions={['email']}
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Login failed with error: ' + error.message);
            } else if (result.isCancelled) {
              alert('Login was cancelled');
            } else {
              alert(
                'Login was successful with permissions: ' +
                  result.grantedPermissions,
              );
            }
          }}
          onLogoutFinished={() => alert('User logged out')}
        /> */}
      </View>
      <ModalScreen
        image={require('./src/assets/images/nointernet.png')}
        colors={Color}
        visible={network}
        onContinue={toggleModal}
        heading="No Internet"
        description="Oops! Internet Failed,"
        descriptionNextLine="Please Retry"
        buttonLabel="Retry"
      />
      <RemotePushController />
      {/* <OfflineNotice /> */}
    </View>
  );
};

export default App;
