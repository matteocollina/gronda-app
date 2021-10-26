import {useNavigationState} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {connect, useStore} from 'react-redux';
import {TGeneral, TGeneralStore} from '../../redux/reducers';
import {getRandomColor} from '../../utils';

const CounterScreen = () => {
  const store: TGeneralStore = useStore();
  const [count, setCount] = useState<number | undefined>();
  const screenName = useNavigationState(
    state => state.routes[state.index].name,
  );

  useEffect(() => {
    const nextValue =  Object(store?.getState()?.general?.countMap)?.[screenName] || 1;
    console.log(store?.getState()?.general?.countMap,count)
    if(nextValue!=count){
      setCount(nextValue);
    }
  }, [store?.getState()?.general?.countMap]);
  return (
    <View
      style={{
        backgroundColor: getRandomColor(),
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: Dimensions.get('window').width * 0.4,
          color: 'white',
          fontWeight: 'bold',
        }}>
        {count}
      </Text>
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
