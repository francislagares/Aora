import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';

const App = () => {
  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='min-h-[85vh] w-full items-center px-4'>
          <Image
            source={images.logo}
            className='h-[84px] w-[130px]'
            resizeMode='contain'
          />

          <Image
            source={images.cards}
            className='h-[300px] w-full max-w-[380px]'
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-center text-3xl font-bold text-white'>
              Discover Endless Possibilities with{' '}
              <Text className='text-secondary-200'>Aora</Text>
            </Text>

            <Image
              source={images.path}
              className='absolute -bottom-2 -right-8 h-[15px] w-[136px]'
              resizeMode='contain'
            />
          </View>

          <Text className='mt-7 text-center font-pregular text-sm text-gray-100'>
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>

          <CustomButton
            title='Continue with Email'
            handlePress={() => router.push('/signIn')}
            containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
};

export default App;
