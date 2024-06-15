import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';
import styles from '../styles';

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

export default Board;
