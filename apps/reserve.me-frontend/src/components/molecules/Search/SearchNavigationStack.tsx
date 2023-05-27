import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './Search';
import SearchCompanyDetails from './SearchCompanyDetails';
import Reservation from '../Reservation/Reservation';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const SearchNavigationStack = () => {

  const navigation = useNavigation();

  const headerOption = (url: string) => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate(url)}>
          <MaterialCommunityIcons style={styles.backButtonStyle} name="chevron-left" size={22}/>
        </TouchableOpacity>
      ),
    }
  }
  return <Stack.Navigator initialRouteName="SearchScreen">
    <Stack.Screen name="Search Company"
                  component={Search}
                  options={{headerShown: false}}/>
    <Stack.Screen name="Company Details"
                  component={SearchCompanyDetails}
                  options={headerOption("Search Company")}/>
    <Stack.Screen name="Reservation"
                  component={Reservation}
                  options={headerOption("Search Company")}/>
  </Stack.Navigator>
}

const styles = StyleSheet.create({
  backButtonStyle: {
    margin: 10
  }
});

export default SearchNavigationStack;