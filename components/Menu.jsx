import { View, Image, StyleSheet } from "react-native"
import MenuButton from "./MenuButton"

export default Menu = ({ navigation, route }) => {
	return (
		<View style={style.container}>
			<View style={style.titleContainer}>
				<Image style={style.title} source={require('../assets/title.png')} />
			</View>
			<View style={style.menuButtonContainer}>
				<MenuButton
					img={<Image style={style.menuButton} source={require('../assets/images/buttons/home-screen/play.png')} />}
					onPress={() => navigation.navigate('WaifuSelect')}
				/>
				<MenuButton
					img={<Image style={style.menuButton} source={require('../assets/images/buttons/home-screen/gallery.png')} />}
					onPress={() => navigation.navigate('Gallery')} />

				<MenuButton
					img={<Image style={style.menuButton} source={require('../assets/images/buttons/home-screen/options-home.png')} />}
					onPress={() => navigation.navigate('Options')} />
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleContainer: {
		width: 400,
		height: 100,
		objectFit: 'contain',
	},
	title: {
		width: '100%',
		// height: '100%',
		objectFit: 'contain',
	},
	menuButtonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	menuButton: {
		'width': 300,
		'height': 100,
		'objectFit': 'contain'
	}
});