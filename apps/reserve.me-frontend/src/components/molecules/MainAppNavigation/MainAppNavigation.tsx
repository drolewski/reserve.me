import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Register from '../Register/Register';
import Login from '../Login/Login';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserNavigatorStack from '../User/UserNavigatorStack';
import CompanyNavigatorStack from '../Company/CompanyNavigatorStack';

const Tab = createBottomTabNavigator();

const MainAppNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
      <Tab.Screen options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="home" color={color} size={size}/>
        )
      }} name="Login" component={Login}/>
      <Tab.Screen options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="magnify" color={color} size={size}/>
        )
      }} name="Search" component={Register}/>
      {/* TOOD condition */}
      <Tab.Screen options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="plus" color={color} size={size}/>
        )
      }} name="Add" component={CompanyNavigatorStack}/>
      <Tab.Screen options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="account" color={color} size={size}/>
        )
      }} name="Settings" component={UserNavigatorStack}/>
    </Tab.Navigator>
  );
};

export default MainAppNavigation;
