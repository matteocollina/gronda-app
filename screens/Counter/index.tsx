import {useNavigationState} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Text, View} from 'react-native';
import {connect, useStore} from 'react-redux';
import {TGeneral, TGeneralStore} from '../../redux/reducers';
import {getRandomColor} from '../../utils';

const CounterScreen = () => {
  const store: TGeneralStore = useStore();
  const [count, setCount] = useState<number | undefined>();
  const screenName = useNavigationState(
    state => state.routes[state.index].name,
  );
  const [bgColor, setGgColor] = useState<string>(getRandomColor());

  const anim = useRef(new Animated.Value(1));

  useEffect(() => {
    const nextValue =  Object(store?.getState()?.general?.countMap)?.[screenName] || 1;
    console.log(store?.getState()?.general?.countMap,count)
    if(nextValue!=count){
      setCount(nextValue-1);
      setTimeout(()=>{
        setCount(nextValue);

        // makes the sequence loop
        Animated.loop(
          // runs given animations in a sequence
          Animated.sequence([
            // increase size
            Animated.timing(anim.current, {
              toValue: 1.2, 
              duration: 200,
              useNativeDriver: true
            }),
            // decrease size
            Animated.timing(anim.current, {
              toValue: 1, 
              duration: 200,
              useNativeDriver: true
            }),
          ])
        ,{iterations:2}).start();

      },600)
    }
  }, [store?.getState()?.general?.countMap]);


  return (
    <View
      style={{
        backgroundColor: bgColor,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View style={{ transform: [{ scale: anim.current }] }}>
        <Text
          style={{
            fontSize: Dimensions.get('window').width * 0.4,
            color: 'white',
            fontWeight: 'bold',
          }}>
          {count!==undefined ? count : undefined}
        </Text>
      </Animated.View>
      <Text style={{fontSize: 20, color: 'white',fontWeight: '700',}}>{`Visit${
        count !== undefined ? (count > 1 ? 's' : '') : ''
      }`}</Text>
    </View>
  );
};

export default connect(
  (state: TGeneral, ownProps) => ({
    general: state.general,
  }),
  null,
)(CounterScreen);
