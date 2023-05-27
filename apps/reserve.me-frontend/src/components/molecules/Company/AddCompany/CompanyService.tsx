import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {createRef, useEffect, useState} from 'react';
import {ServiceRequest, WeekDay} from '../../../../services/company/CompanyRequest';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CompanyModel} from './CompanyModel';

const CompanyService = ({route, navigation}: any) => {

  const {name, description, category, contact, address, openingHours, services}: CompanyModel = route.params ?? {};

  const [serviceName, setServiceName] = useState<string | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const [serviceTime, setServiceTime] = useState<number | undefined>();
  const [weekDays, setWeekDays] = useState<WeekDay[]>([]);
  const [uniqueKey, setUniqueKey] = useState<number>(0);

  const [weekDaysData, setWeekDaysData] = useState<{ key: string, value: WeekDay }[]>([]);
  const [errorText, setErrorText] = useState<string>("");
  const [globalErrorText, setGlobalErrorText] = useState<string>("");


  const [servicesList, setServicesList] = useState<ServiceRequest[]>(services ?? []);

  const priceRef = createRef();
  const serviceTimeRef = createRef();

  useEffect(() => {
    const weekDayMappedData = [];
    if (!!openingHours && openingHours?.length > 0) {
      if (!!openingHours[0]?.open) {
        weekDayMappedData.push({key: 'Monday', value: WeekDay.MONDAY});
      }
      if (!!openingHours[1]?.open) {
        weekDayMappedData.push({key: 'Tuesday', value: WeekDay.TUESDAY});
      }
      if (!!openingHours[2]?.open) {
        weekDayMappedData.push({key: 'Wednesday', value: WeekDay.WEDNESDAY});
      }
      if (!!openingHours[3]?.open) {
        weekDayMappedData.push({key: 'Thursday', value: WeekDay.THURSDAY});
      }
      if (!!openingHours[4]?.open) {
        weekDayMappedData.push({key: 'Friday', value: WeekDay.FRIDAY});
      }
      if (!!openingHours[5]?.open) {
        weekDayMappedData.push({key: 'Saturday', value: WeekDay.SATURDAY});
      }
      if (!!openingHours[6]?.open) {
        weekDayMappedData.push({key: 'Sunday', value: WeekDay.SUNDAY});
      }
      setWeekDaysData(weekDayMappedData);
    }
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
    if (!serviceTime) {
      setErrorText('Set service time in minutes');
      return;
    }
    const servicesCopy = [...servicesList];
    servicesCopy.push({name: serviceName, price, serviceTime, weekDays});
    setServicesList(servicesCopy);
    AsyncStorage.setItem("@newcompany", JSON.stringify({
      name, description, category, contact, address, openingHours, services: servicesCopy
    })).then(r => console.log(r));
  }

  useEffect(() => {
    setServiceName("");
    setPrice(undefined);
    setServiceTime(undefined);
    setWeekDays([]);
    setUniqueKey(uniqueKey + 1);
  }, [servicesList]);

  const saveServices = () => {
    setGlobalErrorText('');
    if (servicesList.length === 0) {
      setGlobalErrorText('Add at least one service');
      return;
    }
    AsyncStorage.setItem("@newcompany", JSON.stringify({
      name, description, category, contact, address, openingHours, services: servicesList
    })).then(r => console.log(r));
    navigation.navigate("Company Summary", {
      name, description, category, contact, address, openingHours, services: servicesList
    });
  }

  const displayServices = () => {
    return servicesList.map(service =>
      <View key={service.name} style={styles.companySectionStyle}>
        <Text style={styles.dropdownTextStyle}><Text style={styles.serviceTextStyle}>Service name:</Text> {service.name}
        </Text>
        <Text style={styles.dropdownTextStyle}><Text style={styles.serviceTextStyle}>Price: </Text>{service.price}
        </Text>
        <Text style={styles.dropdownTextStyle}><Text style={styles.serviceTextStyle}>Service
          time: </Text>{service.serviceTime}</Text>
        <Text style={styles.dropdownTextStyle}><Text style={styles.serviceTextStyle}>Working
          days: </Text>{service.weekDays?.join(", ")}</Text>
      </View>)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled"
                contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
      <KeyboardAvoidingView enabled>
        {
          servicesList.length > 0 ?
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
        </View>
        {errorText !== '' ? (
          <Text style={styles.errorTextStyle}>
            {errorText}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.addButtonStyle}
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
  addButtonStyle: {
    backgroundColor: '#0e6df1',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#0e6df1',
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
  serviceTextStyle: {
    fontWeight: 'bold',
    fontSize: 18
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
  companyInfo: {
    fontWeight: "bold",
    fontSize: 18,
  }
})

export default CompanyService;
