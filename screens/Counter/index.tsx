import React, { useEffect } from 'react';
import { Text, View } from "react-native";

const CounterScreen = () => {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  };
  CounterScreen.options = {
    topBar: {
      title: {
        text: 'Counter'
      }
    },
    bottomTab: {
      text: 'Counter'
    }
  };

export default CounterScreen;