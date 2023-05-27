import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './Search';
import SearchCompanyDetails from './SearchCompanyDetails';
import Reservation from '../Reservation/Reservation';

const Stack = createNativeStackNavigator();

const SearchNavigationStack = () => {
  return <Stack.Navigator initialRouteName="SearchScreen">
    <Stack.Screen name="Search Company"
                  component={Search}
                  options={{headerShown: false}}/>
    <Stack.Screen name="Company Details"
                  component={SearchCompanyDetails}
                  options={{headerShown: false}}/>
    <Stack.Screen name="Reservation"
                  component={Reservation}
                  options={{headerShown: false}}/>
  </Stack.Navigator>
}

export default SearchNavigationStack;