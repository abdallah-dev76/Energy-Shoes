import { TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  Avatar,
  Button,
  Icon,
  MainLayout,
  MenuItem,
  NavigationAction,
  NavigationHeader,
  Text,
} from '../../components';
import { appColors } from '../../theme/colors';
import { SheetManager } from 'react-native-actions-sheet';
import { moderateScale } from '../../utils';
import styles from './styles';
import { settingsItems } from '../../constants/data';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants';
const Profile = () => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Animation values
  const avatarOpacity = useSharedValue(0);
  const userInfoOpacity = useSharedValue(0);
  const userInfoTranslateY = useSharedValue(30);
  const menuOpacity = useSharedValue(0);
  const menuTranslateX = useSharedValue(-50);

  useEffect(() => {
    //Avatar Opacitiy
    avatarOpacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
    // User info fade and slide
    userInfoOpacity.value = withDelay(
      200,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );
    userInfoTranslateY.value = withDelay(
      200,
      withSpring(0, { damping: 15, stiffness: 100 }),
    );

    // Menu items slide from left
    menuOpacity.value = withDelay(
      400,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );
    menuTranslateX.value = withDelay(
      400,
      withSpring(0, { damping: 15, stiffness: 90 }),
    );
  }, [
    userInfoOpacity,
    userInfoTranslateY,
    menuOpacity,
    menuTranslateX,
    avatarOpacity,
  ]);

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    opacity: avatarOpacity.value,
  }));

  const userInfoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: userInfoOpacity.value,
    transform: [{ translateY: userInfoTranslateY.value }],
  }));

  const menuAnimatedStyle = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
    transform: [{ translateX: menuTranslateX.value }],
  }));

  return (
    <MainLayout
      isFixedHeader
      isScrollable
      header={
        <NavigationHeader
          startAction={<NavigationAction.BackButton />}
          title={t('profile')}
        />
      }
    >
      <View style={styles().profileImageContainer}>
        <Animated.View style={avatarAnimatedStyle}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => SheetManager.show('change-picture-sheet')}
          >
            <Avatar
              size="large"
              pointerEvents="none"
              imageUrl={user?.imageProfile}
            />
            <Icon
              size={moderateScale(14)}
              name="camera-svgrepo-com-1"
              color={appColors.white}
              style={styles().cameraIcon}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={userInfoAnimatedStyle}>
          <Text textAlign="center" fontWeight="semiBold">
            {user?.name}
          </Text>
          <Text textAlign="center" fontSize={14}>
            {user?.email}
          </Text>
          <Button
            iconName="pen-new-square-svgrepo-com-1"
            title={t('editProfile')}
            onPress={() => navigation.navigate('editProfile')}
            alignSelf="center"
            style={styles().editProfile}
          />
        </Animated.View>
      </View>

      <Animated.View style={[styles().menuContainer, menuAnimatedStyle]}>
        {settingsItems.map((item, index) => (
          <MenuItem
            key={index}
            itemDetails={{
              title: item.title,
              icon: item.icon,
              navigateTo: item.screenName,
            }}
          />
        ))}
      </Animated.View>
    </MainLayout>
  );
};

export default Profile;
