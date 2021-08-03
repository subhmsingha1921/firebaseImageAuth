import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const FirebaseNotificationController = (props) => {
  useEffect(() => {

    messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        console.log(
          'Message handled in the background!',
          remoteMessage
        );
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("Message handled in the foreground!", "This notification is sent by firebase.");
      PushNotification.localNotification({
        channelId: remoteMessage.notification.android.channelId,
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        largeIconUrl: remoteMessage.notification.android.imageUrl,
      });
    });
    return unsubscribe;
  }, []);

  return null;
};

export default FirebaseNotificationController;