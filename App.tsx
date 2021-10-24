import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/Details';
import { Provider } from "react-redux";
import store from './redux/store';

const homeOpts = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: 'tomato' },
  headerTitle: (props:any) => <Text>{"LOGO"}</Text>,
  headerRight: () => (
    <Button
      onPress={() => console.log('This is a button!')}
      title="IC_Notifiche"
      color="#fff"
    />
  ),
  headerLeft: () => (
    <Button
      onPress={() => console.log('This is a button!')}
      title="IC_Search"
      color="#fff"
    />
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
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Create" component={()=><View><Text>{"Create"}</Text></View>} />
          <Tab.Screen name="Profile" component={()=><View><Text>{"Profile"}</Text></View>} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}