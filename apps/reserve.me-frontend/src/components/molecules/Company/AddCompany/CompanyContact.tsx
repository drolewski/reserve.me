import {createRef, useState} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {emailReg} from '../../../../const/RegExp';

const CompanyContact = ({route, navigation}: any) => {
  const {name, description, category} = route.params;

  const [email, setEmail] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [street, setStreet] = useState<string>();
  const [city, setCity] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [postCode, setPostCode] = useState<string>();
  const [errorText, setErrorText] = useState<string>();

  const phoneNumberRef = createRef();
  const streeetRef = createRef();
  const numberRef = createRef();
  const cityRef = createRef();
  const postCodeRef = createRef();

  const saveCompanyContact = () => {
    setErrorText('');
    if (!email) {
      setErrorText('Set company email');
      return;
    }
    if (!emailReg.test(email)) {
      setErrorText('Invalid email');
      return;
    }
    if (!phoneNumber) {
      setErrorText('Set company phoneNumber');
      return;
    }
    if (!street) {
      setErrorText('Set company street');
      return;
    }
    if (!city) {
      setErrorText('Set company city');
      return;
    }
    if (!number) {
      setErrorText('Set company address number');
      return;
    }
    if (!postCode) {
      setErrorText('Set company post code');
      return;
    }
    navigation.navigate("CompanyTimetable", {
      name, description, category, email, phoneNumber, street, city, number, postCode
    });
  }

  return (
    <View style={{flex: 1}}>
      {/* TODO Loader */}
      <ScrollView keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{
                    alignContent: 'center',
                    justifyContent: 'center'
                  }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(email) => setEmail(email)}
              placeholder="Enter contact email"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() => phoneNumberRef.current && phoneNumberRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(email) => setPhoneNumber(email)}
              placeholder="Enter contact phone nubmer"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              ref={phoneNumberRef}
              onSubmitEditing={() => streeetRef.current && streeetRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(street) => setStreet(street)}
              placeholder="Enter street"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              ref={streeetRef}
              onSubmitEditing={() => numberRef.current && numberRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(number) => setNumber(number)}
              placeholder="Enter address number"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              ref={numberRef}
              onSubmitEditing={() => cityRef.current && cityRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(city) => setCity(city)}
              placeholder="Enter city"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              ref={cityRef}
              onSubmitEditing={() => postCodeRef.current && postCodeRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(postCode) => setPostCode(postCode)}
              placeholder="Enter post code"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
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
      </ScrollView>
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