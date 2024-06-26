import { useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import VideoCard from '@/components/VideoCard';
import useAppwrite from '@/hooks/useAppwrite';
import { images } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getAllVideos, getLatestVideos } from '@/lib/appwrite';

const Home = () => {
  const { data: videos, refetch } = useAppwrite(getAllVideos);
  const { data: latestVideos } = useAppwrite(getLatestVideos);
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    refetch();

    setRefreshing(false);
  };

  return (
    <SafeAreaView className='h-full bg-primary'>
      <FlatList
        data={videos}
        keyExtractor={item => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 space-y-6 px-4'>
            <View className='mb-6 flex-row items-start justify-between'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome Back
                </Text>
                <Text className='taext-2xl font-psemibold text-white'>
                  {user?.username}
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='h-10 w-9'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pb-8 pt-5'>
              <Text className='mb-3 font-pregular text-lg text-gray-100'>
                Latest Videos
              </Text>

              <Trending videos={latestVideos ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            subtitle='Be the first one to upload a video'
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
