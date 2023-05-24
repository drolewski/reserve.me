import {Button, View} from 'react-native';

const Welcome = ({navigation}: any) => {
  return (
    <View>
      <Button title="Register me" onPress={() => navigation.reset({
        index: 0,
        routes: [{name: 'Register'}],
      })}/>
      <Button title="Login" onPress={() => navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      })}/>
      <Button title="Home" onPress={() => navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      })}/>
    </View>
  );
}

export default Welcome;
