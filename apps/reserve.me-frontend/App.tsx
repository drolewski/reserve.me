import {NavigationContainer} from '@react-navigation/native';
import AppNavigationStack from './src/navigation/AppNavigationStack/AppNavigationStack';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigationStack/>
    </NavigationContainer>
  );
}

export default App;
