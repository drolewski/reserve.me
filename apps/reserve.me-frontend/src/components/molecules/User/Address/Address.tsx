import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import {useEffect, useState} from 'react';
import {updateUser} from '../../../../services/user/UserService';

const Address = ({route, navigation}: any) => {

  const {address, phoneNumber} = route.params;

  const [street, setStreet] = useState<string | undefined>();
  const [newStreet, setNewStreet] = useState<string | undefined>();
  const [number, setNumber] = useState<string | undefined>();
  const [newNumber, setNewNumber] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [newCity, setNewCity] = useState<string | undefined>();
  const [postCode, setPostCode] = useState<string | undefined>();
  const [newPostCode, setNewPostCode] = useState<string | undefined>();
  const [errorText, setErrorText] = useState<string>();

  useEffect(() => {
    setStreet(address.street);
    setNewStreet(address.street);
    setNumber(address.number);
    setNewNumber(address.number);
    setCity(address.city);
    setNewCity(address.city);
    setPostCode(address.postCode);
    setNewPostCode(address.postCode);
  }, []);

  const saveAddressData = () => {
    if (!!phoneNumber && (street !== newStreet || number !== newNumber || city !== newCity || postCode !== newPostCode)) {
      updateUser(phoneNumber, {
        address: {
          street: newStreet,
          city: newCity,
          postCode: newPostCode,
          number: newNumber
        }
      }).then(response => {
        if (!!response) {
          setErrorText(response.message);
          return;
        }
      });
    }
  }

  return <View style={{flex: 1}}>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        alignContent: 'center',
        justifyContent: 'center'
      }}>
      <KeyboardAvoidingView enabled>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setNewStreet}
            placeholder="Enter street"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={newStreet ?? ''}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setNewNumber}
            placeholder="Enter number"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={newNumber ?? ''}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setNewCity}
            placeholder="Enter city"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={newCity ?? ''}
            blurOnSubmit={false}
          />
        </View>
        {/* TODO datepicker */}
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setNewPostCode}
            placeholder="Enter post code"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={newPostCode ?? ''}
            blurOnSubmit={false}
          />
        </View>
        {/* TODO extract error component */}
        {errorText !== '' ? (
          <Text style={styles.errorTextStyle}>
            {errorText}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={saveAddressData}>
          <Text style={styles.buttonTextStyle}>Save</Text>
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
  tinyLogo: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
});

export default Address;
