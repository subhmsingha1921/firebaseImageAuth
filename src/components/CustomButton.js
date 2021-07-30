import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const CustomButton = props => {
	return (
		<TouchableOpacity onPress={props.click} activeOpacity={0.7}>
			<View style={styles.buttonContainer}>
				<Text style={styles.buttonText}>{props.title}</Text>
			</View>
		</TouchableOpacity>
		)
}

const styles =StyleSheet.create({
	buttonContainer: {
		width: width-60,
		alignItems: 'center',
		backgroundColor: '#171c21',
		paddingVertical: 15,
		borderRadius: 30,
		marginVertical: 14,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	}
})

export default CustomButton;