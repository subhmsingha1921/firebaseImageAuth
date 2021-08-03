import PushNotification, {Importance} from 'react-native-push-notification';

// PushNotification.createChannel(
//   {
//     channelId: "channel-id", // (required)
//     channelName: "My channel", // (required)
//     channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//     playSound: false, // (optional) default: true
//     soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//     importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//   },
//   (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
// );

PushNotification.configure({
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },

  popInitialNotification: true,
  requestPermissions: true
})

export const showLocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Push Notification for in app alerts',
    title: 'Local Push Notification',
    message: 'Expand this text to see full message',
    largeIconUrl: 'data:image/png;base64,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',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Show", "Ignore"]'
  })
}

export const showScheduleNotification = () => {
  PushNotification.localNotificationSchedule({
    bigText:
      'This is schedule notification. You can easily set time and number of repetition.',
    subText: 'Schedule Push Notification Demo',
    title: 'React Native Scheduled Notification',
    message: "Alarm! Time to wake up",
    largeIconUrl: 'https://previews.123rf.com/images/hironicons/hironicons2001/hironicons200100055/136798211-beautiful-design-and-fully-editable-schedule-icon-calendar-icon-for-commercial-print-media-web-or-an.jpg',
    date: new Date(Date.now() + 3 * 1000), // in 60 secs
    allowWhileIdle: false,
    repeatTime: 1,
  })
}