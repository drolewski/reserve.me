import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './Search';
import SearchCompanyDetails from './SearchCompanyDetails';

const Stack = createNativeStackNavigator();

const SearchNavigationStack = () => {
  return <Stack.Navigator initialRouteName="Search">
    <Stack.Screen name="Search"
                  component={Search}
                  options={{headerShown: false}}/>
    <Stack.Screen name="SearchCompanyDetails"
                  component={SearchCompanyDetails}
                  options={{headerShown: false}}/>
  </Stack.Navigator>
}

export default SearchNavigationStack;