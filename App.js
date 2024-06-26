import { StatusBar } from 'react-native';
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
				<Stack.Screen name="WaifuSelect" component={WaifuSelect} options={{ headerShown: false }} />
				<Stack.Screen name="Play" component={Play} options={{ headerShown: false }} />
				<Stack.Screen name="Gallery" component={Gallery} />
				<Stack.Screen name="Options" component={Options} />
			</Stack.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
	);
};


export default App;
