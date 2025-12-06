import {FlatList} from 'react-native';
import React from 'react';
import {
  FavouriteCard,
  MainLayout,
  NavigationAction,
  NavigationHeader,
} from '../../components';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import styles from './styles';
import {EmptyFavourite} from './components';
import {useTranslation} from 'react-i18next';
const Favourite = () => {
  const favouriteProducts = useSelector((state: RootState) => state.favourite);
  const {t} = useTranslation();
  return (
    <MainLayout
      isFixedHeader
      header={
        <NavigationHeader
          startAction={<NavigationAction.BackButton />}
          title={t('favourites')}
          endAction={<NavigationAction.NofificationsButton />}
        />
      }>
      <FlatList
        data={favouriteProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <FavouriteCard product={item} />}
        contentContainerStyle={styles().contentContainer}
        ListEmptyComponent={<EmptyFavourite />}
        showsVerticalScrollIndicator={false}
      />
    </MainLayout>
  );
};

export default Favourite;
