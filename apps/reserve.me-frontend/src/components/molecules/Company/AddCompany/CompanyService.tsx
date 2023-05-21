import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {createRef, useEffect, useState} from 'react';
import {ServiceRequest, WeekDay} from '../../../../services/company/CompanyRequest';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

const CompanyService = ({route, navigation}: any) => {

  const {
    name, description, category, email, phoneNumber, street, city, number, postCode, employees,
    openingHours,
  } = route.params;

  const [serviceName, setServiceName] = useState<string | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const [serviceTime, setServiceTime] = useState<number | undefined>();
  const [weekDays, setWeekDays] = useState<WeekDay[]>([]);
  const [serviceEmployees, setServiceEmployees] = useState<string[]>([]);
  const [uniqueKey, setUniqueKey] = useState<number>(0);

  const [employeesData, setEmployeesData] = useState<{ key: string, value: string }[]>([]);
  const [weekDaysData, setWeekDaysData] = useState<{ key: string, value: WeekDay }[]>([]);
  const [errorText, setErrorText] = useState<string>("");
  const [globalErrorText, setGlobalErrorText] = useState<string>("");


  const [services, setServices] = useState<ServiceRequest[]>([]);

  const priceRef = createRef();
  const serviceTimeRef = createRef();

  useEffect(() => {
    const employeesMappedData = employees.map((emp: string) => {
      return {key: emp, value: emp}
    })
    const weekDayMappedData = [];
    if (!!openingHours[0].open) {
      weekDayMappedData.push({key: 'Monday', value: WeekDay.MONDAY});
    }
    if (!!openingHours[1].open) {
      weekDayMappedData.push({key: 'Tuesday', value: WeekDay.TUESDAY});
    }
    if (!!openingHours[2].open) {
      weekDayMappedData.push({key: 'Wednesday', value: WeekDay.WEDNESDAY});
    }
    if (!!openingHours[3].open) {
      weekDayMappedData.push({key: 'Thursday', value: WeekDay.THURSDAY});
    }
    if (!!openingHours[4].open) {
      weekDayMappedData.push({key: 'Friday', value: WeekDay.FRIDAY});
    }
    if (!!openingHours[5].open) {
      weekDayMappedData.push({key: 'Saturday', value: WeekDay.SATURDAY});
    }
    if (!!openingHours[6].open) {
      weekDayMappedData.push({key: 'Sunday', value: WeekDay.SUNDAY});
    }
    setWeekDaysData(weekDayMappedData);
    setEmployeesData(employeesMappedData);
  }, []);

  const addService = () => {
    setErrorText('');
    if (!serviceName) {
      setErrorText('Set service name');
      return;
    }
    if (!price) {
      setErrorText('Set service price');
      return;
    }
    if (weekDays.length === 0) {
      setErrorText('Set service weekdays');
      return;
    }
    if (serviceEmployees.length === 0) {
      setErrorText('Set service employees');
      return;
    }
    if (!serviceTime) {
      setErrorText('Set service time in minutes');
      return;
    }
    const servicesCopy = [...services];
    servicesCopy.push({name: serviceName, price, serviceTime, weekDays, employees: serviceEmployees});
    setServices(servicesCopy);
  }

  useEffect(() => {
    setServiceName("");
    setPrice(undefined);
    setServiceTime(undefined);
    setWeekDays([]);
    setServiceEmployees([]);
    setUniqueKey(uniqueKey + 1);
  }, [services]);

  const saveServices = () => {
    setGlobalErrorText('');
    if (services.length === 0) {
      setGlobalErrorText('Add at least one service');
      return;
    }
    navigation.navigate("CompanySummary", {
      name, description, category, email, phoneNumber, street, city, number, postCode, employees,
      openingHours, services
    });
  }

  const displayServices = () => {
    return services.map(service =>
      <View key={service.name} style={styles.timeSectionStyle}>
        <Text style={styles.dropdownTextStyle}>Service name: {service.name}</Text>
        <Text style={styles.dropdownTextStyle}>Price: {service.price}</Text>
        <Text style={styles.dropdownTextStyle}>Service time: {service.serviceTime}</Text>
        <Text style={styles.dropdownTextStyle}>Working days:{service.weekDays.join(", ")}</Text>
        <Text style={styles.dropdownTextStyle}>Employees: {service.employees.join(", ")}</Text>
      </View>)
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
          {
            services.length > 0 ?
              displayServices() : <View/>
          }
          <View key={uniqueKey}>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(name) => setServiceName(name)}
                placeholder="Enter service name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() => priceRef.current && priceRef.current.focus()}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(price) => setPrice(+price)}
                placeholder="Enter service price"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                keyboardType="numeric"
                returnKeyType="next"
                ref={priceRef}
                onSubmitEditing={() => serviceTimeRef.current && serviceTimeRef.current.focus()}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(minutes) => setServiceTime(+minutes)}
                placeholder="Enter service time in minutes"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                keyboardType="numeric"
                returnKeyType="next"
                ref={serviceTimeRef}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.serviceCategorySectionStyle}>
              <MultipleSelectList
                boxStyles={styles.dropdownInputStyle}
                dropdownTextStyles={styles.dropdownTextStyle}
                setSelected={(weekDay: any) => setWeekDays(weekDay)}
                data={weekDaysData}
                save="value"
              />
            </View>
            <View style={styles.serviceCategorySectionStyle}>
              <MultipleSelectList
                boxStyles={styles.dropdownInputStyle}
                dropdownTextStyles={styles.dropdownTextStyle}
                setSelected={(employee: any) => setServiceEmployees(employee)}
                data={employeesData}
                save="value"
              />
            </View>
          </View>
          {errorText !== '' ? (
            <Text style={styles.errorTextStyle}>
              {errorText}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={addService}>
            <Text style={styles.buttonTextStyle}>Save service</Text>
          </TouchableOpacity>

          {globalErrorText !== '' ? (
            <Text style={styles.errorTextStyle}>
              {globalErrorText}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={saveServices}>
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

export default CompanyService;
