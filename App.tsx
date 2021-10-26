import * as React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { connect, Provider, useDispatch } from "react-redux";
import store from './redux/store';
import Router from './router';
function App() {
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  );
}


export default App;