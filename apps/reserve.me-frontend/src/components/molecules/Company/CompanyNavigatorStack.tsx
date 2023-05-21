import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CompanyList from './CompanyList/CompanyList';
import CompanyName from './AddCompany/CompanyName';
import CompanyTimetable from './AddCompany/CompanyTimetable';
import CompanyEmployee from './AddCompany/CompanyEmployee';
import CompanyContact from './AddCompany/CompanyContact';
import CompanyCategory from './AddCompany/CompanyCategory';
import CompanySummary from './AddCompany/CompanySummary';
import CompanyService from './AddCompany/CompanyService';

const Stack = createNativeStackNavigator();

const CompanyNavigatorStack = () => {
  return <Stack.Navigator initialRouteName="CompanyList">
    <Stack.Screen name="CompanyList"
                  component={CompanyList}
                  options={{headerShown: false}}/>
    <Stack.Screen name="CompanyName"
                  component={CompanyName}
                  options={{headerShown: false}}/>
    <Stack.Screen name="CompanyTimetable"
                  component={CompanyTimetable}
                  options={{headerShown: false}}/>
    <Stack.Screen name="CompanyEmployee"
                  component={CompanyEmployee}
                  options={{headerShown: false}}/>
    <Stack.Screen name="CompanyContact"
                  component={CompanyContact}
                  options={{headerShown: false}}/>
    <Stack.Screen name="CompanyCategory"
                  component={CompanyCategory}
                  options={{headerShown: false}}/>
    <Stack.Screen name="CompanyService"
                  component={CompanyService}
                  options={{headerShown: false}}/>
    <Stack.Screen name="CompanySummary"
                  component={CompanySummary}
                  options={{headerShown: false}}/>
  </Stack.Navigator>
}

export default CompanyNavigatorStack;