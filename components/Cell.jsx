import React from 'react';
import { TouchableOpacity, Text, ImageBackground } from 'react-native';
import styles from '../styles';

const Cell = ({ value, revealed, flagged, onClick, onLongPress }) => {
	const getCellStyle = () => {
		if (!revealed) {
			return styles.hidden;
		}
		if (value === 'X') {
			return styles.bomb;
		}
		if (value === 0) {
			return styles.empty;
		}
		return styles.number;
	};

	return (
		<TouchableOpacity
			style={[styles.cell, getCellStyle()]}
			onPress={onClick}
			onLongPress={onLongPress}
		>
			{value === 'X' && revealed ? (
				<ImageBackground source={require('../assets/mine.jpeg')} style={styles.bomb} imageStyle={styles.bombImage}>
					<Text style={styles.cellText}></Text>
				</ImageBackground>
			) : (
				<Text style={styles.cellText}>
					{revealed && value !== 0 && value !== 'X' ? value : ''}
					{!revealed && flagged ? '🚩' : ''}
				</Text>
			)}
		</TouchableOpacity>
	);
};


export default Cell;
