import React, { useEffect } from 'react';
import { Button, Image, Text, View } from "react-native";
import Creation from '../../model/Creation';

interface IDetailsScreen{
  params: {
    item: Creation
  }
}

const DetailsScreen = ({route, navigation}:{route: IDetailsScreen,navigation: any}) => {
  const {item} = route.params
  console.log(">",item.img_url)
  return (
      <View style={{ display:"flex",flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flex:1,width:"100%"}}>
          <Image source={{uri:item.img_url}}
                style={{width:"100%",height:"100%"}}/>
        </View>
        <View style={{flex:1, display:"flex", alignItems:"flex-start", width:"100%"}}>
          <Text style={{marginTop:30, fontWeight:"bold", fontSize:20, marginLeft:20}}>{route.params.item.title}</Text>
        </View>
      </View>
    );
  };

export default DetailsScreen;