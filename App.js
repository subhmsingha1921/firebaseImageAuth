import React, {useEffect} from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { showLocalNotification, showScheduleNotification } from './src/services/LocalPushController';
import FirebaseNotificationController from './src/services/FirebaseNotificationController';

console.disableYellowBox = true;

const App = () => {

  const handleLocalPress = () => {
    showLocalNotification();
  }

  const handleSchedulePress = () => {
    showScheduleNotification();
  }

  return (
    <View style={styles.container}>
    <Image
      style={styles.image}
      source={{ uri: 'https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png' }}
    />
      <Text style={styles.headerText}>Trigger Notification!!!</Text>
      <Text style={styles.smallText}>Tap the notification button below to receive notification alerts.</Text>
      <TouchableOpacity onPress={handleLocalPress}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Local notification</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSchedulePress}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Scheduled notification</Text>
        </View>
      </TouchableOpacity>
      <FirebaseNotificationController />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 16,
    color: 'grey',
    marginTop: 10,
    paddingHorizontal: 30,
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'orange',
    width: 230,
    height: 70,
    borderRadius: 10,
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  }
})

export default App;