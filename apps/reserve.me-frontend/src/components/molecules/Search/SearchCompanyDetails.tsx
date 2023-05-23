import {useEffect, useState} from 'react';
import {getCompany} from '../../../services/company/CompanyService';
import {CompanyResponse} from '../../../services/company/CompanyResponse';
import {getCompanyReservation} from '../../../services/reservation/ReservationService';
import {ReservationListResponse} from '../../../services/reservation/ReservationListResponse';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SearchCompanyDetails = ({route, navigation}: any) => {

  const [companyData, setCompanyData] = useState<CompanyResponse>();
  const [reservationData, setReservationData] = useState<ReservationListResponse>();

  const {companyName} = route.params;

  useEffect(() => {
    getCompany(companyName)
      .then((response: CompanyResponse) => {
        setCompanyData(response);
      });
    getCompanyReservation(companyName)
      .then((response: ReservationListResponse) => {
        setReservationData(response);
      });
  }, []);

  const getOpeningHour = (day: number) => {
    if (!companyData) {
      return;
    }
    if (day === 0) {
      return companyData.openingHours[6];
    } else if (day === 1) {
      return companyData.openingHours[0];
    } else if (day === 2) {
      return companyData.openingHours[1];
    } else if (day === 3) {
      return companyData.openingHours[2];
    } else if (day === 4) {
      return companyData.openingHours[3];
    } else if (day === 5) {
      return companyData.openingHours[4];
    } else if (day === 6) {
      return companyData.openingHours[5];
    }
  }

  const isReserved = (date: Date, time: string) => {
    if (!!reservationData && !!reservationData.reserved) {
      const result = reservationData.reserved.filter(reserve => {
        return reserve.date[2] === date.getDate() && time === `${reserve.start[0]}:${parseMinutes(reserve.start[1])}`;
      })
      return result.length > 0;
    }
    return false;
  }

  const displayTimetable = () => {
    if (!companyData) {
      return <Text>No company data</Text>;
    }

    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const today = new Date();
      const todayDate = today.getDate();
      today.setDate(todayDate + i);
      dates.push(today);
    }
    return dates.map(date => {
      const day = date.getDay();
      const openingHour = getOpeningHour(day);
      if (!openingHour || !openingHour.close || !openingHour.open) {
        return <View key={date.toLocaleDateString()} style={styles.sectionStyle}>
          <Text>{openingHour?.weekDay ?? ""}</Text>
          <Text>{date.toLocaleDateString()}</Text>
          <Text>CLOSED</Text>
        </View>
      }
      const closeMinutes = openingHour.close[0] * 60 + openingHour.close[1];
      const openMinutes = openingHour.open[0] * 60 + openingHour.open[1];

      const hours: string[] = [];
      for (let i = openMinutes; i < closeMinutes; i += 15) {
        const hour = `${Math.floor(i / 60)}:${parseMinutes(i)}`;
        hours.push(hour);
      }

      return (
        <View key={date.toDateString()} style={styles.sectionStyle}>
          <Text>{openingHour.weekDay}</Text>
          <Text>{date.toLocaleDateString()}</Text>
          {hours.length > 0 ?
            hours.map(hour => {
                return <TouchableOpacity key={hour}
                                         style={isReserved(date, hour) ? styles.reservedButtonStyle : styles.buttonStyle}
                                         activeOpacity={0.5}
                                         onPress={() => navigation.navigate('Reservation', {
                                           services: companyData?.services,
                                           hour: hour,
                                           date: date,
                                           companyName: companyData?.name
                                         })}>
                  <Text style={styles.buttonTextStyle}>{hour}</Text>
                </TouchableOpacity>
              }
            ) : <></>}
        </View>
      );
    });
  }

  const parseMinutes = (minutes: number) => {
    return minutes % 60 < 10 ? `0${minutes % 60}` : `${minutes % 60}`
  }

  return <View style={{flex: 1}}>
    <ScrollView keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  alignContent: 'center',
                  justifyContent: 'center'
                }}>
      <KeyboardAvoidingView enabled>
        {displayTimetable()}
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
  reservedButtonStyle: {
    backgroundColor: 'red',
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

export default SearchCompanyDetails;