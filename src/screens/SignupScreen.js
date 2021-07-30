import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Dimensions, TouchableOpacity, ActivityIndicator,Modal} from 'react-native';

import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

const SignupScreen = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		if (email.length === 0 || password.length === 0) {
			alert('Email or password cannot be empty');
			return;
		}
		setLoading(true);
		auth()
		  .createUserWithEmailAndPassword(email, password)
		  .then(() => {
		    alert('User account created & signed in!');
		  })
		  .catch(error => {
		    if (error.code === 'auth/email-already-in-use') {
		      alert('Email-address already in use!');
		    }

		    if (error.code === 'auth/invalid-email') {
		      alert('TEmail address is invalid!');
		    }

		    if (error.code === 'auth/weak-password') {
		      alert('Password is too weak!');
		    }
		  });
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<Modal visible={loading}>
				<View style={styles.loader}>
					<ActivityIndicator size="large" color="#171c21" />
				</View>
			</Modal>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>Sign Up</Text>
			</View>
			<View style={styles.formContainer}>
				<Text style={styles.welcome}>Create an account</Text>
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
					<CustomButton click={handleSubmit} title="Sign Up" />
				</View>
				<View style={styles.signInContainer}>
					<Text>Already have an account? </Text>
					<TouchableOpacity onPress={()=>{props.navigation.navigate('Signin')}}>
						<Text style={styles.signInButton}>Sign in</Text>
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
	},
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'rgba(0,0,0,0.5)'
	}
});

export default SignupScreen;