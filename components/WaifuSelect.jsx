import { View, Text, Pressable, Image, ImageBackground, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';

let waifuInfo = {
	'name': 'Airi',
	'age': 22,
	'avatar': require('../assets/images/characters/avatar.png'),
	'stageOne': require('../assets/buscaminas-2.jpeg'),
}


export default WaifuSelect = () => {
	const navigation = useNavigation();

	const handlePress = () => {
		navigation.navigate('Play', { 'waifu': waifuInfo });
	};

	return (
		<View style={{ 'flex': 1 }}>
			<ScrollView style={{ 'flex': 1, backgroundColor: 'orange' }}>
				<Pressable onPress={handlePress} style={{}}>
					<ImageBackground source={require('../assets/images/select/select_waifu_1.png')} style={{ width: '100%', height: 200, objectFit: 'contain' }}>
					</ImageBackground>
				</Pressable>
				<Pressable onPress={handlePress} style={{}}>
					<ImageBackground source={require('../assets/images/select/select_waifu_1.png')} style={{ width: '100%', height: 200, objectFit: 'contain' }}>
					</ImageBackground>
				</Pressable>
				<Pressable onPress={handlePress} style={{}}>
					<ImageBackground source={require('../assets/images/select/select_waifu_1.png')} style={{ width: '100%', height: 200, objectFit: 'contain' }}>
					</ImageBackground>
				</Pressable>
				<Pressable onPress={handlePress} style={{}}>
					<ImageBackground source={require('../assets/images/select/select_waifu_1.png')} style={{ width: '100%', height: 200, objectFit: 'contain' }}>
					</ImageBackground>
				</Pressable>
				<Pressable onPress={handlePress} style={{}}>
					<ImageBackground source={require('../assets/images/select/select_waifu_1.png')} style={{ width: '100%', height: 200, objectFit: 'contain' }}>
					</ImageBackground>
				</Pressable>
				<Pressable onPress={handlePress} style={{}}>
					<ImageBackground source={require('../assets/images/select/select_waifu_1.png')} style={{ width: '100%', height: 200, objectFit: 'contain' }}>
					</ImageBackground>
				</Pressable>
				<Pressable onPress={handlePress} style={{}}>
					<ImageBackground source={require('../assets/images/select/select_waifu_1.png')} style={{ width: '100%', height: 200, objectFit: 'contain' }}>
					</ImageBackground>
				</Pressable>
				<Pressable onPress={handlePress} style={{}}>
					<ImageBackground source={require('../assets/images/select/select_waifu_1.png')} style={{ width: '100%', height: 200, objectFit: 'contain' }}>
					</ImageBackground>
				</Pressable>
			</ScrollView>
		</View >
	)
}
