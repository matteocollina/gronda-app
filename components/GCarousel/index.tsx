import {FC} from 'react';
import React from 'react';
import {
  Image,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Carousel from 'pinar';
import style from './style';

interface ICarousel {
  height?: number;
  containerSlideStyle?: StyleProp<ViewStyle>;
}

const GCarousel: FC<ICarousel> = ({height, containerSlideStyle}: ICarousel) => {
  /**
   * In the production version of component use a property "items" to pass all slides to carousel
   */
  return (
    <Carousel
      height={height || 250}
      showsControls={false}
      loop={true}
      autoplay
      activeDotStyle={style.activeDot}
      dotStyle={style.dotStyle}>
      {[1, 2, 3, 4].map(i => {
        return (
          <View key={i} style={[style.containerSlide, containerSlideStyle]}>
            <Image
              style={style.image}
              source={{
                uri: 'https://d3566jsyo19arr.cloudfront.net/banner/marco_mueller_banner.jpg',
              }}
            />
            <View style={style.overlayCard}></View>
            <View style={style.containerText}>
              <Text style={style.category}>{'NEW'}</Text>
              <Text style={style.title}>
                {'Fish Preparation like a start chef'}
              </Text>
              <Text style={style.subtitle}>{'With Rolf Fliegauf'}</Text>
            </View>
          </View>
        );
      })}
    </Carousel>
  );
};
export default GCarousel;
