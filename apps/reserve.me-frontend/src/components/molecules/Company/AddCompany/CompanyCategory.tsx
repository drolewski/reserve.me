import {useEffect, useState} from 'react';
import {getCategories} from '../../../../services/company/CompanyService';
import {Category, CategoryData} from '../../../../services/company/Category';
import {KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CompanyModel} from './CompanyModel';

const CompanyCategory = ({route, navigation}: any) => {

  const {name, description, category, contact, address, openingHours, services, update} = route.params ?? {};

  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const [categoriesValue, setCategoriesValue] = useState<CategoryData[]>([]);
  const [errorText, setErrorText] = useState<string>();

  useEffect(() => {
    getCategories()
      .then((response: Category[]) => {
        const catResponse: CategoryData[] = response.map(cat => {
          return {key: cat.name, value: cat.name};
        });
        setCategoriesValue(catResponse);
      });
  }, []);

  const saveCategory = () => {
    setErrorText('');
    if (categoryValue.length === 0) {
      setErrorText('Set company category');
      return;
    }
    AsyncStorage.setItem("@newcompany", JSON.stringify({
      name, description, contact, address, openingHours, services, category: categoryValue
    })).then(r => null);
    navigation.navigate("Company Contact", {
      name, description, contact, address, openingHours, services, category: categoryValue, update
    });
  }

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <KeyboardAvoidingView enabled>
        <View style={styles.sectionStyle}>
          <MultipleSelectList
            boxStyles={styles.dropdownInputStyle}
            dropdownTextStyles={styles.dropdownTextStyle}
            setSelected={(category: any) => setCategoryValue(category)}
            data={categoriesValue}
            save="value"
          />
          {errorText !== '' ? (
            <Text style={styles.errorTextStyle}>
              {errorText}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => saveCategory()}>
            <Text style={styles.buttonTextStyle}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionStyle: {
    display: 'flex',
    flexDirection: 'column',
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
})

export default CompanyCategory;
