import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';

const Stack = createNativeStackNavigator();

const HomeNavigationStack = () => {
  return <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="HomeScreen"
                  component={Home}
                  options={{headerShown: false}}/>
  </Stack.Navigator>
}

export default HomeNavigationStack;