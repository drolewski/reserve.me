import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {createRef, useState} from 'react';
import {RegistrationRequest} from '../../../services/authorization/RegisterRequest';
import {register} from '../../../services/authorization/AuthorizationService';
import {ErrorResponse} from '../../../services/error/ErrorResponse';

const Register = ({navigation}: any) => {
  const [isRegisterSucceed, setRegisterSucceed] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [userName, setUserName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const phoneNumberRef = createRef();

  const handleSubmitButton = () => {
    setErrorText('');
    if (!userName) {
      setErrorText('Set username');
      return;
    }
    if (!phoneNumber) {
      setErrorText('Set phone number');
      return;
    }
    const registrationRequest: RegistrationRequest = {userName, phoneNumber};
    register(registrationRequest)
      .then((response: ErrorResponse) => {
        if (!!response) {
          setErrorText(response.message);
          return;
        }
        setRegisterSucceed(true);
      });
  }

  if (isRegisterSucceed) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <KeyboardAvoidingView enabled>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(userName) => setUserName(userName)}
            placeholder="Enter username"
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
            onChangeText={(number) => setPhoneNumber(number)}
            placeholder="Enter phone number"
            placeholderTextColor="#8b9cb5"
            keyboardType="numeric"
            returnKeyType="next"
            textContentType="telephoneNumber"
            ref={phoneNumberRef}
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
          onPress={handleSubmitButton}>
          <Text style={styles.buttonTextStyle}>REGISTER</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
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
    fontSize: 24,
    padding: 30,
  },
})

export default Register;
