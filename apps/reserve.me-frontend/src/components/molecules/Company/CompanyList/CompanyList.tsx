import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import {useEffect, useState} from 'react';
import {getCompanyList} from '../../../../services/company/CompanyService';
import {CompanyListResponse} from '../../../../services/company/CompanyListResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompanyList = ({navigation}: any) => {

  const [companies, setCompanies] = useState<CompanyListResponse[]>([]);
  const [storedPhoneNumber, setStoredPhoneNumber] = useState<string>("");

  useEffect(() => {
    AsyncStorage.getItem('@userPhoneNumber').then(r => setStoredPhoneNumber(r));
    getCompanyList(storedPhoneNumber)
      .then((response: CompanyListResponse[]) => setCompanies(response))
  }, []);

  if (companies.length === 0) {
    return <View style={{flex: 1}}>
      <Text style={styles.successTextStyle}>You don't have company yet</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('CompanyName')}>
        <Text style={styles.buttonTextStyle}>Add company</Text>
      </TouchableOpacity>
    </View>
  }

  const updateCompany = (companyName: string) => {
    // TODO handle update company
    console.log("TODO Handle Update company");
  }

  return <View style={{flex: 1}}>
    {/* TODO Loader */}
    <ScrollView keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  alignContent: 'center',
                  justifyContent: 'center'
                }}>
      <KeyboardAvoidingView enabled>
        {
          companies.map(company =>
            <TouchableHighlight key={company.name} onPress={() => updateCompany(company.name)}>
              <View style={styles.timeSectionStyle}>
                <Text>{company.name}</Text>
                <Text>{company.contact.phoneNumber}</Text>
                <Text>{company.contact.email}</Text>
              </View>
            </TouchableHighlight>)
        }
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('CompanyName')}>
          <Text style={styles.buttonTextStyle}>Add company</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  </View>

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
  timeSectionStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
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
})

export default CompanyList;
