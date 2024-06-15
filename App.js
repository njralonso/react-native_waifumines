import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ImageBackground, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import Board from './components/Board';
import styles from './styles';  // Importa los estilos desde styles.js

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

	useEffect(() => {
		const newBoard = generateBoard(10, 10, 10);
		setBoard(newBoard);
		setInitialized(true); // Marcamos que el juego se ha inicializado
	}, []);

	useEffect(() => {
		if (initialized && !gameOver && checkVictory()) {
			setVictory(true);
			setTimeout(() => {
				setShowImage(true); // Mostramos la imagen después de 1 segundo
			}, 1000);
		}
	}, [board, gameOver, initialized]); // Añadimos initialized como dependencia

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

	return (
		<SafeAreaView style={stylesApp.container}>
			<View style={styles.app}>
				<Text style={styles.title}>Buscaminas</Text>
				{!victory && (
					<ImageBackground
						source={require('./assets/buscaminas-1.jpeg')}
						style={styles.board}>
						<Board board={board} onClick={handleClick} onLongPress={handleContextMenu} />
					</ImageBackground>
				)}
				{victory && (
					<View style={styles.victoryImage}>
						<Image source={require('./assets/buscaminas-1.jpeg')} style={styles.victoryImageImg} />
					</View>
				)}
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
};

const stylesApp = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		fontSize: 25,
		fontWeight: '500',
	},
});

export default App;
