import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {saveCompanyApiCall} from '../../../../services/company/CompanyService';
import {ErrorResponse} from '../../../../services/error/ErrorResponse';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompanySummary = ({route, navigation}: any) => {

  const {name, description, category, contact, address, openingHours, services} = route.params ?? {};

  const [errorText, setErrorText] = useState<string>("");
  const [storedPhoneNumber, setStoredPhoneNumber] = useState<string>("");

  useEffect(() => {
    AsyncStorage.getItem('@userPhoneNumber').then(r => setStoredPhoneNumber(r));
  }, []);

  const saveCompany = () => {
    const companyRequest = {
      name, description, category, contact, address, openingHours, services, ownerId: storedPhoneNumber
    };
    AsyncStorage.removeItem('@newcompany').then(r => console.log(r));
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
    <ScrollView keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  alignContent: 'center',
                  justifyContent: 'center'
                }}>
      <KeyboardAvoidingView enabled>
        <View style={styles.companySectionStyle}>
          <Text style={styles.companyInfo}>Company details</Text>
          <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>User phone
            number: </Text>{storedPhoneNumber}</Text>
          <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company name: </Text>{name ?? ""}
          </Text>
          <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company
            description: </Text>{description ?? ""}</Text>
          <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company
            categories: </Text>{category.join(", ") ?? ""}</Text>
          <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company
            street: </Text>{address?.street ?? ""}</Text>
          <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company address
            number: </Text>{address?.number ?? ""}</Text>
          <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company post
            code: </Text>{address?.postCode ?? ""}</Text>
          <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company
            city: </Text>{address?.city ?? ""}</Text>
          <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company
            email: </Text>{contact?.email ?? ""}</Text>
          <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Company phone
            number:</Text>{contact?.phoneNumber ?? ""}</Text>
        </View>
        <View style={styles.companySectionStyle}>
          <Text style={styles.companyInfo}>Working days</Text>
          {openingHours?.map((openingHour: any) =>
            <>
              <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Week
                day: </Text>{openingHour.weekDay}</Text>
              <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Open: </Text>{openingHour.open}
              </Text>
              <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Close: </Text>{openingHour.close}
              </Text>
            </>
          )}
        </View>
        <View style={styles.companySectionStyle}>
          <Text style={styles.companyInfo}>Services</Text>
          {services?.map((service: any) =>
            <>
              <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Service name: </Text>{service.name}
              </Text>
              <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Price: </Text>{service.price}
              </Text>
              <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Service
                time: </Text>{service.serviceTime}</Text>
              <Text style={styles.companyTextStyle}><Text style={styles.companyInfo}>Working
                days: </Text>{service.weekDays.join(", ")}</Text>
            </>)}
        </View>
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
  companySectionStyle: {
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
  companyTextStyle: {
    color: '#8b9cb5',
    fontSize: 18,
  },
  companyInfo: {
    fontWeight: "bold",
    fontSize: 18,
  }
})


export default CompanySummary;
