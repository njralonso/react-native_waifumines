import React from 'react';
import { TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';

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
const styles = StyleSheet.create({
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
})

export default Cell;
