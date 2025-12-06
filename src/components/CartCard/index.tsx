//the text may streched out
import {View, Image, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import styles from './styles';
import Text from '../Text';
import Price from '../Price';
import Counter from '../Counter';
import {ProductDto, RootStackParamList} from '../../constants';
import IconButton from '../IconButton';
import {useDispatch} from 'react-redux';
import {remove} from '../../store/slices/cart.slice';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type CartCardProps = {
  product: ProductDto;
};

const CardCart = ({product}: CartCardProps) => {
  const {name, imageURL, price, id, selected_size} = product;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const handleRemoveProduct = useCallback(() => {
    dispatch(remove({id, selected_size}));
  }, [dispatch, id, selected_size]);

  return (
    <Pressable style={styles.container}>
      <Pressable
        style={styles.imageContainer}
        onPress={() => navigation.push('productDetails', {product})}>
        <Image
          style={styles.image}
          source={{uri: imageURL}}
          resizeMode="cover"
        />
      </Pressable>

      <View style={styles.rightContainer}>
        <View style={styles.gapSpace}>
          <View style={styles.rowContainer}>
            <Text
              fontWeight="medium"
              numberOfLines={1}
              style={styles.textWidth}>
              {name}
            </Text>

            <Price price={price} />
          </View>
          <Text fontWeight="medium" fontSize={14}>
            {` ${t('size')} : ${selected_size}`}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Counter id={id} selectedSize={selected_size} />
          <IconButton
            iconName="garbage-trash-svgrepo-com"
            onPress={handleRemoveProduct}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default CardCart;
