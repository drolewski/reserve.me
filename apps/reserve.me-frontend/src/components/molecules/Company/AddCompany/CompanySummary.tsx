import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {saveCompanyApiCall} from '../../../../services/company/CompanyService';
import {ErrorResponse} from '../../../../services/error/ErrorResponse';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompanySummary = ({route, navigation}: any) => {

  const {
    name, description, category, email, phoneNumber, street, city, number, postCode,
    openingHours, services
  } = route.params;


  const [errorText, setErrorText] = useState<string>("");
  const [storedPhoneNumber, setStoredPhoneNumber] = useState<string>("");

  useEffect(() => {
    AsyncStorage.getItem('@userPhoneNumber').then(r => setStoredPhoneNumber(r));
  }, []);

  const saveCompany = () => {
    const companyRequest = {
      ownerId: storedPhoneNumber,
      name,
      description,
      category,
      address: {
        street, number, postCode, city
      },
      contact: {
        email, phoneNumber
      },
      services,
      openingHours
    };
    saveCompanyApiCall(companyRequest)
      .then((response: ErrorResponse) => {
        if (!!response) {
          setErrorText(response.message);
          return;
        }
        navigation.reset({
          index: 0,
          routes: [{name: 'Add'}],
        });
      });
  }

  return <View style={{flex: 1}}>
    {/* TODO Loader */}
    <ScrollView keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  alignContent: 'center',
                  justifyContent: 'center'
                }}>
      <KeyboardAvoidingView enabled>
        <View style={styles.timeSectionStyle}>
          <Text style={styles.successTextStyle}>{storedPhoneNumber}</Text>
          <Text style={styles.successTextStyle}>{name}</Text>
          <Text style={styles.successTextStyle}>{description}</Text>
          <Text style={styles.successTextStyle}>{category}</Text>
          <Text style={styles.successTextStyle}>{street}</Text>
          <Text style={styles.successTextStyle}>{number}</Text>
          <Text style={styles.successTextStyle}>{postCode}</Text>
          <Text style={styles.successTextStyle}>{city}</Text>
          <Text style={styles.successTextStyle}>{email}</Text>
          <Text style={styles.successTextStyle}>{phoneNumber}</Text>
        </View>
        {openingHours.map((openingHour: any) =>
          <View key={openingHour.weekDay} style={styles.timeSectionStyle}>
            <Text style={styles.dropdownTextStyle}>Week day: {openingHour.weekDay}</Text>
            <Text style={styles.dropdownTextStyle}>Open: {openingHour.open}</Text>
            <Text style={styles.dropdownTextStyle}>Close: {openingHour.close}</Text>
          </View>)}
        {services.map((service: any) =>
          <View key={service.name} style={styles.timeSectionStyle}>
            <Text style={styles.dropdownTextStyle}>Service name: {service.name}</Text>
            <Text style={styles.dropdownTextStyle}>Price: {service.price}</Text>
            <Text style={styles.dropdownTextStyle}>Service time: {service.serviceTime}</Text>
            <Text style={styles.dropdownTextStyle}>Working days:{service.weekDays.join(", ")}</Text>
          </View>)}
        {errorText !== '' ? (
          <Text style={styles.errorTextStyle}>
            {errorText}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={saveCompany}>
          <Text style={styles.buttonTextStyle}>Save Company</Text>
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
  timeSectionStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },
  timeSectionButtonStyle: {
    backgroundColor: '#8b9cb5',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#8b9cb5',
    height: 40,
    width: 100,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
  },
  serviceCategorySectionStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 35,
    marginRight: 35,
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


export default CompanySummary;
