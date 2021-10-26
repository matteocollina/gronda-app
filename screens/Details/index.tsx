import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Button, Image, Text, View } from "react-native";
import { PRIMARY_COLOR } from '../../assets/consts';
import Creation from '../../model/Creation';

interface IDetailsScreen{
  params: {
    item: Creation
  }
}

const DetailsScreen = ({route, navigation}:{route: IDetailsScreen,navigation: any}) => {
  const opacity = new Animated.Value(0);
  const {item} = route.params

  return (
      <View style={{ display:"flex",flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flex:1,width:"100%",backgroundColor:PRIMARY_COLOR,justifyContent: 'center', alignItems: 'center'}}>
          <Animated.Image source={{uri:item.img_url}}
          onLoadEnd={()=>{
            Animated.timing(opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true
            }).start();
          }}
                style={[{width:"100%",height:"100%"},{opacity:opacity}]}/>
        </View>
        <View style={{flex:1, display:"flex", alignItems:"flex-start", width:"100%"}}>
          <Text style={{marginTop:30, fontWeight:"bold", fontSize:20, marginLeft:20}}>{route.params.item.title}</Text>
        </View>
      </View>
    );
  };

export default DetailsScreen;