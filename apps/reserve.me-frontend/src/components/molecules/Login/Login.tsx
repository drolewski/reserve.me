import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {LoginRequest} from '../../../services/authorization/LoginRequest';
import {authorize, login} from '../../../services/authorization/AuthorizationService';
import {ErrorResponse} from '../../../services/error/ErrorResponse';
import {AuthorizationRequest} from '../../../services/authorization/AuthorizationRequest';

const Login = ({navigation}: any) => {

  // TODO Store login state
  const [isLoginSucceed, setIsLoginSucceed] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [authorizationCode, setAuthorizationCode] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');

  const handleSubmitButton = () => {
    setErrorText('');
    if (!phoneNumber) {
      setErrorText('Set phone number');
      return;
    }
    const loginData: LoginRequest = {phoneNumber};
    login(loginData)
      .then((response: ErrorResponse) => {
        if (!!response) {
          setErrorText(response.message);
          return;
        }
        setIsLoginSucceed(true);
      });
  }

  const handleAuthorization = () => {
    setErrorText('');
    if (!phoneNumber) {
      setErrorText('Set phone number');
      return;
    }
    if (!authorizationCode) {
      setErrorText('Set authorization code');
      return;
    }
    const requestTime: string = (new Date()).toISOString();
    const authorizationRequest: AuthorizationRequest = {phoneNumber, authorizationCode, requestTime}
    authorize(authorizationRequest).then((response: ErrorResponse) => {
      if (!!response) {
        setErrorText(response.message);
        return;
      }
      // TODO save phone number into local store
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    });
  }

  if (isLoginSucceed) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(authorizationCode) => setAuthorizationCode(authorizationCode)}
              placeholder="Enter authorization code"
              placeholderTextColor="#8b9cb5"
              keyboardType="number-pad"
              inputMode="numeric"
              textContentType="oneTimeCode"
              returnKeyType="next"
              value={authorizationCode}
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
            onPress={() => handleAuthorization()}>
            <Text style={styles.buttonTextStyle}>Confirm</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            placeholder="Enter phone number"
            placeholderTextColor="#8b9cb5"
            keyboardType="phone-pad"
            autoComplete="tel"
            inputMode="numeric"
            textContentType="telephoneNumber"
            returnKeyType="next"
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
          <Text style={styles.buttonTextStyle}>LOGIN</Text>
        </TouchableOpacity>
      </ScrollView>
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
    fontSize: 18,
    padding: 30,
  },
})

export default Login;