import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {createRef, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompanyName = ({navigation, route}: any) => {

  const {name, description, category, contact, address, openingHours, services, update} = route.params ?? {};

  const [nameValue, setNameValue] = useState<string>(name ?? "");
  const [descriptionValue, setDescriptionValue] = useState<string>(description ?? "");
  const [errorText, setErrorText] = useState<string>();

  const descriptionRef = createRef();

  const saveCompanyName = () => {
    setErrorText('');
    if (!nameValue) {
      setErrorText('Set company name');
      return;
    }
    if (!descriptionValue) {
      setErrorText('Set company description');
      return;
    }
    AsyncStorage.setItem("@newcompany", JSON.stringify({
      category, contact, address, openingHours, services,
      name: nameValue,
      description: descriptionValue
    })).then(r => null);
    navigation.navigate('Company Category', {
      category, contact, address, openingHours, services,
      name: nameValue, description: descriptionValue, update
    });
  }

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <KeyboardAvoidingView enabled>
        <View style={styles.sectionStyle}>
          {
            update ? <Text style={styles.infoStyle}>{name}</Text> : <TextInput
              style={styles.inputStyle}
              onChangeText={(name) => setNameValue(name)}
              placeholder="Enter company name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              value={nameValue}
              onSubmitEditing={() => descriptionRef.current && descriptionRef.current.focus()}
              blurOnSubmit={false}
            />
          }
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            multiline
            numberOfLines={5}
            maxLength={100000}
            onChangeText={(description) => setDescriptionValue(description)}
            placeholder="Enter description"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            value={descriptionValue}
            ref={descriptionRef}
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
          onPress={() => saveCompanyName()}>
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
  infoStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: "bold",
    fontSize: 18,
  },
})

export default CompanyName;
