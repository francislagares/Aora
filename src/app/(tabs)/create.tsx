import { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { icons } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { createVideo } from '@/lib/appwrite';

type FormState = {
  title: string;
  video: DocumentPicker.DocumentPickerAsset | undefined;
  thumbnail: DocumentPicker.DocumentPickerAsset | undefined;
  prompt: string;
};

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: '',
    video: undefined,
    thumbnail: undefined,
    propmt: '',
  });

  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === 'image'
          ? ['image/png', 'image/jpg']
          : ['video/mp4', 'video/gif'],
    });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === 'video') {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      form.prompt === '' ||
      form.title === '' ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert('Please provide all fields');
    }

    setUploading(true);

    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });

      Alert.alert('Success', 'Post uploaded successfully');

      router.push('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: undefined,
        thumbnail: undefined,
        prompt: '',
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView className='my-6 px-4'>
        <Text className='font-psemibold text-2xl text-white'>Upload Video</Text>

        <FormField
          title='Video Title'
          value={form.title}
          placeholder='Give your video a catch title...'
          handleChangeText={e => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />

        <View className='mt-7 space-y-2'>
          <Text className='font-pmedium text-base text-gray-100'>
            Updload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                useNativeControls={true}
                resizeMode={ResizeMode.COVER}
                isLooping={true}
              />
            ) : (
              <View className='h-40 w-full items-center justify-center rounded-2xl bg-black-100 px-4'>
                <View className='h-14 w-14 items-center justify-center border border-dashed border-secondary-100'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='h-1/2 w-1/2'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className='mt-7 space-y-2'>
          <Text className='font-pmedium text-base text-gray-100'>
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className='h-64 w-full rounded-2xl'
              />
            ) : (
              <View className='flex h-16 w-full flex-row items-center justify-center space-x-2 rounded-2xl border-2 border-black-200 bg-black-100 px-4'>
                <Image
                  source={icons.upload}
                  resizeMode='contain'
                  alt='upload'
                  className='h-5 w-5'
                />
                <Text className='font-pmedium text-sm text-gray-100'>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title='AI Prompt'
          value={form.prompt}
          placeholder='The prompt you used to create this video'
          handleChangeText={e => setForm({ ...form, prompt: e })}
          otherStyles='mt-7'
        />

        <CustomButton
          title='Submit & Publish'
          handlePress={submit}
          containerStyles='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
