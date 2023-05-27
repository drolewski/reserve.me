import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CompanyList from './CompanyList/CompanyList';
import CompanyName from './AddCompany/CompanyName';
import CompanyTimetable from './AddCompany/CompanyTimetable';
import CompanyContact from './AddCompany/CompanyContact';
import CompanyCategory from './AddCompany/CompanyCategory';
import CompanySummary from './AddCompany/CompanySummary';
import CompanyService from './AddCompany/CompanyService';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const CompanyNavigatorStack = () => {
  const navigation = useNavigation();

  const headerOption = (url: string) => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          AsyncStorage.getItem("@newcompany").then((response: any) => {
            const newCompany = JSON.parse(response);
            navigation.navigate(url, newCompany);
          })
        }}>
          <MaterialCommunityIcons style={styles.backButtonStyle} name="chevron-left" size={22}/>
        </TouchableOpacity>
      ),
    }
  }

  return <Stack.Navigator initialRouteName="Company List">
    <Stack.Screen name="Company List"
                  component={CompanyList}
                  options={{headerShown: false}}/>
    <Stack.Screen name="Company Name"
                  component={CompanyName}
                  options={headerOption('Company List')}/>
    <Stack.Screen name="Company Timetable"
                  component={CompanyTimetable}
                  options={headerOption('Company Contact')}/>
    <Stack.Screen name="Company Contact"
                  component={CompanyContact}
                  options={headerOption('Company Category')}/>
    <Stack.Screen name="Company Category"
                  component={CompanyCategory}
                  options={headerOption('Company Name')}/>
    <Stack.Screen name="Company Service"
                  component={CompanyService}
                  options={headerOption('Company Timetable')}/>
    <Stack.Screen name="Company Summary"
                  component={CompanySummary}
                  options={headerOption('Company Service')}/>
  </Stack.Navigator>
}

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

export default CompanyNavigatorStack;