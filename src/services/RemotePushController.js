import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import NotifService from '../../NotifService';
const RemotePushController = () => {
  useEffect(() => {
    new NotifService();
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
