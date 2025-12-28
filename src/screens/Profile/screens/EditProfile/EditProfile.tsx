import { View } from 'react-native';
import React, { useCallback } from 'react';
import {
  Button,
  MainLayout,
  NavigationAction,
  NavigationHeader,
  TextInput,
} from '../../../../components';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../constants';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ediProfileSchema } from './schema';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { loginUser } from '../../../../store/slices/user.slice';

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ediProfileSchema),
    defaultValues: {
      firstName: user?.name?.split(' ')[0],
      lastName: user?.name?.split(' ')[1],
      email: user?.email,
      phone: user?.phone,
    },
  });

  const { email, firstName, lastName, phone } = watch();

  const handleSubmitEdit = useCallback(async () => {
    dispatch(
      loginUser({
        name: firstName + ' ' + lastName,
        email,
        phone,
      }),
    );
    navigation.goBack();
  }, [dispatch, email, firstName, lastName, phone, navigation]);

  return (
    <MainLayout
      hideBottomTabs
      isScrollable
      isFixedHeader
      header={
        <NavigationHeader
          startAction={<NavigationAction.BackButton />}
          title={'Edit Profile'}
        />
      }
    >
      <View style={styles().container}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="First Name"
              placeholder="Enter Yous First Name"
              onValueChange={onChange}
              value={value}
              errorMessage={errors.firstName?.message}
            />
          )}
          name="firstName"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Last Name ( Optional )"
              placeholder="Enter Yous Last Name"
              onValueChange={onChange}
              value={value}
              errorMessage={errors.lastName?.message}
            />
          )}
          name="lastName"
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
            />
          )}
          name="email"
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
          title="Update"
          alignSelf="stretch"
          size="large"
          onPress={handleSubmitEdit}
        />
      </View>
    </MainLayout>
  );
};

export default EditProfile;
