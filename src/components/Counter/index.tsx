import { View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import {
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import styles from './styles';
import { appColors } from '../../theme/colors';
import IconButton from '../IconButton';
import Text from '../Text';
import { useDispatch } from 'react-redux';
import {
  remove,
  incrementQuantity,
  decrementQuantity,
} from '../../store/slices/cart.slice';

type CounterProps = { id: number; selectedSize?: string; quantity: number };

const Counter = ({ id, selectedSize, quantity }: CounterProps) => {
  const dispatch = useDispatch();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(
      withSpring(1.3, { damping: 5, stiffness: 300 }),
      withSpring(1, { damping: 8, stiffness: 200 }),
    );
  }, [quantity, scale]);

  const addButtonHandler = useCallback(() => {
    if (quantity < 10) {
      dispatch(incrementQuantity({ id, selected_size: selectedSize }));
    }
  }, [quantity, dispatch, id, selectedSize]);

  const removeButtonHandler = useCallback(() => {
    if (quantity === 1) {
      dispatch(remove({ id, selected_size: selectedSize }));
    } else if (quantity > 1) {
      dispatch(decrementQuantity({ id, selected_size: selectedSize }));
    }
  }, [quantity, dispatch, id, selectedSize]);

  return (
    <View style={styles.counterConainer}>
      <IconButton
        iconName={'minus-svgrepo-com-1'}
        onPress={removeButtonHandler}
        isDisabled={quantity === 1}
        backgroundColor={appColors.white}
        iconColor={appColors.black}
        isRounded
        iconSize="small"
      />
      <View style={styles.counterText}>
        <Text fontWeight="medium" textAlign="center">
          {quantity}
        </Text>
      </View>
      <IconButton
        iconName="plus-icon-2"
        onPress={addButtonHandler}
        isDisabled={quantity === 10}
        isRounded
        backgroundColor={appColors.primary}
        iconColor={appColors.white}
        iconSize="small"
      />
    </View>
  );
};

export default React.memo(Counter);
