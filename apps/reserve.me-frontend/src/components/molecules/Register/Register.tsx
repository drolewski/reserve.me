import {Button, StyleSheet, Text, View} from "react-native";

const Register = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Button title="Register" onPress={() =>
        navigation.replace('Register', {name: 'Jane'})
      }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
