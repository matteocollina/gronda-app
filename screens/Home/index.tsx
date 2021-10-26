import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getData} from '../../network/network';
import {getRandomColor} from '../../utils';
import FilterData from '../../model/Filter';
import Filter from '../../components/Filter';
import {BORDER_RADIUS, SECONDARY_COLOR} from '../../assets/consts';
import GCarousel from '../../components/Carousel';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";

const HomeScreen = ({navigation}: any) => {
  const FILTERS: FilterData[] = [
    new FilterData(1, 'Creations'),
    new FilterData(2, 'Masterclasses'),
    new FilterData(3, 'Jobs'),
  ];
  const [activeFilter, setActiveFilter] = useState<FilterData>(FILTERS[0]);

  const numColumns = 2;
  const size = Dimensions.get('window').width / numColumns;
  const MARGIN = 10;
  const styles = StyleSheet.create({
    itemContainer: {
      width: size - MARGIN * 2,
      height: size + 60,
      marginBottom: 15,
    },
    item: {
      backgroundColor: 'transparent',
    },
    slide1: {
      flex: 1,
      borderRadius: BORDER_RADIUS,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    container: {
      marginRight: 10,
      marginLeft: 10,
    },
  });

  return (
    <View style={{flex: 1, backgroundColor:"white", 
    }}>
      <FlatList
        ListHeaderComponentStyle={{margin: 0}}
        ListHeaderComponent={() => {
          return (
            <View>
              <View
                style={[
                  {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 20,
                    marginTop: 20, 
                  },
                  styles.container,
                ]}>
                {FILTERS.map(filter => {
                  return (
                    <Filter
                      key={filter.id}
                      title={filter.title}
                      onPress={() => setActiveFilter(filter)}
                      isActive={activeFilter?.id === filter?.id}
                      containerStyle={{marginRight: 10}}
                    />
                  );
                })}
              </View>

              <View style={[{flex: 2, marginBottom: 30}]}>
                <GCarousel containerSlideStyle={styles.container} />
              </View>

              <Text
                style={[
                  {fontWeight: 'bold', fontSize: 23, marginBottom: 20},
                  styles.container,
                ]}>
                {`${activeFilter.title} for you`}
              </Text>
            </View>
          );
        }}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={[{marginBottom:20, display: 'flex'}]}
        data={getData().filter(d => d.category_id === activeFilter?.id)}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.itemContainer,
              {
                marginBottom:40,
                marginRight: index % 2 !== 0 ? MARGIN : 0,
                marginLeft: index % 2 === 0 ? MARGIN : 0,
              },
            ]}
            activeOpacity={0.9}
            key={index}
            onPress={() => navigation.navigate('Details', {item: item})}>
            <View style={{display:"flex", flex:1}}>
              <View style={{display:"flex",justifyContent:"center"}}>
                <ProgressiveFastImage
                  source={{uri:item.img_url}}
                  thumbnailSource={require("./../../assets/images/gronda_web_logo_medium_caribbean.png")}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: BORDER_RADIUS,
                    overflow: 'hidden',
                  }}
                />
              </View>

              <View style={{display:"flex"}}>
                <Text style={{fontSize: 16, fontWeight: '600', marginTop: 8}}>
                  {item.title}
                </Text>
                <Text style={{fontSize: 14, marginTop: 10}}>
                  {'Story Author'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => `${item.id}`}
        numColumns={numColumns}
      />
    </View>
  );
};

export default HomeScreen;
