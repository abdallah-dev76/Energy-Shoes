import { View, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { MainLayout } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants';
import EnergyShoesLogo from '../../assets/Logos/EnergyShoesLogo';

const Splash = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, // 1.5 seconds
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('intro');
    }, 2000);
  });

  return (
    <MainLayout hideBottomTabs>
      <View style={styles.container}>
        <LottieView
          style={styles.lottieView}
          source={require('../../assets/animations/sneaker.json')}
          autoPlay
          loop
          speed={2}
        />
        <Animated.View style={{ opacity: fadeAnim }}>
          <EnergyShoesLogo />
        </Animated.View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: '100%',
    height: '50%',
  },
});
export default Splash;
