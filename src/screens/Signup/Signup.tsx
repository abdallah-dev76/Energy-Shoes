import { View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Button, MainLayout, Text, TextInput } from '../../components';
import { styles } from './styles';
import { useAppTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants';
import { appColors } from '../../theme/colors';

const Signup = () => {
  const { theme } = useAppTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleSubmitRegister = useCallback(async () => {
    navigation.navigate('login');
  }, []);

  return (
    <MainLayout hideBottomTabs bottomIndicatorColor={theme.backgroundColor}>
      <View style={styles(theme).mainContainer}>
        <View style={styles(theme).container}>
          <View style={{ gap: 8 }}>
            <Text fontWeight="bold" fontSize={24} lineHeight={32}>
              Sign up
            </Text>
          </View>
          <TextInput
            label="Full Name"
            placeholder="Ex : Andrew John"
            onValueChange={val => setFullName(val)}
          />

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
            isDisabled={
              fullName.length === 0 ||
              email.length === 0 ||
              password.length === 0
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
