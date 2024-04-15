import { useState } from 'react';
import { Link } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { images } from '@/constants';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {};

  return (
    <SafeAreaView className='h-full bg-primary '>
      <ScrollView>
        <View className='h- my-6 min-h-[85vh] w-full justify-center px-4'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='h-[35px] w-[135px] '
          />
          <Text className='text-semibold mt-10 font-psemibold text-2xl text-white'>
            Log in to Aora
          </Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={e => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={e => setForm({ ...form, password: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <CustomButton
            title='Sign In'
            handlePress={submitForm}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex-row justify-center gap-2 pt-5'>
            <Text className='font-pregular text-lg text-gray-100'>
              Don't have account?
            </Text>
            <Link
              href='/signUp'
              className='font-psemibold text-lg text-secondary'
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
