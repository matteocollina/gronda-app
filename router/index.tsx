import * as React from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './../screens/Home';
import DetailsScreen from './../screens/Details';
import {connect, useDispatch} from 'react-redux';
import store from './../redux/store';
import CounterScreen from './../screens/Counter';
import {actSetGeneral} from './../redux/actions';
import {TGeneral} from './../redux/reducers';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/consts';
import style from './style';

export enum Routes {
  Home = "Home",
  Create = "Create",
  Profile = "Profile"
}

const homeOpts = (navigation: any) => {
  const dimensionIcon = 25
  return {
    headerShadowVisible: true,
    headerTitleAlign: 'center',
    headerStyle: {background: 'transparent'},
    headerTintColor: 'white',
    headerTitle: (props: any) => (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%',
        }}>
        <Image
          style={{width: '100%', height: 40}}
          resizeMode={'contain'}
          source={require('./../assets/images/gronda_web_logo_medium_caribbean.png')}
        />
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.push('Message')}>
        <Image
          style={{width: dimensionIcon, height: dimensionIcon}}
          source={require('./../assets/images/message.png')}
          height={dimensionIcon}
          width={dimensionIcon}
        />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.push('Search');
        }}>
        <Image
          style={{width: dimensionIcon, height: dimensionIcon}}
          source={require('./../assets/images/search.png')}
          height={dimensionIcon}
          width={dimensionIcon}
        />
      </TouchableOpacity>
    ),
  };
};
const detailsOpts = (navigation: any) => {
  return {
    headerLeft: (props: any) => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{width: 45, height: 45}}
          source={require('./../assets/images/back.png')}
          height={45}
          width={45}
        />
      </TouchableOpacity>
    ),
    headerTintColor: 'transparent',
    headerTitle: '',
    headerShadowVisible: false,
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      borderTopWidth: 0,
    },
    headerBackTitle: '',
  };
};

// Stack Home
function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator
      defaultScreenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <HomeStack.Screen
        name="HomeNavigator"
        component={HomeScreen}
        options={({navigation, route}) => ({
          ...homeOpts(navigation),
        })}
      />
      {[
        {name: 'Details', component: DetailsScreen},
        {name: 'Search', component: CounterScreen},
        {name: 'Message', component: CounterScreen},
      ].map((r: any, index:number) => {
        return (
          <HomeStack.Screen
          key={index}
            name={r.name}
            component={r.component}
            options={({navigation, route}) => ({
              ...detailsOpts(navigation),
            })}
          />
        );
      })}
    </HomeStack.Navigator>
  );
}

// Tab Stack
function StackTabs() {
  const Tab = createBottomTabNavigator();
  const heightScreen = Dimensions.get('window').height;
  const heightTab =
    heightScreen > 600 ? heightScreen * 0.15 : heightScreen * 0.1;
  const iconSize = 30;
  const iconCreateSize = 40;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === Routes.Home) {
            iconName = require('./../assets/images/Homeselected.png');
          } else if (route.name === Routes.Create) {
            iconName = require('./../assets/images/createbutton.png');
          } else if (route.name === Routes.Profile) {
            iconName = require('./../assets/images/profile-06.png');
          }
          const _tintStyle =
            route.name === Routes.Create
              ? {}
              : {tintColor: focused ? PRIMARY_COLOR : SECONDARY_COLOR};
          return (
            <View style={{marginTop: 15}}>
              <Image
                style={{
                  width: route.name === Routes.Create ? iconCreateSize : iconSize,
                  height: route.name === Routes.Create ? iconCreateSize : iconSize,
                  ..._tintStyle,
                }}
                source={iconName}
              />
            </View>
          );
        },
        tabBarStyle: {
          height: heightTab,
          minHeight: 70,
          maxHeight: 100,
        },
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: SECONDARY_COLOR,
        headerShown: false,
        tabBarLabelStyle: style.tabBarLabelStyle,
      })}>
      <Tab.Screen name={Routes.Home} component={HomeStackScreen} />
      <Tab.Screen
        name={Routes.Create} 
        component={CounterScreen}
        options={({navigation, route}) => ({
          ...detailsOpts(navigation),
        })}
      />
      <Tab.Screen
        name={Routes.Profile} 
        component={CounterScreen}
        options={({navigation, route}) => ({
          ...detailsOpts(navigation),
        })}
      />
    </Tab.Navigator>
  );
}

// Main Router
function Router() {
  const Stack = createNativeStackNavigator();
  const navigationRef = useNavigationContainerRef();
  const dispatch = useDispatch();

  return (
    <NavigationContainer
      onStateChange={state => {
        const route = navigationRef.current?.getCurrentRoute();
        const currentScreen: string = route!.name;
        // Increment count of visits for each page
        dispatch(
          actSetGeneral({
            countMap: {
              ...(store.getState()?.general?.countMap || {}),
              [currentScreen]:
                (store.getState()?.general?.countMap?.[currentScreen] || 0) + 1,
            },
          }),
        );
      }}
      ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainHome" component={StackTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default connect(
  (state: TGeneral, ownProps) => ({
    general: state.general,
  }),
  {actSetGeneral},
)(Router);
