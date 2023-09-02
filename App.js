import React from "react";
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import  MainPage  from './src/components/MainPage';
import AllCoins from './src/components/AllCoins'; // Corrected import
import CoinInfo from "./src/components/CoinInfo";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MainPage' component={MainPage} />
      <Stack.Screen name='CoinInfo' component={CoinInfo} />
      <Stack.Screen name='AllCoins' component={AllCoins} />


      {/* You can add more screens to the stack here if needed */}
    </Stack.Navigator>
  );
}

function App() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <NavigationContainer>
        <Tab.Navigator
          shifting={true}
          activeColor="#EACC00"
          inactiveColor="#333333"
          barStyle={{ backgroundColor: '#ffffff' }}
        >
          <Tab.Screen
            name='MainPage'
            component={MainStack}
            options={{
              tabBarLabel: 'Main Page',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name='AllCoins'
            component={AllCoins}
            options={{
              tabBarLabel: 'All Coins',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="currency-usd" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

  },
});

export default App;
