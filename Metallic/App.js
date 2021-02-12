import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomButton from '../Metallic/button';

const Stack = createStackNavigator();
const screenSize = Dimensions.get("screen");

function LoginScreen() {
  return (
    <View style={styles.mainBackground}>
      <View style={{ backgroundColor: '#2e2b30', width: screenSize.width - 20, height: screenSize.width - 20, paddingTop: 20, paddingLeft: 20, borderRadius: 4 }}>
        <Text style={[textStyle.headText, {paddingBottom: screenSize.width / 8}]}>Login Screen</Text>
        <Text style={[textStyle.normalText, {paddingBottom: 5}]}>Username</Text>
        <TextInput style={styles.textInputStyle} placeholder='Enter your username' autoCapitalize={'none'} />
        <Text style={[textStyle.normalText, {paddingBottom: 5, paddingTop: 15}]}>Password</Text>
        <TextInput style={styles.textInputStyle} placeholder='Enter your password' autoCapitalize={'none'} secureTextEntry={true} />
        <View style={{zIndex: 1, paddingTop: 45, paddingBottom: 10}}>
          <CustomButton text='Login' color='#1e1c21' width={screenSize.width - 60} height={40}/>
        </View>
        <View style={{zIndex: 2}}>
          <CustomButton text={'Don\'t have an account'} color='#1e1c21' width={screenSize.width - 60} height={40} />
        </View>
        
      </View>
    </View>
  );
}

function SignUpScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Sign Up Screen</Text>
    </View>
  );
}

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headStyle: { backgroundColor: '#2e2b30', borderColor: '#2e2b30', shadowColor: '#2e2b30' },
        headTintColor: '#79777d',
        headTitleStyle: { fontSize: 20, fontWeight: 'bold' },
      }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Metallic' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const textStyle = StyleSheet.create({
  headText: {
    // 121, 119, 125
    color: '#79777d',
    fontWeight: 'bold',
    fontSize: 25,
  },
  normalText: {
    color: '#79777d',
    fontSize: 18,
  },
});

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: '#1e1c21',
    // bg rgb: r:30, g:28, b:33
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBackground: {
    // flex: 1,
    // 46, 43, 48
    backgroundColor: '#2e2b30',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textInputStyle: {
    width: screenSize.width - 60, 
    height: 25, 
    backgroundColor: '#fff', 
    borderRadius: 3,
    paddingLeft: 5,
  },
  buttonStyle: {
    backgroundColor: '#1e1c21',
    padding: 20
  }
});
