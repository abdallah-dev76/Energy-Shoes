import { FlatList } from 'react-native';
import React from 'react';
import {
  MainLayout,
  NavigationAction,
  NavigationHeader,
} from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import NotificationRow from './NotificationRow';
const Notifications = () => {
  const notificationsList = useSelector(
    (state: RootState) => state.notifications,
  );

  return (
    <MainLayout
      hideBottomTabs
      isFixedHeader
      header={
        <NavigationHeader
          startAction={<NavigationAction.BackButton />}
          title="Notifications"
        />
      }
    >
      <FlatList
        data={notificationsList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <NotificationRow title={item?.title ?? ''} desc={item?.desc ?? ''} />
        )}
      />
    </MainLayout>
  );
};

export default Notifications;
