import { View, Text, Image, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const ShowImage = ({ route }) => {
	const { waifu, currentStage } = route.params;

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ backgroundColor: 'blue', fontSize: 32 }}>{waifu.name}</Text>
			<Image source={waifu[currentStage]} style={{ flex: 1, width: width, height: height, objectFit: 'contain' }} />
		</View>
	);
}

export default ShowImage