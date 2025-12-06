import React from 'react';
import {
  Image,
  ScrollView,
  View,
  Animated,
  useWindowDimensions,
  useAnimatedValue,
} from 'react-native';
import styles from './styles.ts';
import AppImages from '../../assets/app_images/index.ts';
import {appColors} from '../../theme/colors.ts';
const OffersSlider = () => {
  const scrollX = useAnimatedValue(0);
  const widthMobile = useWindowDimensions().width;
  const promoBackgorunds = [
    AppImages.promo_background_1,
    AppImages.promo_background_2,
  ];
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {
            useNativeDriver: false, // or true if you're only animating transforms
          },
        )}
        pagingEnabled>
        {promoBackgorunds.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {promoBackgorunds.map((_, index) => {
          const backgroundColor = scrollX.interpolate({
            inputRange: [
              widthMobile * (index - 1),
              widthMobile * index,
              widthMobile * (index + 1),
            ],
            outputRange: [
              appColors.gray400,
              appColors.primary,
              appColors.gray400,
            ],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={[styles.dot, {backgroundColor}]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default OffersSlider;
