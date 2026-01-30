import { Pressable, View } from 'react-native';
import React, { useCallback } from 'react';
import { Button, MainLayout, Text, TextInput } from '../../components';
import { styles } from './styles';
import { useAppTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../constants';
import { appColors } from '../../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createLoginSchema } from './schema';
import { RootState } from '../../store/store';
import { loginUser } from '../../store/slices/user.slice';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(createLoginSchema(t)),
    defaultValues: {
      email: user?.email ?? '',
      password: user?.password ?? '',
    },
  });

  const handleSubmitLogin = useCallback(() => {
    navigation.navigate('homeBottomTabs');
    dispatch(
      loginUser({
        name: getValues('email').split('@')[0],
        password: getValues('password'),
        email: getValues('email'),
      }),
    );
  }, [dispatch, getValues, navigation]);

  return (
    <MainLayout hideBottomTabs statusBarBackgroundColor={appColors.primary}>
      <View style={styles(theme).mainContainer}>
        <View style={styles(theme).container}>
          <View style={{ gap: 8 }}>
            <Text fontWeight="bold" fontSize={24} lineHeight={32}>
              {t('signInToYourAccount')}
            </Text>
            <Text fontWeight="medium" color={theme.secondaryText}>
              {t('enterYourEmailAndPassword')}
            </Text>
          </View>

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
                placeholder={t('enterYourPassword')}
                onValueChange={onChange}
                value={value}
                isPassword
                errorMessage={errors.password?.message}
                required
              />
            )}
            name="password"
          />

          <Button
            isDisabled={!isValid}
            title={t('login')}
            alignSelf="stretch"
            size="large"
            onPress={handleSubmitLogin}
          />

          <Pressable onPress={() => navigation.navigate('signup')}>
            <Text textAlign="center" fontSize={14} color={appColors.primary}>
              {t('dontHaveAccount')}
            </Text>
          </Pressable>
        </View>
      </View>
    </MainLayout>
  );
};

export default Login;
