import React, {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Button, Image, ActivityIndicator, Modal} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';

import CustomButton from '../components/CustomButton';


const ImageUploadScreen = (props) => {
	const [imageUri, setImageUri] = useState('');
	const [imageName, setImageName] = useState('');
	const [loading, setLoading] = useState(false);

	const chooseImage = () => {
		const options = {
		  title: 'Select Avatar',
		  storageOptions: {
		    skipBackup: true,
		    path: 'images',
		  },
		};

		ImagePicker.launchImageLibrary(options, (response) => {

		  if (response.didCancel) {
		    alert('User cancelled image picker');
		  } else if (response.error) {
		    alert('ImagePicker Error: ', response.error);
		  } else {
		    const uri = response.assets[0].uri;
		    const imageName = response.assets[0].fileName;
		   setImageUri(uri);
		   setImageName(imageName);
		  }
		});
	}

	const uploadImage = async() => {
		if (imageUri === '' || imageName === '') {
			alert('Please choose an image to upload.');
			return;
		}
		setLoading(true);
		await storage()
			  .ref(imageName)
			  .putFile(imageUri)
			  .then((snapshot) => {
			    alert(`Image has been successfully uploaded.`);
			  })
			  .catch((e) => alert('Something went wrong! Failed to upload image.'));
		setLoading(false);
	}

	const handleSignout = () => {
		auth()
		.signOut()
		.then(() => alert('User signed out!'));
	}

	// if (loading) {
	// 	return (
	// 		<View style={styles.loader}>
	// 			<ActivityIndicator size="large" color="#171c21" />
	// 		</View>
	// 	)
	// }

	return (
		<SafeAreaView style={styles.container}>
			<Modal visible={loading} transparent={true}>
				<View style={styles.loader}>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			</Modal>
            <View style={styles.imgContainer}>
                {imageUri ? <Image style={styles.uploadImage} source={{ uri: imageUri }} /> : null}
                <CustomButton click={chooseImage} title="Choose Image" />
                <CustomButton click={uploadImage} title="Upload Image" />
                <CustomButton click={handleSignout} title="Sign out" />
            </View>
        </SafeAreaView>
	);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#e6e6fa',
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    eightyWidthStyle: {
        width: '80%',
        margin: 2,
    },
    uploadImage: {
        width: '80%',
        height: 300,
    },
    loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'rgba(0,0,0,0.5)'
	}
});

export default ImageUploadScreen;