import { Pressable, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useAppTheme } from '../../theme';
import Icon from '../Icon';
import Text from '../Text';
import { appColors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Toggle from '../Toggle';
import { moderateScale } from '../../utils';
import { isArabic } from '../../localization/i18next';
import { useTranslation } from 'react-i18next';
import { persistor } from '../../store/store';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cart.slice';
import { clearFavourite } from '../../store/slices/favourite.slice';
import { RootStackParamList } from '../../constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logout } from '../../store/slices/user.slice';
interface MenuItemProps {
  itemDetails: {
    title: string;
    icon: string;
    navigateTo?: string;
  };
}
const MenuItem = ({ itemDetails }: MenuItemProps) => {
  const { theme, toggleTheme, isDarkMode } = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(isDarkMode);

  const { title, icon, navigateTo } = itemDetails;

  const onChangeModeHandler = useCallback(
    (isOn: boolean) => {
      toggleTheme();
      setDarkMode(isOn);
    },
    [toggleTheme],
  );

  return (
    <Pressable
      onPress={async () => {
        if (navigateTo) {
          navigation.navigate(navigateTo as never);
        }
        if (navigateTo === t('logout')) {
          persistor.purge();
          dispatch(logout());
          dispatch(clearCart());
          dispatch(clearFavourite());
        }
      }}
      style={styles(theme, navigateTo).container}
    >
      <View style={styles(theme).rowContainer}>
        <View style={styles(theme).iconContainer}>
          <Icon
            name={icon}
            size={moderateScale(18)}
            color={appColors.primary}
          />
        </View>
        <Text fontWeight="medium">{title}</Text>
      </View>
      {title === t('darkMode') ? (
        <Toggle isOn={darkMode} onToggle={onChangeModeHandler} />
      ) : (
        <Icon
          name={isArabic ? 'arrow-left-2' : 'arrow-right-2'}
          size={moderateScale(16)}
          color={theme.primaryText}
        />
      )}
    </Pressable>
  );
};

export default React.memo(MenuItem);
