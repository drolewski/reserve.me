import {Button, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {getCompanyList} from '../../../../services/company/CompanyService';
import {CompanyListResponse} from '../../../../services/company/CompanyListResponse';

const CompanyList = ({navigation}: any) => {

  const [companies, setCompanies] = useState<CompanyListResponse[]>([]);

  useEffect(() => {
    getCompanyList("1")
      .then((response: CompanyListResponse[]) => setCompanies(response))
  }, []);

  if (companies.length === 0) {
    return <View style={{flex: 1}}>
      <Text style={styles.successTextStyle}>You don't have company yet</Text>
      <Button title="Add company" onPress={() => navigation.navigate('CompanyName')}/>
    </View>
  }

  return <Text>Test</Text>

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
})

export default CompanyList;
