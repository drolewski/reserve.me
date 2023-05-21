import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';
import {CompanyListResponse} from '../../../services/company/CompanyListResponse';
import {getAllCompanies, getCategories} from '../../../services/company/CompanyService';
import {Category} from '../../../services/company/Category';

const Search = ({navigation}: any) => {

  const [companies, setCompanies] = useState<CompanyListResponse[]>([]);
  const [displayCompanies, setDisplayCompanies] = useState<CompanyListResponse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchCategory, setSearchCategory] = useState<Category | undefined>();
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    getAllCompanies()
      .then((response: CompanyListResponse[]) => {
        setCompanies(response);
        setDisplayCompanies(response);
      });
    getCategories()
      .then((response: Category[]) => setCategories(response));
  }, []);

  useEffect(() => {
    let companiesResult: CompanyListResponse[] = [];
    if (!!searchCategory) {
      companiesResult = companies.filter(company => company.category.includes(searchCategory.name));
    }
    if (!!searchValue) {
      if (companiesResult.length > 0) {
        companiesResult = companiesResult.filter(company => company.name.includes(searchValue));
      } else {
        companiesResult = companies.filter(company => company.name.includes(searchValue));
      }
    }
    setDisplayCompanies(companiesResult);
  }, [searchValue, searchCategory]);

  return <View style={{flex: 1}}>
    <ScrollView keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  alignContent: 'center',
                  justifyContent: 'center'
                }}>
      <KeyboardAvoidingView enabled>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(searchBy) => setSearchValue(searchBy)}
            placeholder="Enter company name"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.sectionStyle}>
          {
            categories.map(category => <TouchableOpacity
              style={category.name === searchCategory?.name ? styles.buttonStyle : styles.successTextStyle}
              key={category.name}
              activeOpacity={0.5}
              onPress={() => {
                if (searchCategory !== category) {
                  setSearchCategory(category);
                } else {
                  setSearchCategory(undefined);
                }
              }}>
              <Text>{category.name}</Text>
            </TouchableOpacity>)
          }
        </View>
        {displayCompanies.map(company =>
          <TouchableOpacity
            key={company.name}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('SearchCompanyDetails')}>
            <View style={styles.serviceCategorySectionStyle}>
              <Text>{company.name}</Text>
              <Text>{company.contact.phoneNumber}</Text>
              <Text>{company.contact.email}</Text>
              <Text>{company.address.street}</Text>
              <Text>{company.address.number}</Text>
              <Text>{company.address.city}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  textAreaStyle: {
    flex: 1,
    color: 'black',
    padding: 15,
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
  dropdownTextStyle: {
    color: '#8b9cb5',
  },
  dropdownInputStyle: {
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  serviceCategorySectionStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 35,
    marginRight: 35,
  },
})

export default Search;
