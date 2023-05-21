import {useState} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

const CompanyEmployee = ({route, navigation}: any) => {

  const {name, description, category, email, phoneNumber, street, city, number, postCode} = route.params;

  const [employees, setEmployees] = useState<string[]>([]);
  const [errorText, setErrorText] = useState<string>();

  const addEmployee = (employee: any) => {
    let value = employee.target.value;
    if (employees.includes(value)) {
      setErrorText('Employee added previously');
      return;
    }
    if (!!value) {
      const employeesCopy = [...employees];
      employeesCopy?.push(value);
      employee.target.value = "";
      setEmployees(employeesCopy);
    }
  }

  const displayEmployees = () => {
    const employeesString = employees.join(", ");
    return <Text style={styles.sectionStyle}>{employeesString}</Text>;
  }

  const saveCompanyEmployees = () => {
    setErrorText('');
    if (employees.length === 0) {
      setErrorText('Set company employees');
      return;
    }
    navigation.navigate("CompanyTimetable", {
      name, description, category, email, phoneNumber, street, city, number, postCode, employees
    })
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
              onBlur={(employee) => addEmployee(employee)}
              placeholder="Enter employees"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={(employee) => addEmployee(employee)}
              blurOnSubmit={false}
            />
          </View>
          {employees.length > 0 ?
            <View style={styles.sectionStyle}>
              {displayEmployees()}
            </View> : <View/>}
          {errorText !== '' ? (
            <Text style={styles.errorTextStyle}>
              {errorText}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => saveCompanyEmployees()}>
            <Text style={styles.buttonTextStyle}>Continue</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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

export default CompanyEmployee;