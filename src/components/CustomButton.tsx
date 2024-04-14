import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  textStyles?: string;
  containerStyles?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`min-h-[62px] items-center justify-center rounded-xl bg-secondary-200 ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`font-psemibold text-lg text-primary ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
