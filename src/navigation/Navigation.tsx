import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignUp from '../screens/auth/signup/SignUp';
import LoginScreen from '../screens/auth/login/Login';
import ForgetPassScreen from '../screens/auth/forgetPassword/ForgetPassword';
import Home from '../screens/Home/Home';
import Transaction from '../screens/Home/Transactions';
import ProfileHome from '../screens/Profile/ProfileHome';
import UpdateProfileScreen from '../screens/Profile/UpdateProfile';
import ResetPassword from '../screens/Profile/ResetPassword';
import IncomeInputScreen from '../screens/createTransaction/IncomeInput';
import Budget from '../screens/Home/Budget';
import ExpenseInputScreen from '../screens/createTransaction/expenseInput/ExpenseInput';
import {Image} from 'react-native';

// Import your custom icons
import homeIcon from '../assets/home.png';
import transactionIcon from '../assets/transaction.png';
import profileIcon from '../assets/user.png';
import budgetIcon from '../assets/piechart.png';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState();

const TabNavigation = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconSource;

        if (route.name === 'HomeScreen') {
          iconSource = focused ? homeIcon : homeIcon;
        } else if (route.name === 'Transaction') {
          iconSource = focused ? transactionIcon : transactionIcon;
        } else if (route.name === 'ProfileHome') {
          iconSource = focused ? profileIcon : profileIcon;
        } else if (route.name === 'Budget') {
          iconSource = focused ? budgetIcon : budgetIcon;
        }

        return (
          <Image
            source={iconSource}
            style={{width: size, height: size, tintColor: color}}
          />
        );
      },
      tabBarActiveTintColor: '#7F3DFF',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen
      name="HomeScreen"
      component={Home}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Transaction"
      component={Transaction}
      options={{headerShown: false}}
    />
    {/* <Tab.Screen
      name="Transaction"
      component={Transaction}
      options={{headerShown: false}}
    /> */}
    <Tab.Screen
      name="Budget"
      component={Budget}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="ProfileHome"
      component={ProfileHome}
      options={{headerShown: false}}
    />
  </Tab.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="signup"
          options={{headerShown: false}}
          component={SignUp}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassScreen"
          component={ForgetPassScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateProfileScreen"
          component={UpdateProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="IncomeInputScreen"
          component={IncomeInputScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExpenseInputScreen"
          component={ExpenseInputScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
