import { View, Text, Pressable, ImageBackground, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';

export let waifuInfo = [
	{
		name: 'Hana',
		avatar: require('../assets/images/characters/hana/avatar.png'),
		1: require('../assets/images/characters/hana/stageOne.png'),
		2: require('../assets/images/characters/hana/stageTwo.png'),
		3: require('../assets/images/characters/hana/stageThree.png')
	},
	{
		name: 'Eula',
		avatar: require('../assets/images/characters/eula/avatar.png'),
		1: require('../assets/images/characters/eula/stageOne.png'),
		2: require('../assets/images/characters/eula/stageTwo.png'),
		3: require('../assets/images/characters/eula/stageThree.png')
	},
	// {
	// 	name: 'Ania',
	// 	avatar: require('../assets/images/characters/ania/avatar.png'),
	// 	stageOne: require('../assets/images/characters/ania/stageOne.png'),
	// 	stageTwo: require('../assets/images/characters/ania/stageTwo.png'),
	// 	stageThree: require('../assets/images/characters/ania/stageThree.png')
	// },
]


export default WaifuSelect = () => {
	const navigation = useNavigation();

	const handlePress = (waifuSelected) => {
		navigation.navigate('Play', { 'waifu': waifuSelected });
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 32, backgroundColor: 'pink' }}>
				<Text style={{ fontSize: 32 }}>Select a Waifu to Play</Text>
			</View>
			<ScrollView style={{}}>
				<View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 32 }}>
					{waifuInfo.map((waifu, key) => {
						return (
							<View key={key} style={{ margin: 4 }}>
								<Pressable onPress={() => handlePress(waifu)} style={{}}>
									<ImageBackground source={waifu.avatar} style={{ width: 150, height: 150, objectFit: 'contain' }}>
									</ImageBackground>
									<Text style={{ alignSelf: 'center', fontSize: 32 }}>{waifu.name}</Text>
								</Pressable>
							</View>
						)
					})}
				</View>
			</ScrollView>
		</View >
	)
}
