import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ImageBackground, StyleSheet, Image, SafeAreaView, StatusBar, TouchableOpacity, Pressable, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Board from './components/Board';
import styles from './styles';  // Importa los estilos desde styles.js
import Pause from './components/Pause';
import { Audio } from 'expo-av';
import { Animated } from 'react-native';
import Menu from './components/Menu';
import WaifuSelect from './components/WaifuSelect';
import Play from './components/Play';
import Gallery from './components/Gallery';
import Options from './components/Options';

const Stack = createNativeStackNavigator();

const generateBoard = (rows, cols, mines) => {
	let board = Array(rows)
		.fill(null)
		.map(() => Array(cols).fill(null).map(() => ({ value: 0, revealed: false, flagged: false })));

	let mineCount = 0;
	while (mineCount < mines) {
		const row = Math.floor(Math.random() * rows);
		const col = Math.floor(Math.random() * cols);

		if (board[row][col].value !== 'X') {
			board[row][col].value = 'X';
			mineCount++;
		}
	}

	const directions = [
		[-1, -1], [-1, 0], [-1, 1],
		[0, -1], /* X */[0, 1],
		[1, -1], [1, 0], [1, 1]
	];

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (board[row][col].value === 'X') continue;

			let mineCount = 0;
			for (let [dx, dy] of directions) {
				const newRow = row + dx;
				const newCol = col + dy;

				if (
					newRow >= 0 && newRow < rows &&
					newCol >= 0 && newCol < cols &&
					board[newRow][newCol].value === 'X'
				) {
					mineCount++;
				}
			}
			board[row][col] = { ...board[row][col], value: mineCount };
		}
	}

	return board;
};

const App = () => {
	const [board, setBoard] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [victory, setVictory] = useState(false);
	const [initialized, setInitialized] = useState(false); // Nuevo estado para controlar la inicialización del juego
	const [showImage, setShowImage] = useState(false); // Estado para mostrar la imagen después de la victoria
	const [showGame, setShowGame] = useState(false); // Estado para controlar la pantalla de inicio
	const [newGame, setNewGame] = useState(false); // Estado para controlar el inicio de un nuevo juego
	const [pause, setPause] = useState(false); // Estado para controlar la pausa del juego
	const [sound, setSound] = useState();
	const [titleAnim] = useState(new Animated.Value(-200));  // Posición inicial fuera de la pantalla
	const [buttonAnim] = useState(new Animated.Value(700));  // Posición inicial fuera de la pantalla
	const [victoryAnim] = useState(new Animated.Value(0));  // Comienza con opacidad 0
	const [backgroundIndex, setBackgroundIndex] = useState(0);  // Estado para controlar el índice de la imagen de fondo

	const backgrounds = [
		require('./assets/buscaminas-1.jpeg'),
		require('./assets/buscaminas-2.jpeg'), // Añade más imágenes de fondo aquí
		// require('./assets/buscaminas-3.jpeg'),
		// ...
	];

	async function loadSound() {
		const { sound } = await Audio.Sound.createAsync(
			require('./assets/sounds/menu/opening.mp3')
		);
		setSound(sound);
		await sound.playAsync();
	}

	useEffect(() => {
		Animated.sequence([
			Animated.timing(titleAnim, {
				toValue: 0,  // Posición final en la pantalla
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(buttonAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			})
		]).start();
	}, []);

	useEffect(() => {
		loadSound();

		return sound
			? () => {
				sound.unloadAsync();
			}
			: undefined;
	}, []);

	useEffect(() => {
		const newBoard = generateBoard(10, 10, 0);
		setBoard(newBoard);
		setInitialized(true); // Marcamos que el juego se ha inicializado
		setNewGame(false); // Reseteamos el estado de nuevo juego
	}, [setNewGame]);

	useEffect(() => {
		if (initialized && !gameOver && checkVictory()) {
			setVictory(true);
			Animated.timing(victoryAnim, {
				toValue: 1,  // Termina con opacidad 1
				duration: 1000,
				useNativeDriver: true,
			}).start();
			setShowImage(true);
		}
	}, [board, gameOver, initialized]);

	const checkVictory = () => {
		for (let row of board) {
			for (let cell of row) {
				if (cell.value !== 'X' && !cell.revealed) {
					return false;
				}
			}
		}
		return true;
	};

	const handleGoNext = () => {
		const nextIndex = (backgroundIndex + 1) % backgrounds.length;
		setBackgroundIndex(nextIndex);
		handleResetGame();
	};

	const handleClick = (row, col) => {
		if (gameOver || victory || board[row][col].revealed || board[row][col].flagged) return;

		const newBoard = [...board];
		if (newBoard[row][col].value === 'X') {
			setGameOver(true);
			revealBoard(newBoard);
			setBoard(newBoard);
			Alert.alert('Game Over');
		} else {
			revealCell(newBoard, row, col);
			setBoard(newBoard);
		}
	};

	const handleContextMenu = (row, col) => {
		if (gameOver || victory || board[row][col].revealed) return;

		const newBoard = [...board];
		newBoard[row][col].flagged = !newBoard[row][col].flagged;
		setBoard(newBoard);
	};

	const revealBoard = (board) => {
		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board[row].length; col++) {
				board[row][col].revealed = true;
			}
		}
	};

	const revealCell = (board, row, col) => {
		if (board[row][col].revealed || board[row][col].flagged) return;

		board[row][col].revealed = true;

		if (board[row][col].value === 0) {
			const directions = [
				[-1, -1], [-1, 0], [-1, 1],
				[0, -1], /* X */[0, 1],
				[1, -1], [1, 0], [1, 1]
			];

			for (let [dx, dy] of directions) {
				const newRow = row + dx;
				const newCol = col + dy;

				if (
					newRow >= 0 && newRow < board.length &&
					newCol >= 0 && newCol < board[0].length &&
					!board[newRow][newCol].revealed
				) {
					revealCell(board, newRow, newCol);
				}
			}
		}
	};

	// Start Game
	const handleStartGame = async () => {
		if (sound) {
			await sound.stopAsync();  // Detiene la música del menú
		}

		setShowGame(true);
		const newBoard = generateBoard(10, 10, 0);
		setBoard(newBoard);
		setGameOver(false);
		setVictory(false);
		setShowImage(false);
		setInitialized(true);

	};

	// Go to Home
	const handleGoHome = async () => {
		setSound(sound);
		await sound.playAsync();
		setShowGame(false);
	};

	const handleResetGame = () => {
		const newBoard = generateBoard(10, 10, 0);
		setBoard(newBoard);
		setGameOver(false);
		setVictory(false);
		setShowImage(false);
		setInitialized(true);
	};

	const callModal = () => {
		<Modal animationType="slide"
			transparent={true}>
			<View>
				<Text>Pause</Text>
				<TouchableOpacity onPress={() => setPause(false)}>
					<Text>Continue</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleResetGame}>
					<Text>Restart</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleGoHome}>
					<Text>Go Home</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	}

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Menu">
				<Stack.Screen name="Menu" component={Menu} />
				<Stack.Screen name="WaifuSelect" component={WaifuSelect} />
				<Stack.Screen name="Play" component={Play} />
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
	// victory: {
	// 	backgroundSize: 'cover',
	// },
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
