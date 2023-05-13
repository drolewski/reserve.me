import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../../components/molecules/Welcome/Welcome';
import Register from '../../components/molecules/Register/Register';
import MainAppNavigation from '../../components/molecules/MainAppNavigation/MainAppNavigation';
import Login from '../../components/molecules/Login/Login';
import Profile from '../../components/molecules/Profile/Profile';
import UserData from '../../components/molecules/Profile/UserData/UserData';

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
            <Stack.Screen name="Login"
                          component={Login}
                          options={{headerShown: false}}/>
            <Stack.Screen name="Home"
                          component={MainAppNavigation}
                          options={{headerShown: false}}/>
            <Stack.Screen name="Profile"
                          component={Profile}
                          options={{headerShown: false}}/>
            <Stack.Screen name="User"
                          component={UserData}
                          options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default AppNavigationStack;
