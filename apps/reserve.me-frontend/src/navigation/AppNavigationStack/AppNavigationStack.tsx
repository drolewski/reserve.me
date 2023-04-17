import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../../components/molecules/Welcome/Welcome';
import Register from '../../components/molecules/Register/Register';
import Home from '../../components/molecules/Home/Home';

const Stack = createNativeStackNavigator();

const AppNavigationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome"
                    component={Welcome}
                    options={{headerShown: false}}/>
      <Stack.Screen name="Register"
                    component={Register}
                    options={{headerShown: false}}/>
      <Stack.Screen name="Home"
                    component={Home}
                    options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default AppNavigationStack;
