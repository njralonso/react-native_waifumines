import { useState, useEffect } from "react";
import { ImageBackground, Alert, Animated, View, Image, Text, Pressable, Modal, StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
import Ionicons from '@expo/vector-icons/FontAwesome';
import Board from "./Board";
import CustomModal from "./CustomModal";
import GameLossModal from "./GameLossModal";
import FlashMessage from "./FlashMessage";

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

export default Play = ({ route, navigation }) => {
	const { waifu } = route.params; // Información del personaje seleccionado

	const [modalVisible, setModalVisible] = useState(false);
	const [board, setBoard] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [victory, setVictory] = useState(false);
	const [initialized, setInitialized] = useState(false); // Nuevo estado para controlar la inicialización del juego
	const [newGame, setNewGame] = useState(false); // Estado para controlar el inicio de un nuevo juego
	const [fadeAnim] = useState(new Animated.Value(1)); // Valor inicial de opacidad para el Board
	const [currentStage, setCurrentStage] = useState(1);
	const [visible, setVisible] = useState(false); // Shows flash message at the start of the boardstage

	/**
	 * Game Start Effect
	 */
	useEffect(() => {
		const newBoard = generateBoard(10, 10, 3);
		setBoard(newBoard);
		setInitialized(true); // Marcamos que el juego se ha inicializado
		setNewGame(false); // Reseteamos el estado de nuevo juego
	}, [setNewGame, setCurrentStage]);

	/**
	 * Show puzzle number at the start with a flash message
	 */
	useEffect(() => {
		setVisible(true);
		const timer = setTimeout(() => {
			setVisible(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, [visible]);

	const handleClick = (row, col) => {
		if (gameOver || victory || board[row][col].revealed || board[row][col].flagged) return;

		const newBoard = [...board];
		if (newBoard[row][col].value === 'X') {
			setGameOver(true);
			revealBoard(newBoard);
			setBoard(newBoard);
		} else {
			revealCell(newBoard, row, col);
			setBoard(newBoard);
			checkVictory(newBoard); // Llamada a checkVictory
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

	const checkVictory = (board) => {
		let victoryAchieved = true;
		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board[row].length; col++) {
				if (board[row][col].value !== 'X' && !board[row][col].revealed) {
					victoryAchieved = false;
					break;
				}
			}
		}
		if (victoryAchieved) {
			setVictory(true);
			setInitialized(false)
			revealBoard(board);
		}
	};

	const handleGoToHome = () => {
		navigation.navigate('Menu');
		setGameOver(true)
	}

	const handleGoNext = () => {
		if (currentStage < 3) {
			setCurrentStage(currentStage + 1);
			setBoard(generateBoard(10, 10, 3));
			setVictory(false);
			setGameOver(false);
			setInitialized(true)
			fadeAnim.setValue(1);
		} else {
			Alert.alert("Felicidades", "Has completado todos los niveles.");
			navigation.navigate('Menu');
		}
	}

	const handleRestartGame = () => {
		const newBoard = generateBoard(10, 10, 3);
		setBoard(newBoard)
		setInitialized(true)
		setNewGame(true)
		setGameOver(false)
	}

	const getCurrentStageImage = () => {
		switch (currentStage) {
			case 1:
				return waifu[currentStage];
			case 2:
				return waifu[currentStage];
			case 3:
				return waifu[currentStage];
			default:
				return waifu[currentStage];
		}
	};

	return (
		<View style={{ 'flex': 1, justifyContent: 'space-between', alignItems: 'center' }}>
			{/* Game Options Modal */}
			<CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
			{/* Game Options Modal */}
			{/* Game Over Modal */}
			{gameOver && (<GameLossModal modalVisible={gameOver}>
				<View>
					<Text style={{ fontSize: 24, marginBottom: 16 }}>Game over</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
						<Pressable onPress={handleGoToHome}>
							<Image source={require('../assets/images/buttons/ingame/home.png')} style={{ 'width': 50, 'height': 50 }} />
						</Pressable>
						<Pressable onPress={handleRestartGame}>
							<Image source={require('../assets/images/buttons/ingame/retry.png')} style={{ 'width': 50, 'height': 50 }} />
						</Pressable>
					</View>
				</View>
			</GameLossModal>)}
			{/* Game Over Modal */}
			{/* Show Image Modal */}
			{victory && (<GameLossModal modalVisible={victory}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ backgroundColor: 'blue', fontSize: 32 }}>{waifu.name}</Text>
					<Image source={waifu[currentStage]} style={{ flex: 1, width: width, height: height, objectFit: 'contain' }} />
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center', bottom: 48 }}>
					{victory && <Ionicons.Button color="green" backgroundColor='transparent' onPress={handleGoNext}>Go next ➡️</Ionicons.Button>}
				</View>
			</GameLossModal>)}
			{/* Show Image Modal */}
			<View style={{ 'flexDirection': 'row', 'width': '100%', justifyContent: 'space-between', top: 16, paddingHorizontal: 16 }}>
				<Pressable onPress={handleGoToHome}>
					<Image source={require('../assets/images/buttons/ingame/home.png')} style={{ 'width': 50, 'height': 50 }} />
				</Pressable>
				<Pressable onPress={() => setModalVisible(true)}>
					<Image source={require('../assets/images/buttons/ingame/options.png')} style={{ 'width': 50, 'height': 50 }} />
				</Pressable>
			</View>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ justifyContent: 'center', alignItems: 'center', bottom: 32 }}>
					<Text style={{ fontSize: 32 }}>
						{waifu.name}
					</Text>
					<Image source={waifu.avatar} style={{ 'width': 100, 'height': 100 }} />
				</View>
				<Animated.View style={{ opacity: fadeAnim }}>
					<ImageBackground
						source={getCurrentStageImage()}>
						<Board
							board={board}
							onClick={handleClick}
							onLongPress={handleContextMenu}
						/>
					</ImageBackground>
				</Animated.View>
			</View>
			<View style={{ bottom: 48 }}>
				<Text style={{ fontSize: 32 }}>Stage {currentStage}</Text>
			</View>
			{initialized && <FlashMessage message={waifu.name + ' Puzzle ' + currentStage} visible={visible} />}
		</View >
	);
}

const styles = StyleSheet.create({
	boardBackground: {},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});