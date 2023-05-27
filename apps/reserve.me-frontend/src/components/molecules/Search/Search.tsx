import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
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
    let companiesResult: CompanyListResponse[] = companies;
    if (!!searchCategory) {
      companiesResult = companiesResult.filter(company => company.category.includes(searchCategory.name));
    }
    if (!!searchValue) {
      companiesResult = companiesResult.filter(company => company.name.toLowerCase().includes(searchValue.toLowerCase()));
    }
    setDisplayCompanies(companiesResult);
  }, [searchValue, searchCategory]);

  return <View style={{flex: 1}}>
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
    <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScrollView} style={{maxHeight: 60}}>
      {
        categories.map(category => <TouchableOpacity
          style={category.name === searchCategory?.name ? styles.searchCategorySelectedStyle : styles.searchCategoryStyle}
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
    </ScrollView>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{display: 'flex', flexDirection: 'column'}}>
      {displayCompanies.map(company =>
        <TouchableOpacity
          key={company.name}
          activeOpacity={0.5}
          style={styles.companyTailStyle}
          onPress={() => navigation.navigate('Company Details', {companyName: company.name})}>
          <View style={styles.serviceCategorySectionStyle}>
            <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company
              name: </Text>{company.name ?? ""}
            </Text>
            <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company
              email: </Text>{company.contact?.email ?? ""}</Text>
            <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company phone
              number:</Text>{company.contact?.phoneNumber ?? ""}</Text>
            <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company
              street: </Text>{company.address?.street ?? ""}</Text>
            <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company address
              number: </Text>{company.address?.number ?? ""}</Text>
            <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company post
              code: </Text>{company.address?.postCode ?? ""}</Text>
            <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company
              city: </Text>{company.address?.city ?? ""}</Text>
          </View>
        </TouchableOpacity>
      )}
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
  horizontalScrollView: {
    display: 'flex',
    alignItems: 'center',
    maxHeight: 60
  },
  searchCategoryStyle: {
    color: '#FFFFFF',
    justifyContent: 'center',
    height: 40,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  searchCategorySelectedStyle: {
    backgroundColor: '#8b9cb5',
    color: '#FFFFFF',
    justifyContent: 'center',
    height: 40,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
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
  companyTextStyle: {
    color: '#8b9cb5',
    fontSize: 18,
  },
  companyInfo: {
    fontWeight: "bold",
    fontSize: 18,
  },
  companyTailStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#dadae8',
  }
})

export default Search;
