import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import ImageUploadScreen from '../screens/ImageUploadScreen';


const RootStack = createStackNavigator();

const RootStackNavigator = () => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
		console.log(user);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) return null;

	return (
		<RootStack.Navigator screenOptions={{headerShown:false}}>
			{user ? (
				<RootStack.Screen 
					name="imageUpload"
					component={ImageUploadScreen}
				/>
			) : (
				<>
					<RootStack.Screen 
						name="Signup"
						component={SignupScreen}
					/>
					<RootStack.Screen 
						name="Signin"
						component={SigninScreen}
					/>
				</>
			)}
		</RootStack.Navigator>
	);
}

export default RootStackNavigator;