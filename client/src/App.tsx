import LoginScreen from './screens/LoginScreen';

import { BrowserRouter, Route } from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={LandingScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/home" component={HomeScreen} />
    </BrowserRouter>
  );
};

export default App;
