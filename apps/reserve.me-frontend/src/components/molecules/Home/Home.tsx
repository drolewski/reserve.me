import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

const Home = () => {

  const [storedData, setStoredData] = useState<string>();

  useEffect(() => {
    AsyncStorage.getItem('@userPhoneNumber').then(r => {
      console.log(r);
      setStoredData(r);
    });
  }, []);

  return <Text>{storedData}</Text>
}

export default Home;