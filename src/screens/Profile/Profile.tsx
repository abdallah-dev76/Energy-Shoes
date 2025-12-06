import {TouchableOpacity, View} from 'react-native';
import React from 'react';
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
import {appColors} from '../../theme/colors';
import {SheetManager} from 'react-native-actions-sheet';
import {moderateScale} from '../../utils';
import styles from './styles';
import {settingsItems} from '../../constants/data';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
const Profile = () => {
  const {t} = useTranslation();
  const user = useSelector((state: RootState) => state.user.data);
  return (
    <MainLayout
      isFixedHeader
      header={
        <NavigationHeader
          startAction={<NavigationAction.BackButton />}
          title={t('profile')}
        />
      }>
      <View style={styles().profileImageContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => SheetManager.show('change-picture-sheet')}>
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
        <View>
          <Text textAlign="center" fontWeight="semiBold">
            {user?.displayName}
          </Text>
          <Text textAlign="center" fontSize={14}>
            {user?.email}
          </Text>
          <Button
            iconName="pen-new-square-svgrepo-com-1"
            title={t('editProfile')}
            onPress={() => console.log('No')}
            alignSelf="center"
            style={styles().editProfile}
          />
        </View>
      </View>

      <View style={styles().menuContainer}>
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
      </View>
    </MainLayout>
  );
};

export default Profile;
