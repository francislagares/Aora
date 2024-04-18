import React, { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { icons } from '@/constants';
import { VideoProps, TrendingItemProps } from '@/types/video';

const zoomIn: any = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut: any = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem && activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying ? (
        <Video
          source={{ uri: item.video }}
          className='mt-3 h-72 w-52 rounded-[33px] bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={status => {
            if (status.didJustFinish) {
              setIsPlaying(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className='relative flex items-center justify-center'
          activeOpacity={0.7}
          onPress={() => setIsPlaying(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className='my-5 h-72 w-52 overflow-hidden rounded-[33px] shadow-lg shadow-black/40'
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            className='absolute h-12 w-12'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ videos }: VideoProps) => {
  const [activeItem, setActiveItem] = useState(videos[0]);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={videos}
      horizontal
      keyExtractor={item => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;
