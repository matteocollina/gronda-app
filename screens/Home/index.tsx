import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getData} from '../../network/network';
import Carousel from "pinar";
import { getRandomColor } from '../../utils';
import FilterData from '../../model/Filter';
import Filter from '../../components/Filter';

const HomeScreen = ({navigation}: any) => {
  const FILTERS: FilterData[] = [new FilterData(1,"Creations"),new FilterData(2,"MasterClasses"),new FilterData(3,"Jobs"),]
  const [activeFilter, setActiveFilter] = useState<FilterData>(FILTERS[0]);

  const numColumns = 2;
  const size = Dimensions.get('window').width / numColumns;
  const BORDER_RADIUS = 10;
  const BORDER_RADIUS_FILTER = 20;
  const styles = StyleSheet.create({
    itemContainer: {
      width: "48%",
      height: size + 60,
      marginBottom:15
    },
    item: {
      backgroundColor: 'transparent',
    },
    slide1: {
      flex: 1,
      borderRadius:BORDER_RADIUS,
      overflow:"hidden",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    container:{
      marginRight:10, marginLeft:10
    }
  });

  return (
    <View style={{flex: 1}}>
      <View style={[{flex:1, flexDirection:"row", justifyContent:"flex-start", alignItems:"center"},styles.container]}>
      {
        FILTERS.map(filter => {
          return(
            <Filter key={filter.id} title={filter.title} onPress={()=>setActiveFilter(filter)} isActive={activeFilter?.id===filter?.id} containerStyle={{marginRight:10}}/>
          )
        })
      }
      </View>
      
      <View style={[{flex:2}]}>
        <Carousel showsControls={false} loop={true} 
        activeDotStyle={{
          backgroundColor: "white",
          width: 8,
          height: 8,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
          borderRadius:4
        }}
        dotStyle={{
          backgroundColor: "rgba(255,255,255,.5)",
          width: 8,
          height: 8,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
          borderRadius:4
        }}>
          {[1,2,3,4].map(i => {
            return(
              <View style={[styles.slide1,styles.container]}>
                <Image 
                style={{width:"100%",height:"100%",borderRadius:BORDER_RADIUS, position:"relative",
                overflow:"hidden"}}
                source={{uri:"https://d3566jsyo19arr.cloudfront.net/banner/marco_mueller_banner.jpg"}}/>
                <View style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,.2)"}}></View>
                <View style={{position:"absolute",backgroundColor:"transparent", top:"10%",left:15, height:"80%", width:"60%",  display:"flex", flexDirection:"column", alignContent:"space-around",
              justifyContent:"space-evenly"}}>
                  <Text style={{fontWeight:"bold",color:"#FFAE50"}}>{"NEW"}</Text>
                  <Text style={{fontWeight:"bold",color:"white", fontSize:20}}>{"Fish Preparation like a start chef"}</Text>
                  <Text style={{fontWeight:"300",color:"white"}}>{"With Rolf Fliegauf"}</Text>
                </View>
              </View>
            )
          })}
        </Carousel>
      </View>

      <View style={[{flex:4, marginTop:20},styles.container]}>
        <Text style={{fontWeight:"bold",fontSize:23}}>Creations for you</Text>
        <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
        style={{marginTop:20,display:"flex"}}
          data={getData().filter(d => d.category_id===activeFilter?.id)}
          renderItem={({item, index}) => (
            <View style={[styles.itemContainer]}>
              <Image source={{uri:item.img_url}}
              style={{width:"100%",height:"75%",borderRadius:BORDER_RADIUS,
              overflow:"hidden"}}/>
              <View>
                <Text style={{fontSize:16,fontWeight:"600", marginTop:8}}>{item.title}</Text>
                <Text style={{fontSize:14,marginTop:10}}>{"Story Author"}</Text>
              </View>
              
            </View>
          )}
          keyExtractor={item => `${item.id}`}
          numColumns={numColumns}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
