import {
  CheckBox,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {useEffect, useState} from 'react';
import {WeekDay} from '../../../../services/company/CompanyRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CompanyModel} from './CompanyModel';

const CompanyTimetable = ({route, navigation}: any) => {

  const {name, description, category, contact, address, openingHours, services}: CompanyModel = route.params ?? {};

  const [isMonday, setIsMonday] = useState<boolean>(false);
  const [mondayOpen, setMondayOpen] = useState<string>();
  const [mondayClose, setMondayClose] = useState<string>();
  const [isTuesday, setIsTuesday] = useState<boolean>(false);
  const [tuesdayOpen, setTuesdayOpen] = useState<string>();
  const [tuesdayClose, setTuesdayClose] = useState<string>();
  const [isWednesday, setIsWednesday] = useState<boolean>(false);
  const [wednesdayOpen, setWednesdayOpen] = useState<string>();
  const [wednesdayClose, setWednesdayClose] = useState<string>();
  const [isThursday, setIsThursday] = useState<boolean>(false);
  const [thursdayOpen, setThursdayOpen] = useState<string>();
  const [thursdayClose, setThursdayClose] = useState<string>();
  const [isFriday, setIsFriday] = useState<boolean>(false);
  const [fridayOpen, setFridayOpen] = useState<string>();
  const [fridayClose, setFridayClose] = useState<string>();
  const [isSaturday, setIsSaturday] = useState<boolean>(false);
  const [saturdayOpen, setSaturdayOpen] = useState<string>();
  const [saturdayClose, setSaturdayClose] = useState<string>();
  const [isSunday, setIsSunday] = useState<boolean>(false);
  const [sundayOpen, setSundayOpen] = useState<string>();
  const [sundayClose, setSundayClose] = useState<string>();

  const [errorText, setErrorText] = useState<string>();

  useEffect(() => {
    if (!!openingHours && openingHours.length > 0) {
      setIsMonday(!!openingHours[0].open && !!openingHours[0].close);
      setMondayOpen(openingHours[0].open ?? "");
      setMondayClose(openingHours[0].close ?? "");
      setIsTuesday(!!openingHours[1].open && !!openingHours[1].close);
      setTuesdayOpen(openingHours[1].open ?? "");
      setTuesdayClose(openingHours[1].close ?? "");
      setIsWednesday(!!openingHours[2].open && !!openingHours[2].close);
      setWednesdayOpen(openingHours[2].open ?? "");
      setWednesdayClose(openingHours[2].close ?? "");
      setIsThursday(!!openingHours[3].open && !!openingHours[3].close);
      setThursdayOpen(openingHours[3].open ?? "");
      setThursdayClose(openingHours[3].close ?? "");
      setIsFriday(!!openingHours[4].open && !!openingHours[4].close);
      setFridayOpen(openingHours[4].open ?? "");
      setFridayClose(openingHours[4].close ?? "");
      setIsSaturday(!!openingHours[5].open && !!openingHours[5].close);
      setSaturdayOpen(openingHours[5].open ?? "");
      setSaturdayClose(openingHours[5].close ?? "");
      setIsSunday(!!openingHours[6].open && !!openingHours[6].close);
      setSundayOpen(openingHours[6].open ?? "");
      setSundayClose(openingHours[6].close ?? "");
    }
  }, []);

  const saveCompanyTimetable = () => {
    setErrorText('');
    if (!isMonday && !isTuesday && !isWednesday && !isThursday && !isFriday && !isSaturday && !isSunday) {
      setErrorText("Set at least one open day");
      return;
    }
    if (isMonday && (!mondayOpen || !mondayClose)) {
      setErrorText("Set Monday open and close hours");
      return;
    }
    if (isTuesday && (!tuesdayOpen || !tuesdayClose)) {
      setErrorText("Set Tuesday open and close hours");
      return;
    }
    if (isWednesday && (!wednesdayOpen || !wednesdayClose)) {
      setErrorText("Set Wednesday open and close hours");
      return;
    }
    if (isThursday && (!thursdayOpen || !thursdayClose)) {
      setErrorText("Set Thursday open and close hours");
      return;
    }
    if (isFriday && (!fridayOpen || !fridayClose)) {
      setErrorText("Set Friday open and close hours");
      return;
    }
    if (isSaturday && (!saturdayOpen || !saturdayClose)) {
      setErrorText("Set Saturday open and close hours");
      return;
    }
    if (isSunday && (!sundayOpen || !sundayClose)) {
      setErrorText("Set Sunday open and close hours");
      return;
    }
    AsyncStorage.setItem("@newcompany", JSON.stringify({
      name, description, category, contact, address, services,
      openingHours: [
        {
          weekDay: WeekDay.MONDAY,
          open: mondayOpen,
          close: mondayClose
        },
        {
          weekDay: WeekDay.TUESDAY,
          open: tuesdayOpen,
          close: tuesdayClose
        },
        {
          weekDay: WeekDay.WEDNESDAY,
          open: wednesdayOpen,
          close: wednesdayClose
        },
        {
          weekDay: WeekDay.THURSDAY,
          open: thursdayOpen,
          close: thursdayClose
        },
        {
          weekDay: WeekDay.FRIDAY,
          open: fridayOpen,
          close: fridayClose
        },
        {
          weekDay: WeekDay.SATURDAY,
          open: saturdayOpen,
          close: saturdayClose
        },
        {
          weekDay: WeekDay.SUNDAY,
          open: sundayOpen,
          close: sundayClose
        }],
    })).then(r => console.log(r));
    navigation.navigate("Company Service", {
      name, description, category, contact, address, services,
      openingHours: [
        {
          weekDay: WeekDay.MONDAY,
          open: mondayOpen,
          close: mondayClose
        },
        {
          weekDay: WeekDay.TUESDAY,
          open: tuesdayOpen,
          close: tuesdayClose
        },
        {
          weekDay: WeekDay.WEDNESDAY,
          open: wednesdayOpen,
          close: wednesdayClose
        },
        {
          weekDay: WeekDay.THURSDAY,
          open: thursdayOpen,
          close: thursdayClose
        },
        {
          weekDay: WeekDay.FRIDAY,
          open: fridayOpen,
          close: fridayClose
        },
        {
          weekDay: WeekDay.SATURDAY,
          open: saturdayOpen,
          close: saturdayClose
        },
        {
          weekDay: WeekDay.SUNDAY,
          open: sundayOpen,
          close: sundayClose
        }],
    });
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{
        alignContent: 'center',
        justifyContent: 'center'
      }}>
        <KeyboardAvoidingView enabled>
          <View>
            <View style={styles.companySectionStyle}>
              <View style={styles.checkboxContainer}>
                <CheckBox value={isMonday}
                          onValueChange={setIsMonday}
                          style={styles.checkbox}/>
                <Text style={styles.label}>Monday</Text>
              </View>
            </View>
            {isMonday ?
              <View style={styles.timeTableSection}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(open) => setMondayOpen(open)}
                  placeholder="Enter open hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={mondayOpen ?? ""}
                />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(close) => setMondayClose(close)}
                  placeholder="Enter close hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={mondayClose ?? ""}
                />
              </View>
              : <></>
            }
            <View style={styles.companySectionStyle}>
              <View style={styles.checkboxContainer}>
                <CheckBox value={isTuesday}
                          onValueChange={setIsTuesday}
                          style={styles.checkbox}/>
                <Text style={styles.label}>Tuesday</Text>
              </View>
            </View>
            {isTuesday ?
              <View style={styles.timeTableSection}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(open) => setTuesdayOpen(open)}
                  placeholder="Enter open hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={tuesdayOpen ?? ""}
                />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(close) => setTuesdayClose(close)}
                  placeholder="Enter close hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={tuesdayClose ?? ""}
                />
              </View>
              : <></>
            }
            <View style={styles.companySectionStyle}>
              <View style={styles.checkboxContainer}>
                <CheckBox value={isWednesday}
                          onValueChange={setIsWednesday}
                          style={styles.checkbox}/>
                <Text style={styles.label}>Wednesday</Text>
              </View>
            </View>
            {isWednesday ?
              <View style={styles.timeTableSection}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(open) => setWednesdayOpen(open)}
                  placeholder="Enter open hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={wednesdayOpen ?? ""}
                />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(close) => setWednesdayClose(close)}
                  placeholder="Enter close hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={wednesdayClose ?? ""}
                />
              </View>
              : <></>
            }
            <View style={styles.companySectionStyle}>
              <View style={styles.checkboxContainer}>
                <CheckBox value={isThursday}
                          onValueChange={setIsThursday}
                          style={styles.checkbox}/>
                <Text style={styles.label}>Thursday</Text>
              </View>
            </View>
            {isThursday ?
              <View style={styles.timeTableSection}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(open) => setThursdayOpen(open)}
                  placeholder="Enter open hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={thursdayOpen ?? ""}
                />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(close) => setThursdayClose(close)}
                  placeholder="Enter close hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={thursdayClose ?? ""}
                />
              </View>
              : <></>
            }
            <View style={styles.companySectionStyle}>
              <View style={styles.checkboxContainer}>
                <CheckBox value={isFriday}
                          onValueChange={setIsFriday}
                          style={styles.checkbox}/>
                <Text style={styles.label}>Friday</Text>
              </View>
            </View>
            {isFriday ?
              <View style={styles.timeTableSection}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(open) => setFridayOpen(open)}
                  placeholder="Enter open hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={fridayOpen ?? ""}
                />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(close) => setFridayClose(close)}
                  placeholder="Enter close hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={fridayClose ?? ""}
                />
              </View>
              : <></>
            }
            <View style={styles.companySectionStyle}>
              <View style={styles.checkboxContainer}>
                <CheckBox value={isSaturday}
                          onValueChange={setIsSaturday}
                          style={styles.checkbox}/>
                <Text style={styles.label}>Saturday</Text>
              </View>
            </View>
            {isSaturday ?
              <View style={styles.timeTableSection}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(open) => setSaturdayOpen(open)}
                  placeholder="Enter open hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={saturdayOpen ?? ""}
                />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(close) => setSaturdayClose(close)}
                  placeholder="Enter close hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={saturdayClose ?? ""}
                />
              </View>
              : <></>
            }
            <View style={styles.companySectionStyle}>
              <View style={styles.checkboxContainer}>
                <CheckBox value={isSunday}
                          onValueChange={setIsSunday}
                          style={styles.checkbox}/>
                <Text style={styles.label}>Sunday</Text>
              </View>
            </View>
            {isSunday ?
              <View style={styles.timeTableSection}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(open) => setSundayOpen(open)}
                  placeholder="Enter open hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={sundayOpen ?? ""}
                />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(close) => setSundayClose(close)}
                  placeholder="Enter close hour"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={sundayClose ?? ""}
                />
              </View>
              : <></>
            }
            {errorText !== '' ? (
              <Text style={styles.errorTextStyle}>
                {errorText}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => saveCompanyTimetable()}>
              <Text style={styles.buttonTextStyle}>Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    padding: 10
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
  companySectionStyle: {
    display: 'flex',
    flexDirection: 'column',
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
  timeTableSection: {
    flex: 1,
    flexDirection: 'row',
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
  },
})

export default CompanyTimetable;