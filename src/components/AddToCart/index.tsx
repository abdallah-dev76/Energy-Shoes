//use useMemo when refactoring data to meet a specific format (fixed values) like the shoes sizes values
//{payload}: SheetProps<'add-to-cart-sheet'>
//if u have to containers horizontally and make every container with flex:1 => this will make 50% for each container
//flex:1 takes the availabel space so if there's no space , so it'll take zero space
//flex works with flexDirection , takes avialabe space horizontally if the flexDirection is 'row'
import {Image, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import AppBottomSheet from '../AppBottomSheet';
import Text from '../Text';
import {SheetManager, SheetProps} from 'react-native-actions-sheet';
import Price from '../Price';
import DropdownMenu from '../DropDownMenu';
import Button from '../Button';
import {add} from '../../store/slices/cart.slice';
import {useDispatch} from 'react-redux';
import styles from './styles';
import {useTranslation} from 'react-i18next';

const AddToCart = ({payload}: SheetProps<'add-to-cart-sheet'>) => {
  const product = payload?.product;
  const {t} = useTranslation();
  const [selectedSize, setSelectedSize] = useState('');
  const dispatch = useDispatch();
  const availablSizes = useMemo(
    () =>
      product?.available_sizes.map(size => ({
        label: size.toString(),
        value: size.toString(),
      })),
    [product?.available_sizes],
  );

  const handleAddToCart = () => {
    SheetManager.hide('add-to-cart-sheet');
    dispatch(add({...product, selected_size: selectedSize}));
  };
  return (
    <AppBottomSheet
      sheetName="add-to-cart-sheet"
      title={t('selectYourSize')}
      sheetContent={
        <View style={styles.container}>
          <View style={styles.row}>
            <Image style={styles.image} source={{uri: product?.imageURL}} />
            <View style={styles.details}>
              <Text fontWeight="medium">{product?.name}</Text>
              <Price price={product?.price as number} priceSize={18} />
            </View>
          </View>
          <DropdownMenu
            data={availablSizes}
            value={selectedSize}
            setValue={setSelectedSize}
          />
          <Button
            size="large"
            alignSelf="stretch"
            title={t('addToCart')}
            isDisabled={!selectedSize}
            onPress={handleAddToCart}
          />
        </View>
      }
    />
  );
};

export default AddToCart;
