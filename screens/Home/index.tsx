import React, { useEffect } from 'react';
import { Button, Text, View } from "react-native";

const HomeScreen = ({ navigation }:any) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      </View>
    );
  };

export default HomeScreen;