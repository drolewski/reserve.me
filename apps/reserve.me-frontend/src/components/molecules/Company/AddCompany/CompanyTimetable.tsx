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
import {useState} from 'react';
import {WeekDay} from '../../../../services/company/CompanyRequest';

const CompanyTimetable = ({route, navigation}: any) => {


  const {name, description, category, email, phoneNumber, street, city, number, postCode} = route.params;

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
    navigation.navigate("CompanyService", {
      name, description, category, email, phoneNumber, street, city, number, postCode,
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
      {/* TODO Loader */}
      <ScrollView keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{
                    alignContent: 'center',
                    justifyContent: 'center'
                  }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.container}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isMonday}
                        onValueChange={setIsMonday}
                        style={styles.checkbox}/>
              <Text style={styles.label}>Monday</Text>
            </View>
          </View>
          {isMonday ?
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(open) => setMondayOpen(open)}
                placeholder="Enter open hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(close) => setMondayClose(close)}
                placeholder="Enter close hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            : <></>
          }
          <View style={styles.container}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isTuesday}
                        onValueChange={setIsTuesday}
                        style={styles.checkbox}/>
              <Text style={styles.label}>Tuesday</Text>
            </View>
          </View>
          {isTuesday ?
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(open) => setTuesdayOpen(open)}
                placeholder="Enter open hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(close) => setTuesdayClose(close)}
                placeholder="Enter close hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            : <></>
          }
          <View style={styles.container}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isWednesday}
                        onValueChange={setIsWednesday}
                        style={styles.checkbox}/>
              <Text style={styles.label}>Wednesday</Text>
            </View>
          </View>
          {isWednesday ?
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(open) => setWednesdayOpen(open)}
                placeholder="Enter open hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(close) => setWednesdayClose(close)}
                placeholder="Enter close hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            : <></>
          }
          <View style={styles.container}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isThursday}
                        onValueChange={setIsThursday}
                        style={styles.checkbox}/>
              <Text style={styles.label}>Thursday</Text>
            </View>
          </View>
          {isThursday ?
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(open) => setThursdayOpen(open)}
                placeholder="Enter open hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(close) => setThursdayClose(close)}
                placeholder="Enter close hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            : <></>
          }
          <View style={styles.container}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isFriday}
                        onValueChange={setIsFriday}
                        style={styles.checkbox}/>
              <Text style={styles.label}>Friday</Text>
            </View>
          </View>
          {isFriday ?
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(open) => setFridayOpen(open)}
                placeholder="Enter open hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(close) => setFridayClose(close)}
                placeholder="Enter close hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            : <></>
          }
          <View style={styles.container}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isSaturday}
                        onValueChange={setIsSaturday}
                        style={styles.checkbox}/>
              <Text style={styles.label}>Saturday</Text>
            </View>
          </View>
          {isSaturday ?
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(open) => setSaturdayOpen(open)}
                placeholder="Enter open hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(close) => setSaturdayClose(close)}
                placeholder="Enter close hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            : <></>
          }
          <View style={styles.container}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isSunday}
                        onValueChange={setIsSunday}
                        style={styles.checkbox}/>
              <Text style={styles.label}>Sunday</Text>
            </View>
          </View>
          {isSunday ?
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(open) => setSundayOpen(open)}
                placeholder="Enter open hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(close) => setSundayClose(close)}
                placeholder="Enter close hour"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
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

export default CompanyTimetable;