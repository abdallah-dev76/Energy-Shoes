import Toast from 'react-native-toast-message';

export const toast = (msg: string, type: 'success' | 'info' | 'error') => {
  Toast.show({
    type: type,
    text1: msg,
    position: 'bottom',
    swipeable: true,
    text1Style: {
      fontSize: 16,
    },
  });
};
