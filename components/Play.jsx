import { useState, useEffect } from "react";
import { ImageBackground, Alert, Animated, View, Image, Text, Pressable } from "react-native";
import Board from "./Board";

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
	const { waifu } = route.params;
	const [board, setBoard] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [victory, setVictory] = useState(false);
	const [initialized, setInitialized] = useState(false); // Nuevo estado para controlar la inicialización del juego
	const [newGame, setNewGame] = useState(false); // Estado para controlar el inicio de un nuevo juego
	const [fadeAnim] = useState(new Animated.Value(1)); // Valor inicial de opacidad para el Board

	/**
	 * Game Start Effect
	 */
	useEffect(() => {
		const newBoard = generateBoard(10, 10, 3);
		setBoard(newBoard);
		setInitialized(true); // Marcamos que el juego se ha inicializado
		setNewGame(false); // Reseteamos el estado de nuevo juego
	}, [setNewGame]);


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
			// revealBoard(board);
			Animated.timing(fadeAnim, {
				toValue: 0, // Valor final de opacidad para el Board
				duration: 1000, // Duración de la animación en milisegundos
				useNativeDriver: true,
			}).start();
		}
	};

	return (
		<View style={{ 'flex': 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
			<View style={{ 'flexDirection': 'row', 'width': '100%', 'flex': 1, justifyContent: 'space-between', top: 16, paddingHorizontal: 16, backgroundColor: 'yellow' }}>
				<Pressable>
					<Image source={require('../assets/images/buttons/ingame/home.png')} style={{ 'width': 50, 'height': 50 }} />
				</Pressable>
				<Pressable>
					<Image source={require('../assets/images/buttons/ingame/options.png')} style={{ 'width': 50, 'height': 50 }} />
				</Pressable>
			</View>
			<View style={{ backgroundColor: 'blue' }}>
				<View style={{ flexDirection: 'row', backgroundColor: 'orange' }}>
					<Image source={waifu.avatar} style={{ 'width': 100, 'height': 100 }} />
					<View style={{ left: 8, justifyContent: 'center', alignItems: 'center' }}>
						<Text>
							Name: {waifu.name}
						</Text>
						<Text>
							Age: {waifu.age}
						</Text>
					</View>
				</View>
				<Animated.View style={{ opacity: fadeAnim }}>
					<ImageBackground
						source={require('../assets/buscaminas-2.jpeg')}>
						<Board
							board={board}
							onClick={handleClick}
							onLongPress={handleContextMenu}
						/>
					</ImageBackground>
				</Animated.View>
				{victory && (
					<Animated.View style={{ opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }), position: 'absolute' }}>
						<ImageBackground
							source={require('../assets/buscaminas-2.jpeg')}
							style={{ 'width': 400, 'height': 400, 'objectFit': 'contain' }}
						/>
					</Animated.View>
				)}
			</View>
			<View style={{ 'flex': 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
				<Text>
					sdfasdf
				</Text>
			</View>
		</View >
	);
}