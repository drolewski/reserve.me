import {useEffect, useState} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list/index';
import {reserveApi} from '../../../services/reservation/ReservationService';
import {ErrorResponse} from '../../../services/error/ErrorResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Reservation = ({route, navigation}: any) => {

  const {services, hour, date, companyName} = route.params;

  const [servicesData, setServicesData] = useState<{ key: number, value: string }[]>([]);
  const [pickedService, setPickedService] = useState<number>();
  const [errorText, setErrorText] = useState<string>("");
  const [storedPhoneNumber, setStoredPhoneNumber] = useState<string>("");

  useEffect(() => {
    AsyncStorage.getItem('@userPhoneNumber').then(r => setStoredPhoneNumber(r));
    const servicesDataTmp = [];
    for (let i = 0; i < services.length; i++) {
      servicesDataTmp.push({key: i, value: `${services[i].name} (${services[i].price})`})
    }
    setServicesData(servicesDataTmp);
  }, []);

  const reserve = () => {
    setErrorText("");
    if (pickedService === undefined) {
      setErrorText("Select service");
      return;
    }
    const reservationRequest = {
      companyName, reserved: {
        ownerPhoneNumber: storedPhoneNumber,
        date, start: getFormattedHour(hour), serviceName: services[pickedService].name
      }
    }
    reserveApi(reservationRequest).then((response: ErrorResponse) => {
      if (!!response) {
        setErrorText(response.message);
        return;
      }
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    });
  }

  const getFormattedHour = (hour: string) => {
    return hour.length === 4 ? `0${hour}` : hour;
  }

  return <View style={{flex: 1}}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{
      alignContent: 'center',
      justifyContent: 'center'
    }}>
      <KeyboardAvoidingView enabled>
        <View style={{display: 'flex', flexDirection: 'column', marginTop: 20}}>
          <Text style={styles.timetableInfo}>{date.toLocaleDateString()}</Text>
          <Text style={styles.timetableInfo}>{hour}</Text>
          <SelectList
            boxStyles={styles.dropdownInputStyle}
            dropdownTextStyles={styles.dropdownTextStyle}
            setSelected={(weekDay: any) => setPickedService(weekDay)}
            data={servicesData}
            save="key"
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
          onPress={() => reserve()}>
          <Text style={styles.buttonTextStyle}>Reserve</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  </View>;
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
  serviceCategorySectionStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 35,
    marginRight: 35,
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
    marginTop: 20
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
  companyInfo: {
    fontWeight: "bold",
    fontSize: 18,
  },
  timetableInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: "bold",
    fontSize: 18,
  },
})

export default Reservation;
