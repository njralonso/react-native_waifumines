import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './components/Menu';
import WaifuSelect from './components/WaifuSelect';
import Play from './components/Play';
import Gallery from './components/Gallery';
import Options from './components/Options';

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Menu">
				<Stack.Screen name="Menu" component={Menu} />
				<Stack.Screen name="WaifuSelect" component={WaifuSelect} />
				<Stack.Screen name="Play" component={Play} options={{ headerShown: false }} />
				<Stack.Screen name="Gallery" component={Gallery} />
				<Stack.Screen name="Options" component={Options} />
			</Stack.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
	);
};

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	startScreen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		width: 400,
		height: 200,
		objectFit: 'contain',
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		// width: 'fit-content',
		// height: 100,
		width: 100
	},
	buttonGame: {
		width: 50,
		height: 50,
	},
	buttonGameImage: {
		width: 'max-content',
		height: 50,
		'objectFit': 'cover',
	},
	buttonImage: {
		width: 200,
		height: 100,
		objectFit: 'contain',
	},
	info: {
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'space-around',
		width: '100%',
		// bottom: 16,
	},
	waifuData: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 100,
		borderColor: 'black',
		borderWidth: 1,
		objectFit: 'cover',
	},
	app: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative'
	},
	board: {
		display: 'grid',  // React Native no tiene soporte directo para grid, puedes usar flexbox
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: 400,  // 10 * 40 (asumiendo 10 columnas de 40px)
		height: 400,  // 10 * 40 (asumiendo 10 filas de 40px)
		position: 'relative',
		backgroundSize: 'cover',  // Lo puedes lograr con un ImageBackground en React Native

	},

	cell: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ccc',
	},
	hidden: {
		backgroundColor: '#fff',
		backgroundImage: 'url(./assets/hidden.png)',
	},
	revealed: {
		backgroundColor: '#fff',
	},
	empty: {
		backgroundColor: '#000000A3',
	},
	number: {
		backgroundColor: '#ddd',
	},
	bomb: {
		justifyContent: 'flex-start',
		alignItems: 'start',
	},
	bombImage: {
		width: 40,
		height: 40,
		resizeMode: 'cover',
	},
	flagged: {
		backgroundColor: 'yellow',
	},
	victoryImage: {
		height: 400,
		width: 400,
	},
	victoryImageImg: {
		maxWidth: '100%',
		maxHeight: '100%',
	},
});

export default App;
