import * as React from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/Details';
import { Provider } from "react-redux";
import store from './redux/store';

const homeOpts = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: 'transparent' },
  headerTitle: (props:any) =>  <View style={{display:"flex",alignItems:"center", width:"70%"}}>
    <Image 
  style={{width:"100%",height:40}}
  resizeMode={"contain"}
  source={require("./assets/images/gronda_web_logo_medium_caribbean.png")} 
  />
  </View>
  ,
  headerRight: () => (
    <TouchableOpacity
      onPress={() => console.log('TODO:This is a button!')}
     >
       <Image 
       style={{width:25,height:25}}
       source={require("./assets/images/message.png")} 
       height={25} width={25}/>
       </TouchableOpacity>
  ),
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => console.log('TODO:This is a button!')}
     >
       <Image 
       style={{width:25,height:25}}
       source={require("./assets/images/search.png")} 
       height={25} width={25}/>
       </TouchableOpacity>
  ),
}
const detailsOpts = (navigation:any) =>  {
  return(
    {
      headerStyle: { backgroundColor: 'transparent' },
      headerTitle: (props:any) => <Text></Text>,
      headerLeft: (props:any) => (
        <Button
          onPress={() => navigation.goBack()}
          title="IC_BACK"
          color="black"
        />
      ),
    }
  )
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={homeOpts}/>
      <HomeStack.Screen name="Details" component={DetailsScreen} options={({ navigation, route }) => ({
          ...detailsOpts(navigation)
        })}
      />
    </HomeStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();


export default function App() {
  const navigationRef = useNavigationContainerRef(); 
  
  return (
    <Provider store={store}>
      <NavigationContainer
        onStateChange={(state) => {
          const route = navigationRef.current?.getCurrentRoute();
          const currentScreen = route?.name;
          console.log(">>",currentScreen) //TODO: Update
        }}
      ref={navigationRef}
      >
        <Tab.Navigator 
        
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('./assets/images/Homeselected.png')
                : require('./assets/images/Homeselected.png');
            } else if (route.name === 'Create') {
              iconName = focused ? require('./assets/images/createbutton.png') : require('./assets/images/createbutton.png');
            } else if (route.name === 'Profile') {
              iconName = focused ? require('./assets/images/profile-06.png') : require('./assets/images/profile-06.png');
            }

            // You can return any component that you like here!
            return <Image style={{width:25,height:25}} source={iconName}/>;
          },
          tabBarActiveTintColor: '#04B0A6',
          tabBarInactiveTintColor: '#333333',
          headerShown: false
        })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen}/>
          <Tab.Screen name="Create" component={()=><View><Text>{"Create"}</Text></View>} />
          <Tab.Screen name="Profile" component={()=><View><Text>{"Profile"}</Text></View>} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}