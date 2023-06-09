import {KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';
import {deleteCompanyApiCall, getCompanyDetails, getCompanyList} from '../../../../services/company/CompanyService';
import {CompanyListResponse} from '../../../../services/company/CompanyListResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CompanyList = ({navigation, route}: any) => {

  const [companies, setCompanies] = useState<CompanyListResponse[]>([]);
  const [storedPhoneNumber, setStoredPhoneNumber] = useState<string>("");

  useEffect(() => {
    AsyncStorage.getItem('@userPhoneNumber').then(r => {
      setStoredPhoneNumber(r);
      getCompanyList(r)
        .then((response: CompanyListResponse[]) => {
          setCompanies(response);
        });
    });
  }, []);

  if (companies.length === 0) {
    return <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
      <KeyboardAvoidingView enabled>
        <View style={styles.companySectionStyle}>
          <Text style={styles.successTextStyle}>You don't have company yet</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Company Name')}>
            <Text style={styles.buttonTextStyle}>Add company</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  }

  const updateCompany = (companyName: string) => {
    getCompanyDetails(storedPhoneNumber, companyName)
      .then(response => {
        navigation.navigate('Company Name', {...response, update: true});
      });
  }

  const handleDelete = (companyName: string) => {
    deleteCompanyApiCall(storedPhoneNumber, companyName)
      .then(response => {
        const newCompanies = companies.filter(company => company.name !== companyName);
        setCompanies(newCompanies);
      })
  }

  return <View style={{flex: 1}}>
    <KeyboardAvoidingView enabled>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Company Name')}>
        <Text style={styles.buttonTextStyle}>Add new company</Text>
      </TouchableOpacity>
      {
        companies.map(company =>
          <View key={company.name} style={styles.companySectionStyle}>
            <TouchableOpacity style={{display: 'flex', alignItems: 'center'}}
                              onPress={() => handleDelete(company.name)}>
              <MaterialCommunityIcons name="delete" color={'red'} size={22}/>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={() => updateCompany(company.name)}>
                <Text><Text style={styles.companyInfo}><Text style={styles.companyInfo}>Company
                  Name: </Text></Text>{company.name}</Text>
                <Text><Text style={styles.companyInfo}><Text style={styles.companyInfo}>Phone
                  number: </Text></Text>{company.contact.phoneNumber}</Text>
                <Text><Text style={styles.companyInfo}><Text
                  style={styles.companyInfo}>Email: </Text></Text>{company.contact.email}</Text>
              </TouchableOpacity>
            </View>
          </View>)
      }
    </KeyboardAvoidingView>
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
  companySectionStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    fontSize: 20
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
  companyInfo: {
    fontWeight: "bold",
    fontSize: 18,
  }
})

export default CompanyList;
