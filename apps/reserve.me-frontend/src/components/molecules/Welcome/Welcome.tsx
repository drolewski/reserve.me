import {Button, Text, View} from 'react-native';
import Settings from '../Profile/Profile';

const Welcome = ({navigation}: any) => {
  return (
    <View>
      <Text>Hello in Reserve.me! TODO</Text>
      <Button title="Register me" onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'Register' }],
      })}/>
      <Button title="Login" onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })}/>
        <Button title="Home" onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })}/>
        <Button title="Profile" onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }],
      })}/>
    </View>
  );
}

export default Welcome;
