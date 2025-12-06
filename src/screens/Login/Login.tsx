import { Pressable, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Button, MainLayout, Text, TextInput } from '../../components';
import { styles } from './styles';
import { useAppTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../constants';
import { appColors } from '../../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

const Login = () => {
  const { theme } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleSubmitLogin = useCallback(async () => {
    navigation.navigate('homeBottomTabs');
  }, []);
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
          <TextInput
            label="Email"
            keyboardType="email-address"
            placeholder="Enter your email"
            onValueChange={val => setEmail(val)}
          />
          <TextInput
            label="Password"
            secureTextEntry
            placeholder="Enter your password"
            onValueChange={val => setPassword(val)}
          />
          {err && <Text color={appColors.red}>{err}</Text>}
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
