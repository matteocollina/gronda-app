import React, {useEffect} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getData} from '../../network/network';
import Carousel from "pinar";

const HomeScreen = ({navigation}: any) => {
  const numColumns = 2;
  const size = Dimensions.get('window').width / numColumns;
  const styles = StyleSheet.create({
    itemContainer: {
      width: size,
      height: size,
    },
    item: {
      flex: 1,
      margin: 3,
      backgroundColor: 'lightblue',
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#a3c9a8',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#84b59f',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#69a297',
    },
    text: {
      color: '#1f2d3d',
      opacity: 0.7,
      fontSize: 48,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex:1}}>
        <Carousel showsControls={false} >
          <View style={styles.slide1}>
            <Text style={styles.text}>1</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>2</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>3</Text>
          </View>
        </Carousel>
      </View>

      <View style={{flex:1}}>
        <FlatList
          data={getData()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.item}>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          numColumns={numColumns}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
