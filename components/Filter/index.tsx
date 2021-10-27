import {FC} from 'react';
import React from 'react';
import { GestureResponderEvent, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import style from './style';

interface IFilter {
  isActive?: boolean;
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
  testId?: string;
}

const Filter: FC<IFilter> = ({isActive, title, containerStyle, onPress, testId}: IFilter) => {
  return (
    <TouchableOpacity onPress={onPress} 
    testID={testId}
    style={[{
        backgroundColor: isActive ? 'black' : 'white',
        },style.container,containerStyle]}>
        <View >
        <Text
        style={{fontWeight: 'bold',
        color: !isActive ? 'black' : 'white',}}
            >
            {title}
        </Text>
        </View>
    </TouchableOpacity>
  );
};
export default Filter;
