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
		<View style={{ flex: 1 }}>
			<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 32, backgroundColor: 'pink' }}>
				<Text style={{ fontSize: 32 }}>Select a Waifu to Play</Text>
			</View>
			<ScrollView style={{}}>
				<View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 32 }}>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
					<View style={{ margin: 4 }}>
						<Pressable onPress={handlePress} style={{}}>
							<ImageBackground source={require('../assets/images/characters/avatar.png')} style={{ width: 150, height: 150, objectFit: 'contain' }}>
							</ImageBackground>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</View >
	)
}
