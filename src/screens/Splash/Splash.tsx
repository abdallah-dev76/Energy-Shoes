import { View, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { MainLayout, Text } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants';

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
      navigation.navigate('authStack');
    }, 1000);
  });

  return (
    <MainLayout>
      <View style={styles.container}>
        <LottieView
          style={{ width: '100%', height: '50%' }}
          source={require('../../assets/animations/app_launching.json')}
          autoPlay
          loop
        />
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text fontSize={24}>Shoes App</Text>
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
});
export default Splash;
