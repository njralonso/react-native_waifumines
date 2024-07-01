import { View, Text, Image, Dimensions, Pressable } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { waifuInfo } from "./WaifuSelect"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default Gallery = () => {
	const navigation = useNavigation();

	const handleGoToGalerryWaifuSelect = () => {
		navigation.navigate('GalleryWaifuSelect');
	};

	return (
		<View style={{ flex: 1 }}>
			<View>
				<Text style={{ fontSize: 48, textAlign: 'center', backgroundColor: "#2196F3", width: windowWidth }}>Gallery</Text>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: 16, width: windowWidth }}>
				{waifuInfo.map((waifu, key) => <View key={key}>
					<Text
						style={{ fontSize: 32, textAlign: 'center' }}>
						{waifu.name}
					</Text>
					<Pressable onPress={() => handleGoToGalerryWaifuSelect()}>
						<Image
							source={waifu.avatar}
							style={{ width: 150, height: 150, objectFit: 'contain' }}
						/>
					</Pressable>
				</View>)}
			</View>
		</View >
	)
}