import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './helper/auth/privateRoute.js';

import LandingScreen from './screens/LandingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/HomeScreen';
import Notification from './screens/NotificationScreen';
import NotFound from './screens/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/notifications" component={Notification} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
