//using react.memo with the rendering item of a flatList is good
import {View, ImageBackground, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import {useAppTheme} from '../../theme';
import styles from './styles';
import Text from '../Text';
import Icon from '../Icon';
import {appColors} from '../../theme/colors';
import Price from '../Price';
import {ProductDto, RootStackParamList, Routes} from '../../constants';
import IconButton from '../IconButton';
import NavigationAction from '../NavigationAction';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SheetManager} from 'react-native-actions-sheet';
import {applyDiscount, moderateScale} from '../../utils';

type CardProps = {
  product: ProductDto;
  isShowDetails?: boolean;
};

const Card = ({product, isShowDetails}: CardProps) => {
  const {theme, isDarkMode} = useAppTheme();
  const {name, imageURL, price, average_rating, discount, description} =
    product;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleAddToCart = useCallback(() => {
    SheetManager.show('add-to-cart-sheet', {
      payload: {product},
    });
  }, [product]);

  return (
    <Pressable
      style={styles(theme, isShowDetails, isDarkMode).container}
      onPress={() => navigation.push(Routes.PRODUCT_DETAILS, {product})}>
      <ImageBackground
        source={{uri: imageURL}}
        resizeMode="cover"
        style={styles(theme).imageContainer}>
        {average_rating &&
          (!isShowDetails ? (
            <View style={styles(theme).rateContainer}>
              <Icon
                name="star-fill"
                size={moderateScale(14)}
                color={appColors.yellow}
              />
              <Text fontWeight="semiBold" fontSize={14} color={appColors.white}>
                {average_rating.toFixed(1)}
              </Text>
            </View>
          ) : (
            <View style={styles(theme).loveContainer}>
              <NavigationAction.LoveButton
                product={product}
                noBackground
                iconSize="large"
              />
            </View>
          ))}
      </ImageBackground>
      <View style={styles(theme, isShowDetails).nameAndDescription}>
        <Text
          fontSize={isShowDetails ? 18 : 16}
          numberOfLines={1}
          style={styles(theme).productName}>
          {name}
        </Text>
        {isShowDetails && (
          <Text
            color={theme.secondaryText}
            fontSize={isShowDetails ? 14 : 12}
            numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>

      <View style={styles(theme, isShowDetails).cardFooter}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
          <Price
            price={discount ? applyDiscount(price, discount) : price}
            priceSize={isShowDetails ? 21 : 16}
          />
          {discount && (
            <Text
              style={{textDecorationLine: 'line-through'}}
              color={appColors.gray100}
              fontSize={isShowDetails ? 21 : 16}>
              {price}
            </Text>
          )}
        </View>
        <IconButton
          onPress={handleAddToCart}
          iconName="plus-icon-2"
          backgroundColor={appColors.primary}
          iconColor={appColors.white}
          style={styles(theme).addButton}
          iconSize={isShowDetails ? 'large' : 'medium'}
        />
      </View>
    </Pressable>
  );
};

export default Card;
