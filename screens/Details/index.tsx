import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Button,
  Image,
  Text,
  View,
} from 'react-native';
import {PRIMARY_COLOR} from '../../assets/consts';
import Creation from '../../model/Creation';
import style from './style';

interface IDetailsScreen {
  params: {
    item: Creation;
  };
}

const DetailsScreen = ({
  route,
  navigation,
}: {
  route: IDetailsScreen;
  navigation: any;
}) => {
  const opacity = new Animated.Value(0);
  const {item} = route.params;

  return (
    <View style={style.container}>
      <View style={style.containerImg}>
        <Image
          source={require('./../../assets/images/gronda_web_logo_medium_caribbean.png')}
          style={style.placeholderImg}
          resizeMode={'contain'}
        />
        <Animated.Image
          source={{uri: item.img_url}}
          onLoadEnd={() => {
            Animated.timing(opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }}
          style={[{width: '100%', height: '100%'}, {opacity: opacity}]}
        />
      </View>
      <View style={style.containerText}>
        <Text style={style.text}>{route.params.item.title}</Text>
      </View>
    </View>
  );
};

export default DetailsScreen;
