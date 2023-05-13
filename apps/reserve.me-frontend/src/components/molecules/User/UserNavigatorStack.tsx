import {createNativeStackNavigator} from '@react-navigation/native-stack';
import User from './User';
import Profile from './Profile/Profile';
import Address from './Address/Address';

const Stack = createNativeStackNavigator();

const UserNavigatorStack = () => {
  return (
    // TODO back navigation ??
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen name="User"
                    component={User}
                    options={{headerShown: false}}/>
      <Stack.Screen name="Profile"
                    component={Profile}
                    options={{headerShown: false}}/>
      <Stack.Screen name="Address"
                    component={Address}
                    options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default UserNavigatorStack;
