import { Pressable, View } from 'react-native';
import React, { useCallback } from 'react';
import { Button, MainLayout, Text, TextInput } from '../../components';
import { styles } from './styles';
import { useAppTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../constants';
import { appColors } from '../../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './schema';
import { RootState } from '../../store/store';

const Login = () => {
  const { theme } = useAppTheme();
  const user = useSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: user?.email ?? '',
      password: user?.password ?? '',
    },
  });

  const handleSubmitLogin = useCallback(() => {
    navigation.navigate('homeBottomTabs');
  }, [navigation]);

  return (
    <MainLayout hideBottomTabs bottomIndicatorColor={theme.backgroundColor}>
      <View style={styles(theme).mainContainer}>
        <View style={styles(theme).container}>
          <View style={{ gap: 8 }}>
            <Text fontWeight="bold" fontSize={24} lineHeight={32}>
              Sign in to your Account
            </Text>
            <Text fontWeight="medium" color={theme.secondaryText}>
              Enter Your email and password
            </Text>
          </View>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Email"
                keyboardType="email-address"
                placeholder="Enter your email"
                onValueChange={onChange}
                value={value}
                errorMessage={errors.email?.message}
                required
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password"
                secureTextEntry
                placeholder="Enter your password"
                onValueChange={onChange}
                value={value}
                errorMessage={errors.password?.message}
                required
              />
            )}
            name="password"
          />

          <Button
            isDisabled={!isValid}
            title="Login"
            alignSelf="stretch"
            size="large"
            onPress={handleSubmitLogin}
          />

          <Pressable onPress={() => navigation.navigate('signup')}>
            <Text textAlign="center" fontSize={14} color={appColors.primary}>
              Don't have an account ? Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </MainLayout>
  );
};

export default Login;
