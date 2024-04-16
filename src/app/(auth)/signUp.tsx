import { useState } from 'react';
import { Link, router } from 'expo-router';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { images } from '@/constants';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      // TODO -> Set it to global state

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Sign up to Aora
          </Text>

          <FormField
            title='Username'
            value={form.username}
            handleChangeText={e => setForm({ ...form, username: e })}
            otherStyles='mt-10'
          />

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
            title='Sign Up'
            handlePress={submitForm}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex-row justify-center gap-2 pt-5'>
            <Text className='font-pregular text-lg text-gray-100'>
              Have an account already?
            </Text>
            <Link
              href='/signIn'
              className='font-psemibold text-lg text-secondary'
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
