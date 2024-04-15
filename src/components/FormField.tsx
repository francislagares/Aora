import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { icons } from '@/constants';

type FormFieldProps = {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: any) => void;
  otherStyles: string;
  keyboardType?: string;
};

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='font-pmedium text-base text-gray-100'>{title}</Text>

      <View className='h-16 w-full flex-row items-center rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary'>
        <TextInput
          className='flex-1 font-psemibold text-base text-white'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='h-6 w-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
