import * as React from 'react';
import { Button, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './../screens/Home';
import DetailsScreen from './../screens/Details';
import { connect, Provider, useDispatch } from "react-redux";
import store from './../redux/store';
import CounterScreen from './../screens/Counter';
import { actSetGeneral } from './../redux/actions';
import { TGeneral } from './../redux/reducers';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../assets/consts';

const homeOpts = (navigation:any) => {
  return({
    headerShadowVisible: true,
    headerTitleAlign: 'center',
    headerStyle: {background:"transparent"
  },
    headerTintColor: 'white',
  headerTitle: (props:any) =>  <View style={{display:"flex",
  alignItems:"center", justifyContent:"center", width:"70%"}}>
    <Image 
  style={{width:"100%",height:40}}
  resizeMode={"contain"}
  source={require("./../assets/images/gronda_web_logo_medium_caribbean.png")} 
  />
  </View>
  ,
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.push("Message")}
     >
       <Image 
       style={{width:25,height:25}}
       source={require("./../assets/images/message.png")} 
       height={25} width={25}/>
       </TouchableOpacity>
  ),
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Search")
        }}
     >
       <Image 
       style={{width:25,height:25}}
       source={require("./../assets/images/search.png")} 
       height={25} width={25}/>
       </TouchableOpacity>
  ),
  })
}
const detailsOpts = (navigation:any) =>  {
  return(
    {      
      headerLeft: (props:any) => (
        <TouchableOpacity
      onPress={() => navigation.goBack()}
     >
       <Image 
       style={{width:45,height:45}}
       source={require("./../assets/images/back.png")} 
       height={45} width={45}/>
       </TouchableOpacity>
      ),
      headerTintColor:"transparent",
      headerTitle:"",
      headerShadowVisible: false,
      headerTransparent:true,
      headerStyle: { backgroundColor: 'transparent',elevation: 0,
      shadowOpacity: 0,borderTopWidth: 0 },
      headerBackTitle:"",
    }
  )
}

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator defaultScreenOptions={{
      headerStyle: {
        backgroundColor: "transparent"
      }
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={({ navigation, route }) => ({
          ...homeOpts(navigation)
        })}
      />
      {[{name:"Details",component:DetailsScreen},{name:"Search",component:CounterScreen}
      ,{name:"Message",component:CounterScreen}].map((r:any)=>{
          return(
                <HomeStack.Screen name={r.name} component={r.component} options={({ navigation, route }) => ({
                  ...detailsOpts(navigation),
                })}
            />
          )
      })}
    </HomeStack.Navigator>
  );
}

const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();
function HomeTabs() {
    const dispatch = useDispatch();

  const heightTab = Dimensions.get("window").height * 0.1;
  const iconSize = 30
  const iconCreateSize = 40
  console.log("heightTab",heightTab,Dimensions.get("window").height)
  return(
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('./../assets/images/Homeselected.png')
                : require('./../assets/images/Homeselected.png');
            } else if (route.name === 'Create') {
              iconName = focused ? require('./../assets/images/createbutton.png') : require('./../assets/images/createbutton.png');
            } else if (route.name === 'Profile') {
              iconName = focused ? require('./../assets/images/profile-06.png') : require('./../assets/images/profile-06.png');
            }
            const _tintStyle = route.name === 'Create' ? {} : {tintColor: focused ? PRIMARY_COLOR : SECONDARY_COLOR}
            return <View style={{marginTop:15}}>
                <Image style={{width: route.name === 'Create' ? iconCreateSize : iconSize,
                height: route.name === 'Create' ? iconCreateSize : iconSize,
                ..._tintStyle}} source={iconName}/>
            </View>;
          },
          tabBarStyle:{
              height:heightTab,
              minHeight:100,
              maxHeight:100
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
          tabBarInactiveTintColor: SECONDARY_COLOR,
          headerShown: false,
          tabBarLabelStyle: {
              fontSize:12, paddingTop: 15,paddingBottom: 5,
          }
        })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen}/>
          <Tab.Screen name="Create" component={CounterScreen} options={({ navigation, route }) => ({
                ...detailsOpts(navigation)
            })}/>
          <Tab.Screen name="Profile" component={CounterScreen} options={({ navigation, route }) => ({
                ...detailsOpts(navigation)
            })}/>

        </Tab.Navigator>
  )
}

function Router() {
  const navigationRef = useNavigationContainerRef(); 
  const dispatch = useDispatch();

  return (
      <NavigationContainer
      
        onStateChange={(state) => {
          const route = navigationRef.current?.getCurrentRoute();
          const currentScreen: string = route!.name;
          dispatch(actSetGeneral({
              countMap:{
                ...(store.getState()?.general?.countMap || {}),
                [currentScreen]: (store.getState()?.general?.countMap?.[currentScreen] || 0) + 1
              }
          }))
        }}
      ref={navigationRef}
      >
      <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Home" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default connect((state:TGeneral, ownProps) => ({
  general: state.general
}), {actSetGeneral})(Router);