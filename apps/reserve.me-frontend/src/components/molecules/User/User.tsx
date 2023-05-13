import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';
import {UserDataResponse} from '../../../services/user/UserDataResponse';
import {userApi} from '../../../services/user/UserService';

const User = ({navigation}: any) => {

  const [user, setUser] = useState<UserDataResponse>();

  useEffect(() => {
    // TODO get phoneNumber from store
    userApi("1")
      .then((response: UserDataResponse) => setUser(response))
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          alignContent: 'center',
          justifyContent: 'center'
        }}>
        <Text style={styles.successTextStyle}>{user?.userName}</Text>
        <Text style={styles.successTextStyle}>{user?.phoneNumber}</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Profile', {
            profile: {
              name: "asdasd",
              surname: "adsa",
              sex: "string",
              birthday: (new Date()).toISOString().substring(0, 10),
            },
            phoneNumber: "1"
          })}>
          <Text style={styles.buttonTextStyle}>Personal data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.reset({
            index: 0,
            routes: [{name: 'Address'}],
          })}>
          <Text style={styles.buttonTextStyle}>Address</Text>
        </TouchableOpacity>
        {/* TODO opinion tab */}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.reset({
            index: 0,
            routes: [{name: 'Address'}],
          })}>
          <Text style={styles.buttonTextStyle}>Opinion</Text>
        </TouchableOpacity>
        {/* TODO remove from app session */}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.reset({
            index: 0,
            routes: [{name: 'Address'}],
          })}>
          <Text style={styles.buttonTextStyle}>Logout</Text>
        </TouchableOpacity>
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

export default User;