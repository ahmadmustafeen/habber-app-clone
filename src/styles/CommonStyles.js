import { StyleSheet, Dimensions } from 'react-native';
import { BLACK_COLOR, LIGHT_GREY, BORDER_COLOR, BLUE_COLOR } from '../constants';
const { width, height } = Dimensions.get('window');
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CommonStyles = StyleSheet.create({
	title: {
		fontFamily: 'Oswald-Bold',
		lineHeight: 50,
		fontSize: wp('8%'),
		color: BLUE_COLOR,
		textAlign: 'center',
	},
	subTitle: {
		fontFamily: 'Oswald-Bold',
		fontSize: width / 18,
		color: BLUE_COLOR,
	},
	simpleText: {
		fontFamily: 'Poppins-Medium',
		fontSize: 15,
		color: BLACK_COLOR,
	},
	inputContainerStyle: {
		flex: 1,
		paddingBottom: 6,
	},
	inputFieldStyle: {
		height: hp('5%'),
		paddingVertical: 3,
		paddingLeft: 10,
		borderRadius: 5,
		borderColor: BORDER_COLOR,
		borderWidth: 0.5,
		fontSize: wp('4%'),
	},
	redCircle: {
		width: 15,
		height: 15,
		borderRadius: 100 / 2,
		backgroundColor: 'red',
		margin: 2,
	},
	greyLine: {
		width: 300,
		height: 1,
		backgroundColor: LIGHT_GREY,
		marginTop: 20,
		marginLeft: 30,
		marginRight: 30,
	},
	greenCircle: {
		width: 15,
		height: 15,
		borderRadius: 100 / 2,
		backgroundColor: '#9ACD32',
		margin: 2,
	},
	greyCircle: {
		width: 15,
		height: 15,
		borderRadius: 100 / 2,
		backgroundColor: 'grey',
		margin: 2,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: 20,
	},
	column: {
		flexDirection: 'column',
		marginLeft: 10,
		marginRight: 10,
		flex: 1,
	},
});

export default CommonStyles;
