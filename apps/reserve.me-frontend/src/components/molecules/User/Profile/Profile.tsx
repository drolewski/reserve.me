import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import {useEffect, useState} from 'react';
import {updateUser, userApi} from '../../../../services/user/UserService';
import {UserDataResponse} from '../../../../services/user/UserDataResponse';

const Profile = ({route}: any) => {

  const {profile, phoneNumber} = route.params;

  const [name, setName] = useState<string | undefined>();
  const [newName, setNewName] = useState<string | undefined>();
  const [surname, setSurname] = useState<string | undefined>();
  const [newSurname, setNewSurname] = useState<string | undefined>();
  const [sex, setSex] = useState<string | undefined>();
  const [newSex, setNewSex] = useState<string | undefined>();
  const [birthday, setBirthday] = useState<string | undefined>();
  const [newBirthday, setNewBirthday] = useState<string | undefined>();
  const [errorText, setErrorText] = useState<string>();

  useEffect(() => {
    userApi(phoneNumber)
      .then((response: UserDataResponse) => {
        setName(response.profile?.name);
        setNewName(response.profile?.name);
        setSurname(response.profile?.surname);
        setNewSurname(response.profile?.surname);
        setSex(response.profile?.sex);
        setNewSex(response.profile?.sex);
        setBirthday(!!response?.profile?.birthday ? getDate(response?.profile?.birthday) : undefined);
        setNewBirthday(!!response?.profile?.birthday ? getDate(response?.profile?.birthday) : undefined);
      });
  }, []);


  const getDate = (date: Date) => {
    let resultDate = new Date(date);
    const d = resultDate.getDate();
    resultDate.setDate(d + 1);
    return resultDate.toISOString().substring(0, 10);
  }

  const saveProfileData = () => {
    if (!!phoneNumber && (name !== newName || surname !== newSurname || sex !== newSex || birthday !== newBirthday)) {
      let date = new Date(Date.parse(newBirthday ?? ''));
      updateUser(phoneNumber, {
        profile: {
          name: newName,
          surname: newSurname,
          sex: newSex,
          birthday: date
        }
      }).then(response => {
        if (!!response) {
          setErrorText(response.message);
          return;
        }
      });
    }
  }

  return <View style={{flex: 1, justifyContent: 'center'}}>
    <KeyboardAvoidingView enabled>
      <View style={styles.sectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={setNewName}
          placeholder="Enter name"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          returnKeyType="next"
          value={newName ?? ''}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.sectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={setNewSurname}
          placeholder="Enter surname"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          returnKeyType="next"
          value={newSurname ?? ''}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.sectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={setNewSex}
          placeholder="Enter sex"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          returnKeyType="next"
          value={newSex ?? ''}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.sectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={setNewBirthday}
          placeholder="Enter birthday"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          returnKeyType="next"
          value={newBirthday ?? ''}
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
        onPress={saveProfileData}>
        <Text style={styles.buttonTextStyle}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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


export default Profile;