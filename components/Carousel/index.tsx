import {FC} from 'react';
import React, {useEffect} from 'react';
import {
  Button,
  GestureResponderEvent,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Carousel from 'pinar';
import {BORDER_RADIUS} from '../../assets/consts';

interface ICarousel {
    height?: number;
    containerSlideStyle?: StyleProp<ViewStyle>;
}

const GCarousel: FC<ICarousel> = ({
    height,
    containerSlideStyle
}: ICarousel) => {
  const styles = StyleSheet.create({
    slide1: {
      flex: 1,
      borderRadius: BORDER_RADIUS,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    }
  });

  return (
    <Carousel
      height={height || 250}
      showsControls={false}
      loop={true}
      autoplay
      activeDotStyle={{
        backgroundColor: 'white',
        width: 8,
        height: 8,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 4,
      }}
      dotStyle={{
        backgroundColor: 'rgba(255,255,255,.5)',
        width: 8,
        height: 8,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 4,
      }}>
      {[1, 2, 3, 4].map(i => {
        return (
          <View style={[styles.slide1, containerSlideStyle]}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: BORDER_RADIUS,
                position: 'relative',
                overflow: 'hidden',
              }}
              source={{
                uri: 'https://d3566jsyo19arr.cloudfront.net/banner/marco_mueller_banner.jpg',
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,.2)',
              }}></View>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                top: '10%',
                left: 15,
                height: '80%',
                width: '60%',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'space-around',
                justifyContent: 'space-evenly',
              }}>
              <Text style={{fontWeight: 'bold', color: '#FFAE50'}}>
                {'NEW'}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 20,
                }}>
                {'Fish Preparation like a start chef'}
              </Text>
              <Text style={{fontWeight: '600', color: 'white'}}>
                {'With Rolf Fliegauf'}
              </Text>
            </View>
          </View>
        );
      })}
    </Carousel>
  );
};
export default GCarousel;
