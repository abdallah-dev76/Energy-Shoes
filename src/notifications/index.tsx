import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import notifee, {
  AndroidColor,
  AndroidImportance,
} from '@notifee/react-native';
import messaging, {
  getMessaging,
  getToken,
} from '@react-native-firebase/messaging';

const requestToken = async () => {
  try {
    const messagingInstance = getMessaging();
    const token = await getToken(messagingInstance);
    console.log(token);
  } catch {
    console.log('error requesting a token');
  }
};

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    if (Platform.Version < 33) {
      requestToken();
      return;
    }
    const request = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (request === PermissionsAndroid.RESULTS.GRANTED) {
      requestToken();
    }
  } else if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      requestToken();
    }
  }
};
export const useNotifications = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    requestNotificationPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await notifee.requestPermission(); // for IOS Only

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId,
          smallIcon: 'ic_launcher', // your app icon or custom notification icon
          color: AndroidColor.RED, // optional: accent color
          importance: AndroidImportance.HIGH, // heads-up notification
          pressAction: {
            id: 'default', // opens the app
          },
          sound: 'default', // custom sound or default
        },
        ios: {
          sound: 'default',
          categoryId: 'default',
        },
      });
    });

    return unsubscribe;
  }, []);
};
