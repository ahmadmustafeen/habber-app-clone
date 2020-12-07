import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import NotifService from '../../NotifService';
const RemotePushController = () => {
  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;
    console.log('NOTIFCATION ', notification);
    if (isClicked) {
      console.log('NOTIFCATION CLICKED');
    } else {
      console.log('NOTIFCATION Clicked Else block ');
    }
  };
  useEffect(() => {
    new NotifService();
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token.token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('REMOTE NOTIFICATION ==>', notification);
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '540308436088',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  return null;
};
export default RemotePushController;
