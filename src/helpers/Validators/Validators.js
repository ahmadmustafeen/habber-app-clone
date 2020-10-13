import { Alert } from 'react-native';

export const validateEmail = email => {
	return (
		email &&
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		)
	);
};

export const validatePassword = password => {
	return password.length >= 6;
};

export const validatePhone = phone => phone && phone.length > 9;

export const validateDescription = (field, description) => {
	if (field) {
		if (description) {
			return true;
		}
		Alert.alert('Please fill description');
		return false;
	}
	if (field === false || field === null || field === '') {
		if (description) {
			//Alert.alert('Unnecessory description provided');
			return true;
		}
		return true;
	}
	return true;
};
export const validateWordCount = (value, length) => {
	if (value.split(' ').length >= length) return true;
	// Alert.alert(`Minimum ${length} words required`);
	return false;
};
