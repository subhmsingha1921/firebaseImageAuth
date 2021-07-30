import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Dimensions, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

const SigninScreen = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = () => {
		if (email.length === 0 || password.length === 0) {
			alert('Email or password cannot be empty');
			return;
		}

		auth()
		  .signInWithEmailAndPassword(email, password)
		  .then(() => {
		    alert('Signed in successfully!');
		  })
		  .catch(error => {
		    if (error.code === 'auth/user-not-found') {
		      alert('Please provide right credentials!');
		    }

		    if (error.code === 'auth/invalid-email') {
		      alert('That email address is invalid!');
		    }

		    if (error.code === 'auth/wrong-password') {
		    	alert('Password is incorrect');
		    }
		  });
	}

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>Sign In</Text>
			</View>
			<View style={styles.formContainer}>
				<Text style={styles.welcome}>Welcome back!</Text>
				<View style={styles.form}>
					<TextInput 
						placeholder="Email"
						style={styles.input}
						onChangeText={(text) => setEmail(text)}
						keyboardType="email-address"
					/>
					<TextInput 
						placeholder="Password"
						style={styles.input}
						onChangeText={(text) => setPassword(text)}
						secureTextEntry
					/>
					<CustomButton click={handleSubmit} title="Sign In" />
				</View>
				<View style={styles.signInContainer}>
					<Text>Don't have an account? </Text>
					<TouchableOpacity onPress={()=>{props.navigation.navigate('Signup')}}>
						<Text style={styles.signInButton}>Sign up</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1f4f9'
	},
	headerContainer: {
		height: height * 0.2,
		backgroundColor: '#f1f4f9',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	headerText: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	welcome: {
		marginVertical: 20,
		fontSize: 30,
		fontWeight: 'bold',
	},
	formContainer: {
		flex: 1,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		backgroundColor: '#fff',
		paddingHorizontal: 30,
	},
	form: {
		marginVertical: 10
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 30,
		borderWidth: 2,
		marginVertical: 14,
		borderColor: '#171c21',
		fontSize: 18,
	},
	signInContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	signInButton: {
		fontSize: 15,
		fontWeight: 'bold',
		marginHorizontal: 5,
	}
});

export default SigninScreen;