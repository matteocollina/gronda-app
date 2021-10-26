import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {getData} from '../../network/network';
import FilterData from '../../model/Filter';
import Filter from '../../components/Filter';
import GCarousel from '../../components/GCarousel';
import ProgressiveFastImage from '@freakycoder/react-native-progressive-fast-image';
import style from './style';

const HomeScreen = ({navigation}: any) => {
  const FILTERS: FilterData[] = [
    new FilterData(1, 'Creations'),
    new FilterData(2, 'Masterclasses'),
    new FilterData(3, 'Jobs'),
  ];
  const [activeFilter, setActiveFilter] = useState<FilterData>(FILTERS[0]);

  const numColumns = 2;
  const MARGIN = 10;

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        ListHeaderComponentStyle={{margin: 0}}
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={[style.containerFilters, style.container]}>
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

              <View style={style.containerCarousel}>
                <GCarousel containerSlideStyle={style.container} />
              </View>

              <Text style={[style.titleSection, style.container]}>
                {`${activeFilter.title} for you`}
              </Text>
            </View>
          );
        }}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={[{marginBottom: 20, display: 'flex'}]}
        data={getData().filter(d => d.category_id === activeFilter?.id)}
        renderItem={({item, index}) => (
          /**
           * We could move this code to a single component (e.g Card) if used in other screens,
           * not in this case.
           */
          <TouchableOpacity
            style={[
              style.itemContainer,
              {
                marginBottom: 40,
                marginRight: index % 2 !== 0 ? MARGIN : 0,
                marginLeft: index % 2 === 0 ? MARGIN : 0,
              },
            ]}
            activeOpacity={0.9}
            key={index}
            onPress={() => navigation.navigate('Details', {item: item})}>
            <View style={{display: 'flex', flex: 1}}>
              <View style={{display: 'flex', justifyContent: 'center'}}>
                <ProgressiveFastImage
                  source={{uri: item.img_url}}
                  thumbnailSource={require('./../../assets/images/gronda_web_logo_medium_caribbean.png')}
                  style={style.cardImg}
                />
              </View>
              <View style={{display: 'flex'}}>
                <Text style={style.titleCard}>
                  {item.title}
                </Text>
                <Text style={style.subtitleCard}>
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
