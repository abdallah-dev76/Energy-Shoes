import { Pressable, View } from 'react-native';
import React, { useCallback } from 'react';
import { Button, MainLayout, Text, TextInput } from '../../components';
import { styles } from './styles';
import { useAppTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../constants';
import { appColors } from '../../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/user.slice';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './schema';

const Login = () => {
  const { theme } = useAppTheme();

  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { email, password } = getValues();

  const handleSubmitLogin = useCallback(() => {
    dispatch(
      login({
        email,
        name: email.split('@')[0],
      }),
    );
    navigation.navigate('homeBottomTabs');
  }, [dispatch, email, navigation]);

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
            isDisabled={email.length === 0 || password.length === 0}
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
