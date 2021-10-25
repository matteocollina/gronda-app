import {FC} from 'react';
import React, {useEffect} from 'react';
import { Button, GestureResponderEvent, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface IFilter {
  isActive?: boolean;
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
}

const Filter: FC<IFilter> = ({isActive, title, containerStyle, onPress}: IFilter) => {
  return (
    <TouchableOpacity onPress={onPress} 
    
    style={[{
        overflow: 'hidden',
        backgroundColor: isActive ? 'black' : 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        },containerStyle]}>
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
