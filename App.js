import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ImageBackground, StyleSheet, Image, SafeAreaView, StatusBar, TouchableOpacity, Pressable, Modal } from 'react-native';
import Board from './components/Board';
import styles from './styles';  // Importa los estilos desde styles.js
import Pause from './components/Pause';
import { Audio } from 'expo-av';
import { Animated } from 'react-native';

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
		const newBoard = generateBoard(10, 10, 10);
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
			setTimeout(() => {
				setShowImage(true);
			}, 1000);
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
		const newBoard = generateBoard(10, 10, 10);
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
		const newBoard = generateBoard(10, 10, 10);
		setBoard(newBoard);
		setGameOver(false);
		setVictory(false);
		setShowImage(false);
		setInitialized(true);
	};

	const handleShowPauseOptions = () => {
		setPause(true);
		callModal();
	}

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
		<SafeAreaView style={style.container}>
			{!showGame ? (
				<Animated.View style={[style.startScreen, { transform: [{ translateY: titleAnim }] }]}>
					<Animated.Image source={require('./assets/title.png')} style={[style.title, { transform: [{ translateY: titleAnim }] }]} />
					<Animated.View style={{ transform: [{ translateY: buttonAnim }] }}>
						<TouchableOpacity style={style.button} onPress={handleStartGame}>
							<Image source={require('./assets/images/buttons/home-screen/start.png')} style={style.buttonImage} />
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={handleStartGame}>
							<Image source={require('./assets/images/buttons/home-screen/continue.png')} style={style.buttonImage} />
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={handleStartGame}>
							<Image source={require('./assets/images/buttons/home-screen/gallery.png')} style={style.buttonImage} />
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={handleStartGame}>
							<Image source={require('./assets/images/buttons/home-screen/options-home.png')} style={style.buttonImage} />
						</TouchableOpacity>
					</Animated.View>
				</Animated.View>
			) : (
				<View style={{ 'flex': 1, 'justifyContent': 'center', 'alignItems': 'center' }}>
					<View>
						<View style={{ 'flex': 1, 'flexDirection': 'row', 'justifyContent': 'space-between', 'top': 16, 'marginHorizontal': 8 }}>
							<TouchableOpacity style={style.buttonGame} onPress={handleGoHome}>
								<Image source={require('./assets/images/buttons/ingame/home.png')} style={style.buttonGameImage} />
							</TouchableOpacity>
							<TouchableOpacity style={style.buttonGame} onPress={handleResetGame}>
								<Image source={require('./assets/images/buttons/ingame/options.png')} style={style.buttonGameImage} />
							</TouchableOpacity>
						</View>
						<View style={{ 'flex': 4, 'width': '100%' }}>
							<View style={{ 'flexDirection': 'row', 'bottom': 16, 'justifyContent': 'space-evenly' }}>
								<Image source={require('./assets/avatar.png')} style={style.avatar
								} />
								<View style={{ 'justifyContent': 'center', 'alignItems': 'center' }}>
									<Text style={style.waifuData}>Topota madre</Text>
								</View>
								<View style={{ 'justifyContent': 'center', 'alignItems': 'center' }}>
									<Text style={style.waifuData}>1/3</Text>
								</View>
							</View>
							{!victory ? (
								<ImageBackground
									source={require('./assets/buscaminas-1.jpeg')}>
									<Board
										board={board}
										onClick={handleClick}
										onLongPress={handleContextMenu}
									/>
								</ImageBackground>
							) : (
								<View style={style.victoryImage}>
									<Image source={require('./assets/buscaminas-1.jpeg')} style={style.victoryImageImg} />
								</View>
							)}
						</View>
						<View style={{ 'flex': 1, 'width': '100%', 'flexDirection': 'row', 'justifyContent': 'space-evenly', 'alignItems': 'center', 'bottom': 16 }}>
							<Pressable
								style={{ width: 50, height: 50, objectFit: 'contain' }}
								onPress={handleShowPauseOptions}
							>
								<Pause handleResetGame={handleResetGame} />
							</Pressable>
							<TouchableOpacity style={style.buttonGame} onPress={handleResetGame}>
								<Image source={require('./assets/images/buttons/ingame/options.png')} style={style.buttonGameImage} />
							</TouchableOpacity>
							<TouchableOpacity style={style.buttonGame} onPress={handleResetGame}>
								<Image source={require('./assets/images/buttons/ingame/options.png')} style={style.buttonGameImage} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)
			}
			<StatusBar style="auto" />
		</SafeAreaView >
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
		marginBottom: 16,
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
		backgroundImage: 'url(assets/buscaminas-1.jpeg)',  // Esto no funciona directamente en React Native
		backgroundSize: 'cover',  // Lo puedes lograr con un ImageBackground en React Native

	},
	victory: {
		backgroundImage: 'url(assets/buscaminas-1.jpeg)',
		backgroundSize: 'cover',
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
		justifyContent: 'center',
		alignItems: 'center',
		height: 400,
		width: 400,
	},
	victoryImageImg: {
		maxWidth: '100%',
		maxHeight: '100%',
	},
});

export default App;
