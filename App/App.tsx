import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import {createStackNavigator} from '@react-navigation/stack';
import { BottomBar } from './src/components/BottomBar';
import { Text, View } from 'react-native';

const Stack = createStackNavigator()

export const Tmp: React.FC = () => {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>test</Text>
    </View>
  )
}

export const Tmp2: React.FC = () => {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>test2</Text>
    </View>
  )
}

export default function App() {
  const list: { name: string, navigationComponent: React.ComponentType, bottomBarComponent: React.JSX.Element }[]
  = [{name: "test", navigationComponent: Tmp, bottomBarComponent: <Tmp />},
  {name: "test2", navigationComponent: Tmp2, bottomBarComponent: <Tmp2 />}];


  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    <NavigationContainer>
      <BottomBar list={list} />
    </NavigationContainer>
    </>
  );
}


