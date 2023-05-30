import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UserReservationListResponse} from '../../../services/reservation/UserReservationListResponse';
import {deleteUserReservationApi, userReservationsApi} from '../../../services/reservation/ReservationService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DeleteReservationRequest} from '../../../services/reservation/DeleteReservationRequest';
import {ErrorResponse} from '../../../services/error/ErrorResponse';

const Home = ({navigation}: any) => {

  const [userPhoneNumber, setUserPhoneNumber] = useState<string>();
  const [userReservations, setUserReservations] = useState<UserReservationListResponse[]>([]);
  const [historicReservations, setHistoricReservations] = useState<UserReservationListResponse[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('@userPhoneNumber').then(r => {
      setUserPhoneNumber(r);
      userReservationsApi(r)
        .then((response: UserReservationListResponse[]) => {
          const historicReservationCopy = [];
          const userReservationsCopy = [];
          response.forEach(reservation => {
            if (!!reservation.date && new Date(reservation.date[0], reservation.date[1], reservation.date[2]).getTime() < new Date().getTime()) {
              historicReservationCopy.push(reservation);
              return;
            }
            userReservationsCopy.push(reservation);
          });
          setUserReservations(userReservationsCopy);
          setHistoricReservations(historicReservationCopy);
        });
    });
  }, []);

  const parseDate = (date: any) => {
    if (date instanceof Array) {
      return `${date[0]}.${date[1] % 12 < 10 ? "0" + date[1] : date[1]}.${date[2] % 30 < 10 ? "0" + date[2] : date[2]}`
    }
    return "";
  }

  const parseTime = (date: any) => {
    if (date instanceof Array) {
      return `${date[0]}:${date[1] % 60 < 10 ? "0" + date[1] : date[1]}`
    }
    return "";
  }

  const handleDelete = (idx: number) => {
    const reservation = userReservations[idx];
    const request: DeleteReservationRequest = {
      ownerPhoneNumber: userPhoneNumber,
      companyName: reservation.companyName,
      date: reservation.date,
      start: reservation.start,
      end: reservation.end,
      serviceName: reservation.serviceName
    }
    deleteUserReservationApi(request)
      .then((response: ErrorResponse) => {
        const reservations = [...userReservations];
        reservations.splice(idx, 1);
        setUserReservations(reservations);
      });
  }

  return <View style={{flex: 1}}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{
      alignContent: 'center',
      justifyContent: 'center'
    }}>
      <KeyboardAvoidingView enabled>
        <View style={styles.companySectionStyle}>
          <Text style={styles.companyInfo}>Future reservations</Text>
          {
            userReservations.map((reservation, idx) =>
              <View style={{marginTop: 20}} key={Math.random() + "-" + reservation.serviceName}>
                <TouchableOpacity style={{display: 'flex', alignItems: 'center'}}
                                  onPress={() => handleDelete(idx)}>
                  <MaterialCommunityIcons name="delete" color={'red'} size={22}/>
                </TouchableOpacity>
                <View style={styles.companySectionStyle}>
                  <Text style={styles.companyTextStyle}>{reservation.serviceName}</Text>
                  <Text style={styles.companyTextStyle}>{reservation.companyName}</Text>
                  <Text style={styles.companyTextStyle}>{parseDate(reservation.date)}</Text>
                  <Text style={styles.companyTextStyle}>{parseTime(reservation.start)}</Text>
                  <Text style={styles.companyTextStyle}>{parseTime(reservation.end)}</Text>
                </View>
              </View>)
          }
          {
            !!historicReservations ?? <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('History', {history: historicReservations})}>
                  <Text style={styles.buttonTextStyle}>History</Text>
              </TouchableOpacity>
          }
        </View>
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
  companyTextStyle: {
    color: '#8b9cb5',
    fontSize: 18,
  },
  companyInfo: {
    fontWeight: "bold",
    fontSize: 18,
  }
})

export default Home;