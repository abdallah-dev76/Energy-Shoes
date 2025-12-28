import { View } from 'react-native';
import React, { useCallback } from 'react';
import { Button, MainLayout, Text, TextInput } from '../../components';
import { styles } from './styles';
import { useAppTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from './schema';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/slices/user.slice';
import { appColors } from '../../theme/colors';

const Signup = () => {
  const { theme } = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
  });

  const { name, password, phone, email } = watch();

  const handleSubmitRegister = useCallback(async () => {
    navigation.navigate('login');
    dispatch(
      loginUser({
        name: name ?? email.split('@')[0],
        password,
        phone,
        email,
      }),
    );
  }, [dispatch, email, name, navigation, password, phone]);

  return (
    <MainLayout hideBottomTabs isScrollable statusBarBackgroundColor={appColors.primary}>
      <View style={styles(theme).mainContainer}>
        <View style={styles(theme).container}>
          <View style={{ gap: 8 }}>
            <Text fontWeight="bold" fontSize={24} lineHeight={32}>
              Sign up
            </Text>
          </View>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Full Name"
                placeholder="Ex : Andrew John"
                onValueChange={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
            name="name"
          />

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
                isPassword
                placeholder="Enter your password"
                onValueChange={onChange}
                value={value}
                errorMessage={errors.password?.message}
                required
              />
            )}
            name="password"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Confirm Password"
                secureTextEntry
                isPassword
                placeholder="Re Enter your password"
                onValueChange={onChange}
                value={value}
                errorMessage={errors.repassword?.message}
                required
              />
            )}
            name="repassword"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Phone Number ( Optional )"
                keyboardType="numeric"
                placeholder="Ex : 0123456789"
                onValueChange={onChange}
                value={value}
                errorMessage={errors.phone?.message}
              />
            )}
            name="phone"
          />

          <Button
            isDisabled={!isValid}
            title="Register"
            alignSelf="stretch"
            size="large"
            onPress={handleSubmitRegister}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default Signup;
