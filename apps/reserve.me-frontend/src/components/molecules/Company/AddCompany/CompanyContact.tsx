import {createRef, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {emailReg} from '../../../../const/RegExp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompanyContact = ({route, navigation}: any) => {

  const {name, description, category, contact, address, openingHours, services, update} = route.params ?? {};

  const [emailValue, setEmailValue] = useState<string>(contact?.email ?? "");
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>(contact?.phoneNumber ?? "");
  const [streetValue, setStreetValue] = useState<string>(address?.street ?? "");
  const [cityValue, setCityValue] = useState<string>(address?.city ?? "");
  const [numberValue, setNumberValue] = useState<string>(address?.number ?? "");
  const [postCodeValue, setPostCodeValue] = useState<string>(address?.postCode ?? "");
  const [errorText, setErrorText] = useState<string>();

  const phoneNumberRef = createRef();
  const streeetRef = createRef();
  const numberRef = createRef();
  const cityRef = createRef();
  const postCodeRef = createRef();

  const saveCompanyContact = () => {
    setErrorText('');
    if (!emailValue) {
      setErrorText('Set company email');
      return;
    }
    if (!emailReg.test(emailValue)) {
      setErrorText('Invalid email');
      return;
    }
    if (!phoneNumberValue) {
      setErrorText('Set company phoneNumber');
      return;
    }
    if (!streetValue) {
      setErrorText('Set company street');
      return;
    }
    if (!cityValue) {
      setErrorText('Set company city');
      return;
    }
    if (!numberValue) {
      setErrorText('Set company address number');
      return;
    }
    if (!postCodeValue) {
      setErrorText('Set company post code');
      return;
    }
    AsyncStorage.setItem("@newcompany",
      JSON.stringify({
        name, description, category,
        openingHours, services,
        contact: {
          email: emailValue,
          phoneNumber: phoneNumberValue,
        },
        address: {
          street: streetValue,
          city: cityValue,
          number: numberValue,
          postCode: postCodeValue
        }
      }))
      .then(r => null);
    navigation.navigate("Company Timetable", {
      name, description, category,
      openingHours, services,
      contact: {
        email: emailValue,
        phoneNumber: phoneNumberValue,
      },
      address: {
        street: streetValue,
        city: cityValue,
        number: numberValue,
        postCode: postCodeValue
      }, update
    });
  }

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <KeyboardAvoidingView enabled>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(email) => setEmailValue(email)}
            placeholder="Enter contact email"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={emailValue ?? ""}
            onSubmitEditing={() => phoneNumberRef.current && phoneNumberRef.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(email) => setPhoneNumberValue(email)}
            placeholder="Enter contact phone nubmer"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={phoneNumberValue ?? ""}
            ref={phoneNumberRef}
            onSubmitEditing={() => streeetRef.current && streeetRef.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(street) => setStreetValue(street)}
            placeholder="Enter street"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={streetValue ?? ""}
            ref={streeetRef}
            onSubmitEditing={() => numberRef.current && numberRef.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(number) => setNumberValue(number)}
            placeholder="Enter address number"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={numberValue ?? ""}
            ref={numberRef}
            onSubmitEditing={() => cityRef.current && cityRef.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(city) => setCityValue(city)}
            placeholder="Enter city"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={cityValue ?? ""}
            ref={cityRef}
            onSubmitEditing={() => postCodeRef.current && postCodeRef.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(postCode) => setPostCodeValue(postCode)}
            placeholder="Enter post code"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={postCodeValue ?? ""}
            ref={postCodeRef}
            blurOnSubmit={false}
          />
        </View>
        {errorText !== '' ? (
          <Text style={styles.errorTextStyle}>
            {errorText}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => saveCompanyContact()}>
          <Text style={styles.buttonTextStyle}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
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
})

export default CompanyContact;