import {Adidas, NewBalance, Nike, Puma} from '../assets/Logos';
import {translate} from '../utils';
import {Routes} from './routes';
import {RootStackParamList} from './types';
export const categoriesTabs = (t: (key: string) => string) => [
  t('all'),
  t('men'),
  t('women'),
  t('kids'),
];

export const brands = [
  {name: 'Puma', Logo: Puma},
  {name: 'New Balance', Logo: NewBalance},
  {name: 'Nike', Logo: Nike},
  {name: 'Adidas', Logo: Adidas},
];

export const settingsItems: {
  id: number;
  title: string;
  icon: string;
  screenName?: keyof RootStackParamList;
}[] = [
  {
    id: 1,
    title: translate('notifications'),
    icon: 'notification-6',
    screenName: Routes.NOTIFICATIONS,
  },
  {id: 2, title: translate('darkMode'), icon: 'moon-1'},
  {
    id: 3,
    title: translate('language'),
    icon: 'language',
    screenName: Routes.LANGUAGE,
  },
  {
    id: 4,
    title: translate('history'),
    icon: 'history',
    screenName: Routes.HISTORY,
  },

  {
    id: 5,
    title: translate('logout'),
    icon: 'logout-circle-svgrepo-com',
    screenName: Routes.AUTH_STACK,
  },
];
