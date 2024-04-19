import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '@/components/EmptyState';
import InfoBox from '@/components/InfoBox';
import VideoCard from '@/components/VideoCard';
import useAppwrite from '@/hooks/useAppwrite';
import { icons } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getUserVideos } from '@/lib/appwrite';

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: videos } = useAppwrite(() => getUserVideos(user.$id));

  const logout = () => {};

  return (
    <SafeAreaView className='h-full bg-primary'>
      <FlatList
        data={videos}
        keyExtractor={item => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='mb-12 mt-6 w-full items-center justify-center px-4'>
            <TouchableOpacity
              className='mb-10 w-full items-end'
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='h-6 w-6'
              />
            </TouchableOpacity>

            <View className='h-16 w-16 items-center justify-center rounded-lg border border-secondary'>
              <Image
                source={{ uri: user?.avatar }}
                resizeMode='cover'
                className='h-[90%] w-[90%] rounded-lg'
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='mt-5 flex flex-row'>
              <InfoBox
                title={videos.length || 0}
                subtitle='Videos'
                titleStyles='text-xl'
                containerStyles='mr-10'
              />
              <InfoBox
                title='1.2k'
                subtitle='Followers'
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No videos found for this search query'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
