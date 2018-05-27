import HomeScreen from '../screens/Home';
import MainScreen from '../screens/MainScreen';
import { createBottomTabNavigator } from 'react-navigation';

const Tabs = createBottomTabNavigator({
  Dash: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Dashboard'
    }
  },
  Clients: {
    screen: MainScreen,
    navigationOptions: {
      tabBarLabel: 'Clients'
    }
  }
});

export default Tabs;
