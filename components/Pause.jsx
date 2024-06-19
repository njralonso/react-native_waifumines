import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Image } from 'react-native';

const Pause = ({ handleResetGame }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleRestartGame = () => {
		setModalVisible(!modalVisible)
		handleResetGame()
	}

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Pause</Text>
						<Pressable
							style={[styles.button, styles.buttonClose, { flexDirection: 'row', gap: 10 }]}>
							<Pressable onPress={handleRestartGame} >
								<Image source={require('../assets/images/buttons/ingame/retry.png')} style={{ width: 50, height: 50 }} />
							</Pressable>
							<Image source={require('../assets/images/buttons/ingame/next.png')} style={{ width: 50, height: 50 }} />
						</Pressable>
					</View>
				</View>
			</Modal>
			<Pressable
				style={[styles.button, styles.buttonOpen]}
				onPress={() => setModalVisible(true)}>
				<Image source={require('../assets/images/buttons/ingame/pause.png')} style={{ width: 50, height: 50 }} />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
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
		// padding: 10,
		// elevation: 2,
	},
	buttonOpen: {
		// backgroundColor: '#F194FF',
	},
	buttonClose: {
		// backgroundColor: '#2196F3',
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

export default Pause;