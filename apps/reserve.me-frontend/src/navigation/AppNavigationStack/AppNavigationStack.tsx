import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../../components/molecules/Welcome/Welcome';
import Register from '../../components/molecules/Register/Register';
import MainAppNavigation from '../../components/molecules/MainAppNavigation/MainAppNavigation';
import Login from '../../components/molecules/Login/Login';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AppNavigationStack = () => {
  const navigation = useNavigation();

  const headerOption = () => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <MaterialCommunityIcons style={styles.backButtonStyle} name="chevron-left" size={22}/>
        </TouchableOpacity>
      ),
    }
  }

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome"
                    component={Welcome}
                    options={{headerShown: false}}/>
      <Stack.Screen name="Register"
                    component={Register}
                    options={headerOption}/>
      <Stack.Screen name="Login"
                    component={Login}
                    options={headerOption}/>
      <Stack.Screen name="Home"
                    component={MainAppNavigation}
                    options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};


const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  buttonStyle: {
    backgroundColor: '#8b9cb5',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#8b9cb5',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: '#8b9cb5',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  backButtonStyle: {
    margin: 10
  }
})

export default AppNavigationStack;
