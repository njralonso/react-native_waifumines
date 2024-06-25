import { View, Image, StyleSheet } from "react-native"
import MenuButton from "./MenuButton"

export default Menu = ({ navigation }) => {
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
				<MenuButton img={<Image style={style.menuButton} source={require('../assets/images/buttons/home-screen/gallery.png')} />} />
				<MenuButton img={<Image style={style.menuButton} source={require('../assets/images/buttons/home-screen/options-home.png')} />} />
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
		'width': 200,
		'height': 100,
		'objectFit': 'contain'
	}
});