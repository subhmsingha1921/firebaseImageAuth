import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button
} from 'react-native';

import messaging from '@react-native-firebase/messaging';

const TOPIC = 'Weather';

const RestNotificationController = () => {
  const [deviceToken, setDeviceToken] = useState('');

  const requestUserPermission = async () => {

    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    if (requestUserPermission()) {
      /**
       * Returns an FCM token for this device
       */
      messaging()
        .getToken()
        .then((fcmToken) => {
          console.log('FCM Token -> ', fcmToken);
          setDeviceToken(fcmToken);
        });
    } else console.log('Not Authorization status:', authStatus);
  }

  const handleSending = () => {
    const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAlUMk7-0:APA91bHF2NyusvTIT4HI3Jw3Xv_yrQ76XCOyBeWo4bz6GgV1jwy69jJJC1DKr17fpjAtvZ2uL4IsgqlgZg2fNFUL-_72tdpgzA7AZlIbGSOsl8KkhClI8MDXLDUViMJY-Dg9NkZFomaV'
        },
        body: JSON.stringify({
          to: deviceToken,
          notification: {
            title: "Remote Notification requested by App",
            body: "This is the body of the Remote Notification",
            vibrate: 1,
            sound: 1,
            show_in_foreground: true,
            priority: "high",
            content_available: true,
          },
          data: {
            name: "Subham",
            job: "developer",
          }
        })
    };

    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then(response => response.text())
    .then(data => console.log(data));

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Send Notification to React Native App
        </Text>
        <Text style={styles.textStyle}>using</Text>
        <Image
          source={{ uri: 'https://www.gstatic.com/devrel-devsite/prod/v0492b3db79b8927fe2347ea2dc87c471b22f173331622ffd10334837d43ea37f/firebase/images/touchicon-180.png' }}
          style={{
            width: '90%',
            height: '50%',
            resizeMode: 'contain',
            margin: 30,
          }}
        />
        <Text style={styles.titleText}>
          Firebase Cloud Messaging
        </Text>
      </View>
      <Button title="Send notification" onPress={handleSending} />
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'white',
        }}>
        Press the button to receive notification
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#307ecc',
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
});

export default RestNotificationController;