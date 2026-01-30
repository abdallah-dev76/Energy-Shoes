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
import { createSignupSchema } from './schema';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/slices/user.slice';
import { appColors } from '../../theme/colors';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(createSignupSchema(t)),
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
    <MainLayout
      hideBottomTabs
      isScrollable
      statusBarBackgroundColor={appColors.primary}
    >
      <View style={styles(theme).mainContainer}>
        <View style={styles(theme).container}>
          <View style={{ gap: 8 }}>
            <Text fontWeight="bold" fontSize={24} lineHeight={32}>
              {t('signUp')}
            </Text>
          </View>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={t('fullName')}
                placeholder={t('exampleName')}
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
                label={t('emailLabel')}
                keyboardType="email-address"
                placeholder={t('enterYourEmail')}
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
                label={t('password')}
                isPassword
                placeholder={t('enterYourPassword')}
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
                label={t('confirmPassword')}
                secureTextEntry
                isPassword
                placeholder={t('reEnterPassword')}
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
                label={t('phoneNumberOptional')}
                keyboardType="numeric"
                placeholder={t('examplePhone')}
                onValueChange={onChange}
                value={value}
                errorMessage={errors.phone?.message}
              />
            )}
            name="phone"
          />

          <Button
            isDisabled={!isValid}
            title={t('register')}
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
