import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

const Board = ({ board, onClick, onLongPress, victory }) => {
	return (
		<View style={[styles.board, victory && styles.victory]}>
			{board.map((row, rowIndex) =>
				row.map((cell, colIndex) => (
					<Cell
						key={`${rowIndex}-${colIndex}`}
						row={rowIndex}
						col={colIndex}
						value={cell.value}
						revealed={cell.revealed}
						flagged={cell.flagged}
						onClick={() => onClick(rowIndex, colIndex)}
						onLongPress={() => onLongPress(rowIndex, colIndex)}
					/>
				))
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	board: {
		display: 'grid',  // React Native no tiene soporte directo para grid, puedes usar flexbox
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: 400,  // 10 * 40 (asumiendo 10 columnas de 40px)
		height: 400,  // 10 * 40 (asumiendo 10 filas de 40px)
		position: 'relative',
		backgroundSize: 'cover'  // Lo puedes lograr con un ImageBackground en React Native
	}
})

export default Board;
