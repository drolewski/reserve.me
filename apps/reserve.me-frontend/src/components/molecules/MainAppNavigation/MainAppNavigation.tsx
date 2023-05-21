import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserNavigatorStack from '../User/UserNavigatorStack';
import CompanyNavigatorStack from '../Company/CompanyNavigatorStack';
import SearchNavigationStack from '../Search/SearchNavigationStack';
import HomeNavigationStack from '../Home/HomeNavigationStack';

const Tab = createBottomTabNavigator();

const MainAppNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeNavigationStack">
      <Tab.Screen options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="home" color={color} size={size}/>
        )
      }} name="HomeNavigationStack" component={HomeNavigationStack}/>
      <Tab.Screen options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="magnify" color={color} size={size}/>
        )
      }} name="SearchStack" component={SearchNavigationStack}/>
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
