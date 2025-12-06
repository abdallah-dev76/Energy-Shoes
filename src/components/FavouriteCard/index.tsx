import {View, ImageBackground} from 'react-native';
import React, {useCallback} from 'react';
import {ProductDto} from '../../constants';
import {useAppTheme} from '../../theme';
import {appColors} from '../../theme/colors';
import styles from './styles';
import Text from '../Text';
import Price from '../Price';
import IconButton from '../IconButton';
import NavigationAction from '../NavigationAction';
import StarRating from '../StarRating';
import {SheetManager} from 'react-native-actions-sheet';

type FavouriteCardProps = {product: ProductDto};

const FavouriteCard = ({product}: FavouriteCardProps) => {
  const {name, imageURL, price, average_rating, category} = product;
  const {theme} = useAppTheme();

  const handleAddToCart = useCallback(() => {
    SheetManager.show('add-to-cart-sheet', {
      payload: {product},
    });
  }, [product]);

  return (
    <View style={styles(theme).container}>
      <ImageBackground
        style={styles(theme).image}
        source={{uri: imageURL}}
        resizeMode="cover">
        <NavigationAction.LoveButton
          product={product}
          noBackground
          iconSize="large"
        />
      </ImageBackground>
      <View style={styles(theme).rightContainer}>
        <View>
          <Text numberOfLines={1}>{name}</Text>
          <Text color={theme.secondaryText} fontSize={12} numberOfLines={2}>
            {category}
          </Text>
        </View>
        <Price price={price} />
        <View>
          <View style={styles(theme).rateContainer}>
            <StarRating rating={average_rating} />
            <Text fontSize={12} fontWeight="semiBold">
              {average_rating.toFixed(1)}
            </Text>
          </View>
        </View>
        <View style={styles(theme).buttonContainer}>
          <IconButton
            iconName="plus-icon-2"
            iconColor={appColors.white}
            backgroundColor={appColors.primary}
            onPress={handleAddToCart}
            isRounded
          />
        </View>
      </View>
    </View>
  );
};

export default FavouriteCard;
