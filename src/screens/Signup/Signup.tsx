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

const Signup = () => {
  const { theme } = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSubmitRegister = useCallback(async () => {
    navigation.navigate('login');
  }, [navigation]);

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { email, name, password } = getValues();
  console.log(errors.name?.message, ' ddddd');
  return (
    <MainLayout hideBottomTabs bottomIndicatorColor={theme.backgroundColor}>
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
                required
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
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
            rules={{
              required: true,
            }}
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
            isDisabled={
              name.length === 0 || email.length === 0 || password.length === 0
            }
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
