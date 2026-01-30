import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from '../../constants';
import { px, pxH } from '../../utils';
const { height } = Dimensions.get('window');
const styles = (theme: Theme, isDarkMode?: boolean) =>
  StyleSheet.create({
    productsContainer: {
      gap: px(16),
      marginBottom: pxH(24),
      paddingHorizontal: px(24),
    },
    productImage: {
      height: height * 0.3,
      transform: [{ scale: 1.4 }],
    },
    detailsContainer: {
      paddingHorizontal: px(24),
      paddingTop: pxH(24),
      gap: pxH(24),
    },
    footerContainer: {
      flexDirection: 'row',
      gap: px(16),
      backgroundColor: theme.tabBarBackgroundColor,
      paddingVertical: pxH(16),
      paddingHorizontal: px(24),
      alignItems: 'center',
      borderTopLeftRadius: px(18),
      borderTopRightRadius: px(18),
      shadowColor: isDarkMode ? 'transparent' : 'rgba(0, 0, 0, 0.25)',
      shadowOffset: { width: 0, height: pxH(4) },
      shadowOpacity: 0.2,
      shadowRadius: px(6),
      elevation: 10,
    },
    addToCartButton: { flex: 1 },
    tags: { flexDirection: 'row', gap: px(16) },
    nameAndRating: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: px(16),
    },
    productName: {
      flex: 1,
    },
    ratingText: {
      marginTop: pxH(1),
    },
    innerContainer: { gap: pxH(16) },
    rateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: px(2),
    },
    sizesSection: {
      gap: pxH(16),
    },
  });

export default styles;
