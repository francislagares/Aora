import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

import { icons } from '@/constants';

type FormFieldProps = {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (e: any) => void;
  otherStyles?: string;
  keyboardType?: string;
};

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className='h-16 w-full flex-row items-center space-x-4 rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary'>
      <TextInput
        className='mt-0.5 flex-1 font-pregular text-base text-white'
        value={value}
        placeholder='Search for a video topic'
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
      />

      <TouchableOpacity>
        <Image source={icons.search} className='h-5 w-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
