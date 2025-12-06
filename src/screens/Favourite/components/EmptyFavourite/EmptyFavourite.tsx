import LottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';
import {Button, Text} from '../../../../components';
import AppImages from '../../../../assets/app_images';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {useAppTheme} from '../../../../theme';
import {useTranslation} from 'react-i18next';
export const EmptyFavourite = () => {
  const navigation = useNavigation();
  const {theme} = useAppTheme();
  const {t} = useTranslation();
  return (
    <View style={styles().emptyListContainer}>
      <LottieView
        source={AppImages.empry_fav_animation}
        loop
        autoPlay
        style={styles().emptyListImage}
      />
      <View style={styles().emptyTextContainer}>
        <Text fontSize={21} fontWeight="semiBold" textAlign="center">
          {t('noFavourite')}
        </Text>
        <Text
          fontSize={14}
          fontWeight="medium"
          textAlign="center"
          color={theme.secondaryText}>
          {t('addToFavourite')}
        </Text>
        <Button
          size="large"
          title={t('goBack')}
          alignSelf="center"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default EmptyFavourite;
