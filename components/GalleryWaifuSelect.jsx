import { useState } from "react";
import { View, Text, Image, Dimensions, ImageBackground } from "react-native"
import { waifuInfo } from "./WaifuSelect"
import Ionicons from '@expo/vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GalleryWaifuSelectImages = ({ navigation, route }) => {
	const [visible, setVisible] = useState(true);
	// const { name } = route.params;
	// console.log(route.params)
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'salmon', paddingHorizontal: 32 }}>
			<View>
				<Text style={{ fontSize: 48, textAlign: 'center', backgroundColor: "#2196F3", width: windowWidth }}>Images</Text>
			</View>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				{waifuInfo.map((waifu, key) => <View key={key} style={{ marginBottom: 16 }}>
					{/* <Text
						style={{ fontSize: 32, textAlign: 'center' }}>
						{waifu.name}
					</Text> */}
					{visible &&
						<View style={{ backgroundColor: '#0FF', justifyContent: 'center', alignItems: 'center', minWidth: '100%', height: windowHeight / 6 }}>
							{/* <Ionicons name="lock-closed" color="black" size={32} /> */}
							<ImageBackground source={require('../assets/background-placeholder.jpeg')} resizeMode='contain'
								style={{ minWidth: '100%', height: windowHeight / 6 }} >
							</ImageBackground>
						</View>
					}
				</View>)}
				<View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
					<ImageBackground source={require('../assets/background-placeholder.jpeg')} resizeMode='contain'
						style={{ minWidth: '100%', height: windowHeight / 6 }} >
					</ImageBackground>
				</View>
			</View>
		</View >
	)
}

export default GalleryWaifuSelectImages