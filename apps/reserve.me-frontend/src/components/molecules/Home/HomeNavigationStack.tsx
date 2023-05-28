import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import History from './History';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const HomeNavigationStack = () => {
  const navigation = useNavigation();

  const headerOption = () => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Home Screen')}>
          <MaterialCommunityIcons style={styles.backButtonStyle} name="chevron-left" size={22}/>
        </TouchableOpacity>
      ),
    }
  }

  return <Stack.Navigator initialRouteName="Home Screen">
    <Stack.Screen name="Home Screen"
                  component={Home}
                  options={{headerShown: false}}/>
    <Stack.Screen name="History"
                  component={History}
                  options={headerOption}/>
  </Stack.Navigator>
}

const styles = StyleSheet.create({
  backButtonStyle: {
    margin: 10
  }
});

export default HomeNavigationStack;