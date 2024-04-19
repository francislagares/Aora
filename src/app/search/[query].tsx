import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';
import VideoCard from '@/components/VideoCard';
import useAppwrite from '@/hooks/useAppwrite';
import { searchVideos } from '@/lib/appwrite';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: videos, refetch } = useAppwrite(() => searchVideos(query));

  console.log(query, videos);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className='h-full bg-primary'>
      <FlatList
        data={videos}
        keyExtractor={item => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 flex px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search Results
            </Text>
            <Text className='mt-1 font-psemibold text-2xl text-white'>
              {query}
            </Text>

            <View className='mb-8 mt-6'>
              <SearchInput />
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

export default Search;
