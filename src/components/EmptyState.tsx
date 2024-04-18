import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';
import CustomButton from './CustomButton';
import { images } from '@/constants';

type EmptyStateProps = {
  title: string;
  subtitle: string;
};

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className='items-center justify-center px-4'>
      <Image
        source={images.empty}
        className='h-[215px] w-[270px]'
        resizeMode='contain'
      />

      <Text className='mt-2 text-center font-psemibold text-xl text-white'>
        {title}
      </Text>
      <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>

      <CustomButton
        title='Create video'
        handlePress={() => router.push('/create')}
        containerStyles='w-full my-5'
      />
    </View>
  );
};

export default EmptyState;
