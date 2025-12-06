import {storeData} from './mmkvStorage';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import {MMKV_KEYS} from '../constants';

export const changeLanguage = (lang: string) => {
  storeData(MMKV_KEYS.LANGUAGE, lang);
  I18nManager.allowRTL(lang === 'ar');
  I18nManager.forceRTL(lang === 'ar');
  RNRestart.Restart();
};
