import {StyleSheet} from 'react-native';
import React from 'react';
import {gutters} from '../../constants';
import {Text} from '../../components';

const NoProductsFound = () => {
  return <Text style={styles.noProduct}>No Results Found ...</Text>;
};

const styles = StyleSheet.create({
  noProduct: {...gutters.px_24, ...gutters.pt_16},
});
export default NoProductsFound;
