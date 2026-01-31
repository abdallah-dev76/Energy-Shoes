import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Button, IconButton, MainLayout, Text } from '../../components';
import { useAppTheme } from '../../theme';
import { gutters, layout, RootStackParamList, Theme } from '../../constants';
import { px, pxH } from '../../utils';
import { appColors } from '../../theme/colors';
import AppImages from '../../assets/app_images';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isArabic } from '../../localization/i18next';

const Intro = () => {
  const slides = [
    {
      image: AppImages.onboard2,
      title: 'Step into your style',
      desc: 'Discover the latest sneakers and shoes that match your vibe. Browse, shop, and elevate your look.',
    },
    {
      image: AppImages.onboard1,
      title: 'Shop. Click. Wear.',
      desc: 'Enjoy fast checkout, secure payments, and doorstep delivery. Your new favorite shoes are just a tap away.',
    },
  ];

  const { theme } = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const animations = useRef([
    new Animated.Value(1),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const animateDots = (index: number) => {
    animations.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i === index ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const handlePress = (index: number) => {
    animateDots(index);
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <MainLayout isFixedHeader hideBottomTabs>
      <View style={styles(theme).container}>
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const SvgImage = item.image;
            return (
              <View style={[styles(theme).slide]}>
                <SvgImage
                  width={Dimensions.get('window').width - px(48)}
                  height={Dimensions.get('window').height / 1 / 3}
                />
                <View style={styles(theme).textContainer}>
                  <Text
                    color={theme.primaryText}
                    fontSize={24}
                    fontWeight="semiBold"
                  >
                    {item.title}
                  </Text>

                  <Text
                    color={theme.secondaryText}
                    fontSize={16}
                    fontWeight="medium"
                  >
                    {item.desc}
                  </Text>
                </View>
              </View>
            );
          }}
          onMomentumScrollEnd={event => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x /
                event.nativeEvent.layoutMeasurement.width,
            );
            animateDots(index);
            setActiveIndex(index);
          }}
        />

        <View style={styles(theme).footerSection}>
          <Button
            onPress={() => {
              navigation.navigate('authStack');
            }}
            title="Skip"
          />
          <View style={styles(theme).dotsContainer}>
            {Array.from({ length: 2 }).map((_, index) => {
              const backgroundColor = animations[index].interpolate({
                inputRange: [0, 1],
                outputRange: ['transparent', appColors.primary],
              });

              return (
                <Pressable key={index} onPress={() => handlePress(index)}>
                  <Animated.View
                    style={[
                      styles(theme).dot,
                      {
                        backgroundColor,
                      },
                    ]}
                  />
                </Pressable>
              );
            })}
          </View>
          <IconButton
            onPress={() => {
              if (activeIndex === 1) {
                navigation.navigate('authStack');
              } else {
                handlePress(1);
              }
            }}
            iconName={isArabic ? 'arrow-left-2' : 'arrow-right-2'}
            isRounded
            backgroundColor={appColors.primary}
            iconColor={appColors.white}
          />
        </View>
      </View>
    </MainLayout>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.backgroundColor,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: px(24),
      paddingVertical: pxH(48),
    },
    dotsContainer: { ...gutters.gap_8, ...layout.row },
    dot: {
      width: px(12),
      height: pxH(12),
      borderRadius: px(100),
      borderWidth: px(1),
      borderColor: appColors.primary,
    },
    slide: {
      width: Dimensions.get('window').width, // full screen width
      gap: px(24),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: px(24),
    },
    textContainer: {
      alignItems: 'center',
      gap: pxH(16),
    },
    footerSection: {
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      width: '100%',
      paddingHorizontal: px(24),
    },
  });

export default Intro;
